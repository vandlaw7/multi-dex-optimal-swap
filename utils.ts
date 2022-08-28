import BigNumber from 'bignumber.js';
import { PoolDto } from 'dtos';

const fee = 0.9975;

export const estimateOut = (pool: PoolDto, from: string, amountIn: BigNumber): BigNumber => {
  if (BigNumber(amountIn).isZero()) {
		return BigNumber(0);
	};

  const {token0, token0Reserve, token1Reserve} = pool;

  let fromTokenReserve = (from == token0) ? token0Reserve : token1Reserve;
  let toTokenReserve = (from == token0) ? token1Reserve : token0Reserve;

	const adjustedAmountIn = BigNumber(String(amountIn)).multipliedBy(fee);
  const exchangeRate = BigNumber(String(toTokenReserve)).div(BigNumber(String(fromTokenReserve)).plus(adjustedAmountIn));

  return adjustedAmountIn.multipliedBy(exchangeRate);
}

export const findPool = (pools: PoolDto[], token0: string, token1: string): PoolDto => {
  const pool =  pools.find(pool => (token0 === pool['token0'] && token1 === pool['token1']) ||
      (token0 === pool['token1'] && token1 === pool['token0']))
  if (!pool) {
    throw Error
  }
  return pool;
}