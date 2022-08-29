import BigNumber from 'bignumber.js';
import { estimateOut, findBestPool, findPoolsByOneTokenAndWhiteBlacklist } from "./utils";
import { CENTRAL_TOKENS, BNB_ATTACHED_TOKENS, BUSD_ATTACHED_TOKENS, WHOLE_TOKENS, BNB, BUSD, CENTRAL_TOKENS_GRAPH, TOP_30_POOLS, viewerContract, PANCAKE_SWAP_ADDRESS } from "./statics";
import { OptimalPath, pathWithInfo, PoolDto } from "dtos";
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
  // 1) if from is BNB_ATTACHED_TOKENS or BUSD_ATTACHED_TOKENS, just swap to BNB or BUSD.
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
  // 2) if from and to is both BNB_ATTACHED_TOKENS, just swap and all done. Same with BUSD_ATTACHED_TOKENS
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
  // 3) find optimal path in 7 central tokens
  // ------------------------------------------------------------------

  const real_to = to;
  if (BNB_ATTACHED_TOKENS.includes(real_to)) {
    to = BNB;
  } else if (BUSD_ATTACHED_TOKENS.includes(real_to)) {
    to = BUSD;
  }


  // recursive function:
  // (1) find and exchange LP's that were not in the previous path and store output.
  // (2) if we reach to 'to token;, return and exit function.
  // (3) choose the maximum output path

  let pathsWithAmountOut: {path: string[], protocols: string[], pools: PoolDto[], amountOut: BigNumber}[] = [];

  const addPath = (nowPath: string[], nowPathProtocols: string[], nowPools: PoolDto[], amountIn: BigNumber) => {
    const nowFrom = nowPath[nowPath.length - 1];
    if (nowFrom === to) {
      pathsWithAmountOut.push({ path: nowPath, protocols: nowPathProtocols, pools: nowPools, amountOut: amountIn });
      return;
    }

    const candidatePools = findPoolsByOneTokenAndWhiteBlacklist(pools, nowFrom, CENTRAL_TOKENS, nowPath);

    candidatePools.forEach((pool) => {
      // use slice function just for copy
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
  // in this section, just for central tokens.
  addPath(path, protocols, pathPools, amountIn);

  let maxPath: string[] = [];
  let maxAmountOut = BigNumber(0);
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
  // 4) return final path
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
