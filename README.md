# BSC chain multi dex optimal swap algorithm

## 개발 의도와 목적
현재 개별 DEX 내에서의 최적 경로는 DEX 서비스에서 제공해주는 경우가 많지만, 여러 덱스들을 통합해서 어떤 토큰을 어떻게 스왚하는 것이 최적인지는 유저가 직접 찾아야 하는 상황입니다. DEX 입장에서는 swap을 본인들 플랫폼 안에 가두고 싶어하므로 이해 충돌 문제가 발생한 것입니다. 교환하고 싶은 토큰 페어와 토큰 양을 입력하면, 어떤 덱스에서 어떤 풀을 이용해 스왚하는 것이 최적인지 알려주는 알고리즘을 개발하였습니다.

1inch가 BSC 체인에서 최적 경로를 제공해주고 있기는 하지만, 최적 경로를 찾는 알고리즘을 off chain에서 계산해서 해당 결과값을 오라클로 서빙하는 구조입니다. 1inch는 오프 체인 계산 알고리즘 자체를 공개하고 있지는 않기 때문에, 1inch만큼의 성능은 못 내지만 연산과정 전체를 공개한 오픈소스를 만드는 것은 의미가 있다고 생각했습니다.

우선 PancakeSwap과 BakerySwap를 가지고 구현을 완료하였고, DEX를 추가할 수 있도록 가이드를 제공할 것입니다. BSC 체인 내 주요 30여개 토큰의 스왚을 우선 지원하고 있습니다.


## 실행 방법 (mac 기준)
* nodeJS가 설치되어 있어야 하고 ts-node가 전역에 설치되어 있어야 합니다.
```
npm install
ts-node main.ts
```
* main.ts의 아래 코드에서 교환하고 싶은 토큰의 어드레스를 바꾸고 수량을 입력하면 됩니다.
```
    const result = await findOptimalPath(
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        10,
        pools
    )
```
예시 결과는 다음과 같습니다.
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


## DEX 추가 방법
* 만약 DEX가 pancakeSwap의 factory와 인터페이스가 동일하다면, router와 factory Address, swap fee 비율, 그리고 RPC 노드 상에 요청했을 때 에러가 나지 않는 적절히 큰 풀 카운트 수를 다음과 static.ts에 추가하면 됩니다. 그러면 해당 DEX의 정보가 반영되어 최적 경로가 탐색됩니다.

```
export const BAKERY_SWAP_ADDRESS = "0x116aae16a3a7044afe7063c6f870b119000b5abe"
export const bakeryFactory = "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7";
export const bakeryPoolCount = 70;
swapFeesRaw[BAKERY_SWAP_ADDRESS] = 0.003;
```
* 만약 DEX가 pancakeSwap의 factory와 인터페이스가 동일하지 않다면 PoolDto (dtos.ts에 정의됨)에 맞게 pool 정보를 받아오는 로직을 추가해야 합니다. viewer contract가 필요할 수 있는데, 이는 https://github.com/decipherhub/Orderbank/blob/master/contract/contracts/Viewer/BiSwapViewer.sol 를 참조 바랍니다.
