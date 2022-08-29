import BigNumber from "bignumber.js";

export interface PoolDto {
    token0: string;
    token1: string;
    token0Reserve: BigNumber;
    token1Reserve: BigNumber;
    token0Symbol: string;
    token1Symbol: string;
    token0Decimals: number;
    token1Decimals: number;
    protocol: string;
    exchangeRate?: number;
}

export interface OptimalPath {
    path: string[];
    amountOut: number;
    protocols: string[];
    pools: PoolDto[];
}

export interface pathWithInfo {
    path: string[];
    protocols: string[];
    pools: PoolDto[];
    amountOut: BigNumber;
}