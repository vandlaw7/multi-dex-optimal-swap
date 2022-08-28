// let aaa = 'aaa'
// let bbb = aaa;
// aaa = 'ccc';

// console.log(bbb);

// const arr = new Array(3).fill('aaaa');
// console.log(arr);

// const {ppp = 'default', qqq} = {qqq: null}
// console.log(ppp);
// console.log(qqq === null);

// let {
//   availability = null,
//   minProfit = 0,
//   maxProfit = Number.MAX_SAFE_INTEGER,
//   fromToken = null,
//   toToken = null
// } = {
//   'toToken': 'bbb'
// }

// console.log(availability, minProfit, maxProfit, fromToken, toToken);

import axios from 'axios';

const main = async () => {
  const tokenArray = [
    'BNB',
    'BUSD',
    'CAKE',
    'USDT',
    'ETH',
    'MBOX',
    'BTCB',
    'USDC',
    'TUSD',
    'DOT',
    'XRP',
    'SFP',
    'TRX',
    'DAI',
    'BTT',
    'ADA',
    'DOGE',
    'ALPACA',
    'UST',
    'ALICE',
    'XVS',
    'WIN',
    'LINK',
    'UNI'
  ];

  // btcb - btc

  tokenArray.forEach(async (token) => {
    const requestURL = `https://api.binance.com/api/v3/ticker/price?symbol=${token}USDT`
    try {
      const result = await axios.get(requestURL);
    } catch (err) {
      console.log(token);
      console.log(requestURL);
    }
    // console.log(token, result.data.price);
  })

}

main();


