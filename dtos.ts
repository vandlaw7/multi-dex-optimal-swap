export interface PoolDto {
    token0: string;
    token1: string;
    token0Reserve: string;
    token1Reserve: string;
}

export interface OptimalPath {
    path: string[];
    amountOut: number;
    protocols: string[];
}