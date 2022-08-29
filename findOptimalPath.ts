import BigNumber from 'bignumber.js';
import { estimateOut, findBestPool, findPoolsByOneTokenAndWhiteBlacklist } from "./utils";
import { CENTRAL_TOKENS, BNB_ATTACHED_TOKENS, BUSD_ATTACHED_TOKENS, WHOLE_TOKENS, BNB, BUSD, CENTRAL_TOKENS_GRAPH, TOP_30_POOLS, viewerContract, PANCAKE_SWAP_ADDRESS } from "./statics";
import { OptimalPath, PoolDto } from "dtos";
import { fetchNowPools } from "./fetchPoolInfos";

export const findOptimalPath = async (from: string, to: string, amountInRaw: number, pools: PoolDto[]): Promise<any> => {
  from = from.toLowerCase();
  to = to.toLowerCase();

  if (!WHOLE_TOKENS.includes(from) || !WHOLE_TOKENS.includes(to)) {
    console.log("This token can not be swapped in this service.");
    return{
      path: [],
      amountOut: 0,
      protocols: [],
      pools: []
    }
  }

  let amountIn = BigNumber(amountInRaw);
  let path = [from];
  let protocols = [];
  let pathPools = [];

  // const real_to = to;

  // ------------------------------------------------------------------
  // 1) BNB 부속이면 BNB로, BUSD 부속이면 BUSD로 스왚
  // ------------------------------------------------------------------

  if (BNB_ATTACHED_TOKENS.includes(from)) {
    const bnbPool = findBestPool(pools, from, BNB);
    amountIn = estimateOut(bnbPool, from, amountIn);
    path.push(BNB);
    protocols.push(bnbPool['protocol']);
    pathPools.push(bnbPool);
    from = BNB;
  } else if (BUSD_ATTACHED_TOKENS.includes(from)) {
    const busdPool = findBestPool(pools, from, BUSD);
    amountIn = estimateOut(busdPool, from, amountIn);
    path.push(BUSD);
    protocols.push(busdPool['protocol']);
    pathPools.push(busdPool);
    from = BUSD;
  }

  // ------------------------------------------------------------------
  // 2) 만약 BNB 부속이나 BUSD 부속 토큰 내부의 스왚이라면, 그대로 스왚해주고 종료
  // ------------------------------------------------------------------
  if (
    (from === BNB && BNB_ATTACHED_TOKENS.includes(to)) ||
    (from === BUSD && BUSD_ATTACHED_TOKENS.includes(to))
  ) {
    path.push(to);
    return {
      path,
      amountOut: amountIn.toNumber(),
      protocols,
      pools: pathPools
    };
  }

  // ------------------------------------------------------------------
  // 3) 중심 토큰들 7개 사이에서 최적 경로를 탐색
  // ------------------------------------------------------------------

  const real_to = to;
  if (BNB_ATTACHED_TOKENS.includes(real_to)) {
    to = BNB;
  } else if (BUSD_ATTACHED_TOKENS.includes(real_to)) {
    to = BUSD;
  }


  // 재귀함수를 돌려서,
  // (1)경로 상의 이전 토큰이 들어있고,
  // (2)지금까지의 경로에 없었던 LP를 찾아서 교환하고 산출량을 저장.
  // (3)to token에 도달하면 함수 종료.
  // 이렇게 찾은 to token 산출량 중에서 가장 산출량이 큰 경로를 채택.

  let pathsWithAmountOut: {path: string[], protocols: string[], pools: PoolDto[], amountOut: BigNumber}[] = [];

  const addPath = (nowPath: string[], nowPathProtocols: string[], nowPools: PoolDto[], amountIn: BigNumber) => {
    const nowFrom = nowPath[nowPath.length - 1];
    if (nowFrom === to) {
      pathsWithAmountOut.push({ path: nowPath, protocols: nowPathProtocols, pools: nowPools, amountOut: amountIn });
      return;
    }

    const candidatePools = findPoolsByOneTokenAndWhiteBlacklist(pools, nowFrom, CENTRAL_TOKENS, nowPath);

    candidatePools.forEach((pool) => {
      // forEach 돌면서 같은 pathNow에 add되는 현상 피하기 위해 copy
      const nowPathForExtend = nowPath.slice();
      const nowPathProtocolsExtend = nowPathProtocols.slice()
      const nowPoolsExtend = nowPools.slice()

      const swappedToken = pool["token0"] === nowFrom ? pool["token1"] : pool["token0"];
      const amountOut = estimateOut(pool, nowFrom, amountIn);


      nowPathForExtend.push(swappedToken);
      nowPathProtocolsExtend.push(pool["protocol"]);
      const nowPool = {...pool};
      nowPool['exchangeRate'] = amountOut.div(amountIn).toNumber();
      nowPoolsExtend.push(nowPool);

      addPath(nowPathForExtend, nowPathProtocolsExtend, nowPoolsExtend, amountOut);
    })
  };
  // central token의 경로만 maxPath에 기록하고, 전체경로는 나중에 concat해준다.
  // const nowPath = [path[path.length - 1]];
  addPath(path, protocols, pathPools, amountIn);

  let maxPath: string[] = [];
  let maxAmountOut = new BigNumber(0);
  let maxProtocols: string[] = [];
  let maxPools: PoolDto[] = [];
  pathsWithAmountOut.forEach((pathWithAmountOut) => {
    if (pathWithAmountOut.amountOut > maxAmountOut) {
      maxPath = pathWithAmountOut.path;
      maxAmountOut = pathWithAmountOut.amountOut;
      maxProtocols = pathWithAmountOut.protocols;
      maxPools = pathWithAmountOut.pools;
    }
  });

  path.pop();
  path = path.concat(maxPath);

  // ------------------------------------------------------------------
  // 4) 최종 path 반환
  // ------------------------------------------------------------------
  if (!CENTRAL_TOKENS.includes(real_to)) {
    console.log('to: ', to);
    console.log('real_to: ', real_to);
    const pool = findBestPool(pools, to, real_to);
    maxAmountOut = estimateOut(pool, to, maxAmountOut);
    maxPath.push(real_to);
    maxProtocols.push(pool['protocol']);
    maxPools.push(pool);
  }

  // console.log(pathsWithAmountOut);

  return {
    path: maxPath,
    amountOut: maxAmountOut.toNumber(),
    protocols: maxProtocols,
    pools: maxPools.map((pool) => {
      const poolForResponse : any = {...pool};
      poolForResponse['token0Reserve'] = pool['token0Reserve'].toNumber();
      poolForResponse['token1Reserve'] = pool['token1Reserve'].toNumber();
      return poolForResponse;
    }),
  };
};

const main = async () => {
  let startTime, endTime, finalTime;
  startTime = new Date();
  const pools = await fetchNowPools();
  // console.log(pools);
  endTime = new Date();
  console.log(endTime - startTime);

  const result = await findOptimalPath(
    '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    10,
    pools
  )
  console.log(result);

  // finalTime = new Date();
  // console.log(finalTime - endTime);
  // const pool = await findBestPool(
  //   pools,
  //   '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
  //   '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  // )
  // console.log(pool);
};
main();

