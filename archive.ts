import axios from 'axios';
import { tokenToBinanceSymbol } from 'statics';

export const DOGE = "0xba2ae424d960c26247dd6c32edc70b295c744c43";
export const DOGE_DECIMAL = 8;
export const ALICE = "0xac51066d7bec65dc4589368da368b212745d63e8";
export const ALICE_DECIMAL = 6;

export const tokenToUsd = async (token: string) : Promise<string> => {
  const binanceSymbol = tokenToBinanceSymbol[token];
  const requestURL = `https://api.binance.com/api/v3/ticker/price?symbol=${binanceSymbol}USDT`
  try {
    const result = await axios.get(requestURL);
    return result.data.price;
  } catch (err) {
    console.log('Binance API error');
    return '0';
  }
}

export const getTokensUsdValue = async () => {
    const result = {};
    await Promise.all(Object.keys(tokenToBinanceSymbol).map(async (token) => {
      if (tokenToBinanceSymbol[token] === 'USDT') {
        result[token] = 1;
      } else {
        const usdValue = await tokenToUsd(token);
        result[token] = Number(usdValue);
      }
    }))
    return result;

}
