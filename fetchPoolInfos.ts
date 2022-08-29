import BigNumber from 'bignumber.js';
import { estimateOut, findBestPool } from "./utils";
import { CENTRAL_TOKENS, BNB_ATTACHED_TOKENS, BUSD_ATTACHED_TOKENS, WHOLE_TOKENS, BNB, BUSD, CENTRAL_TOKENS_GRAPH, TOP_30_POOLS, viewerContract, PANCAKE_SWAP_ADDRESS, pancakeFactory, bakeryFactory, BAKERY_SWAP_ADDRESS, pancakePoolCount, bakeryPoolCount } from "./statics";
import { OptimalPath, PoolDto } from "dtos";

export const organizePoolInfo = (pools, protocol) => {
    return pools
        .filter((pool) => pool && pool["token0"] && pool["token1"])
        .map(((pool): any => {
            return {
                token0 : pool["token0"].toLowerCase(),
                token1 : pool["token1"].toLowerCase(),
                token0Symbol : pool["token0Symbol"],
                token1Symbol : pool["token1Symbol"],
                token0Reserve : BigNumber(String(pool["token0Reserve"]))
                                // .div(new BigNumber(10).exponentiatedBy(pool["token0Decimals"]))
                                ,
                token1Reserve : BigNumber(String(pool["token1Reserve"]))
                                // .div(new BigNumber(10).exponentiatedBy(pool["token1Decimals"]))
                                ,
                token0Decimals : pool["token0Decimals"],
                token1Decimals : pool["token1Decimals"],
                protocol : protocol
            }
        }))
        .filter((pool: PoolDto) => WHOLE_TOKENS.includes(pool.token0) && WHOLE_TOKENS.includes(pool.token1))
        .filter((pool: PoolDto) => pool.token0Reserve > new BigNumber(1000) ||  pool.token1Reserve > new BigNumber(1000))
}

export const fetchNowPools = async (): Promise<PoolDto[]> => {
    const multiProtocolPoolsInfo = await Promise.all([
        viewerContract.poolInfos(pancakeFactory, 0, pancakePoolCount),
        viewerContract.poolInfos(bakeryFactory, 0, bakeryPoolCount),
    ]);
    const pancakePoolInfos1 = organizePoolInfo(multiProtocolPoolsInfo[0][0], PANCAKE_SWAP_ADDRESS);
    const bakeryPoolInfos = organizePoolInfo(multiProtocolPoolsInfo[1][0], BAKERY_SWAP_ADDRESS);

    return pancakePoolInfos1
        .concat(bakeryPoolInfos);
};

