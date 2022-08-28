import { tokenToBinanceSymbol } from './statics';
import axios from 'axios';

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
