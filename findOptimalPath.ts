import BigNumber from 'bignumber.js';
import { estimateOut, findBestPool, findPoolsByOneTokenAndWhiteBlacklist, findPoolsByToken } from "./utils";
import { CENTRAL_TOKENS, BNB_ATTACHED_TOKENS, BUSD_ATTACHED_TOKENS, WHOLE_TOKENS, BNB, BUSD, CENTRAL_TOKENS_GRAPH, TOP_30_POOLS, viewerContract, PANCAKE_SWAP_ADDRESS } from "./statics";
import { OptimalPath, pathWithInfo, PoolDto } from "dtos";
import { fetchNowPools } from "./fetchPoolInfos";

export const extendPathInfos = (
  nowPath: string[],
  nowPathProtocols: string[],
  nowPools: PoolDto[],
  amountIn: BigNumber,
  pool: PoolDto,
  nowFrom: string
) => {
  // forEach 돌면서 같은 pathNow에 add되는 현상 피하기 위해 copy
  const path = nowPath.slice();
  const protocols = nowPathProtocols.slice()
  const pools = nowPools.slice()

  const swappedToken = pool["token0"] === nowFrom ? pool["token1"] : pool["token0"];
  const amountOut = estimateOut(pool, nowFrom, amountIn);

  path.push(swappedToken);
  protocols.push(pool["protocol"]);
  const nowPool = {...pool};
  nowPool['exchangeRate'] = amountOut.div(amountIn).toNumber();
  pools.push(nowPool);
  return {path, protocols, pools, amountOut};
}

// 재귀함수를 돌려서,
// (1)경로 상의 이전 토큰이 들어있고,
// (2)지금까지의 경로에 없었던 LP를 찾아서 교환하고 산출량을 저장.
// (3)to token에 도달하면 함수 종료.
// 이렇게 찾은 to token 산출량 중에서 가장 산출량이 큰 경로를 채택.
export const addPath = (
  nowPath: string[],
  nowPathProtocols: string[],
  nowPools: PoolDto[],
  amountIn: BigNumber,
  pathsWithAmountOut: pathWithInfo[],
  to: string,
  pools: PoolDto[],
) => {
  const nowFrom = nowPath[nowPath.length - 1];
  if (nowFrom === to) {
    pathsWithAmountOut.push({ path: nowPath, protocols: nowPathProtocols, pools: nowPools, amountOut: amountIn });
    return;
  }

  const candidatePools = findPoolsByOneTokenAndWhiteBlacklist(pools, nowFrom, CENTRAL_TOKENS, nowPath);

  candidatePools.forEach((pool) => {
    const {path, protocols, pools: poolsNowExtended, amountOut}
      = extendPathInfos(nowPath, nowPathProtocols, nowPools, amountIn, pool, nowFrom);

    addPath(path, protocols, poolsNowExtended, amountOut, pathsWithAmountOut, to, pools);
  })
};

export const findMaxFromPathInfos = (pathsWithAmountOut: pathWithInfo[]) => {
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
  return {maxPath, maxAmountOut, maxProtocols, maxPools};
}

export const findOptimalPathWithinCentralTokens = (from: string, to: string, amountIn: BigNumber, pools: PoolDto[])
  : any => {
  const pathsWithAmountOut: pathWithInfo[] = [];
  addPath([from], [], [], amountIn, pathsWithAmountOut, to, pools)
  return findMaxFromPathInfos(pathsWithAmountOut);
}

export const findOptimalPath = async (from: string, to: string, amountInRaw: number, pools: PoolDto[]): Promise<any> => {
  from = from.toLowerCase();
  to = to.toLowerCase();
  const amountIn = new BigNumber(amountInRaw);

  if (!WHOLE_TOKENS.includes(from) || !WHOLE_TOKENS.includes(to)) {
    console.log("This token can not be swapped in this service.");
    return{
      path: [],
      amountOut: 0,
      protocols: [],
      pools: []
    }
  }

  let optimals;

  if (CENTRAL_TOKENS.includes(from) && CENTRAL_TOKENS.includes(to)) {
    optimals = findOptimalPathWithinCentralTokens(from, to, amountIn, pools);
  } else if (CENTRAL_TOKENS.includes(from)){
    const centralToCandidates: string[] = findPoolsByToken(pools, from)
      .map(pool => pool['token0'] === to ? pool['token1'] : pool['token0']);
    const candidatePaths = centralToCandidates.map((token) => {
      const {maxPath, maxAmountOut, maxProtocols, maxPools} =
        findOptimalPathWithinCentralTokens(from, token, amountIn, pools);
      return extendPathInfos(maxPath, maxProtocols, maxPools, maxAmountOut, findBestPool(pools, token, to), token)
    })
    optimals = findMaxFromPathInfos(candidatePaths);
  } else if (CENTRAL_TOKENS.includes(to)){
    const centralFromCandidates: string[] = findPoolsByToken(pools, from)
      .map(pool => pool['token0'] === to ? pool['token1'] : pool['token0']);
    const candidatePaths = centralToCandidates.map((token) => {
      const {maxPath, maxAmountOut, maxProtocols, maxPools} =
        findOptimalPathWithinCentralTokens(from, token, amountIn, pools);
      return extendPathInfos(maxPath, maxProtocols, maxPools, maxAmountOut, findBestPool(pools, token, to), token)
    })
    optimals = findMaxFromPathInfos(candidatePaths);
  } else {

  }

  return {
    path: optimals.maxPath,
    amountOut: optimals.maxAmountOut.toNumber(),
    protocols: optimals.maxProtocols,
    pools: optimals.maxPools.map((pool) => {
      const poolForResponse : any = {...pool};
      poolForResponse['token0Reserve'] = pool['token0Reserve'].toNumber();
      poolForResponse['token1Reserve'] = pool['token1Reserve'].toNumber();
      return poolForResponse;
    }),
  };
};

const main = async () => {
  let startTime, middleTime, endTime;
  startTime = new Date();
  const pools = await fetchNowPools();
  // console.log(pools);

  middleTime = new Date();
  console.log(middleTime - startTime);

  // const result = await findOptimalPath(
  //     '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
  //     '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  //     10,
  //     pools
  // )
  // console.log(result);

  const result = await findOptimalPathWithinCentralTokens(
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    BigNumber(10),
    pools
  )
  console.log(result);

  endTime = new Date();
  console.log(endTime - startTime);
};

main();