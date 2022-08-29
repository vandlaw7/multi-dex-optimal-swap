import BigNumber from 'bignumber.js';
import { PoolDto } from 'dtos';
import { swapFees } from './statics';


export const estimateOut = (pool: PoolDto, from: string, amountIn: BigNumber): BigNumber => {
  if (amountIn.isZero()) {
		return BigNumber(0);
	};

  const {token0, token0Reserve, token1Reserve} = pool;

  let fromTokenReserve = (from == token0) ? token0Reserve : token1Reserve;
  let toTokenReserve = (from == token0) ? token1Reserve : token0Reserve;

  const adjustedAmountIn = amountIn.multipliedBy(1 - swapFees[pool["protocol"]]);
  const exchangeRate = toTokenReserve.div(fromTokenReserve.plus(adjustedAmountIn));

  return adjustedAmountIn.multipliedBy(exchangeRate);
}

export const findBestPool = (pools: PoolDto[], token0: string, token1: string): PoolDto => {
  const poolsFiltered =  pools
    .filter(pool => (token0 === pool['token0'] && token1 === pool['token1']) ||
      (token0 === pool['token1'] && token1 === pool['token0']))
    .map((pool) => {
      pool['exchangeRate'] = estimateOut(pool, token0, BigNumber('1')).toNumber();
      return pool;
    })
    .sort((pool1, pool2) => pool1['exchangeRate'] - pool2['exchangeRate'])
  if (!poolsFiltered) {
    throw Error
  }
  // console.log(poolsFiltered);
  return poolsFiltered[0];
}

export const findPoolsByOneTokenAndWhiteBlacklist =
  (pools: PoolDto[], token: string, whiteListTokens: string[], blackListTokens: string[]):
    PoolDto[]  | null => {
  return pools
    .filter(pool => whiteListTokens.includes(pool['token0']) && whiteListTokens.includes(pool['token1']))
    .filter(pool => (
      (token === pool['token0'] && !blackListTokens.includes(pool['token1'])) ||
      (token === pool['token1'] && !blackListTokens.includes(pool['token0']))
    )
  )
}