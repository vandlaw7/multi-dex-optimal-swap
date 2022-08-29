# BSC chain multi dex optimal swap algorithm

## Purpose of Development
Currently, the optimal path within individual DEX is often provided by DEX services, but users have to find out which tokens are best to swap by integrating multiple DEXs. For DEX, they want to lock the swap in their platform, so there is a conflict of interest problem. We developed an algorithm that tells you which dex and which pool to swap when you enter the token pairs and the amount of tokens you want to exchange.

Although 1 inch provides the best path in the BSC chain, the algorithm for finding the best path is calculated from the off chain and the result is served by the Oracle. Because 1 inch doesn't reveal the off-chain computational algorithm itself, it doesn't perform as much as 1 inch, but I thought it was meaningful to create an open source that revealed the entire computational process.

First of all, we have completed the implementation with Pancake Swap and Bakery Swap, and we will provide a guide to add DEX. We first support swaps of 30 major tokens in the BSC chain.

## How to run (MAC)
* NodeJS must be installed and ts-node must be installed globally.
```
npm install
ts-node main.ts
```
* In the below code of main.ts, change the address of the token you want to exchange and enter the quantity.
```
    const result = await findOptimalPath(
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        10,
        pools
    )
```
* The following is an example:
```
{
  path: [
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    '0x55d398326f99059ff775485246999027b3197955',
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
  ],
  amountOut: 1.9010393849248757,
  protocols: [
    '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    '0x116aae16a3a7044afe7063c6f870b119000b5abe'
  ]
}
```


## How to add another DEX
* If DEX has the same interface as the factory of the pancakeSwap, then you can add the router and factory address, swap fee ratio, and the properly large pool count that does not cause errors when requested on the RPC node to the static.ts. The information in the DEX is then reflected and the optimal path is explored.

```
export const BAKERY_SWAP_ADDRESS = "0x116aae16a3a7044afe7063c6f870b119000b5abe"
export const bakeryFactory = "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7";
export const bakeryPoolCount = 70;
swapFeesRaw[BAKERY_SWAP_ADDRESS] = 0.003;
```

* If DEX does not have the same interface as the factory of the pancake swap, you should add the logic of receiving pool information according to Pool Dto (defined in dtos.ts). You may need a viewer contract, see https://github.com/decipherhub/Orderbank/blob/master/contract/contracts/Viewer/BiSwapViewer.sol.

