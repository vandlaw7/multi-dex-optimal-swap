export const PANCAKE_VIEWER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "factoryAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "poolInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            internalType: "address",
            name: "token1",
            type: "address",
          },
          {
            internalType: "uint112",
            name: "token0Reserve",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "token1Reserve",
            type: "uint112",
          },
          {
            internalType: "string",
            name: "token0Name",
            type: "string",
          },
          {
            internalType: "string",
            name: "token1Name",
            type: "string",
          },
          {
            internalType: "string",
            name: "token0Symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "token1Symbol",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "token0Decimals",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "token1Decimals",
            type: "uint8",
          },
        ],
        internalType: "struct PoolViewer.PoolInfo[]",
        name: "poolInfoList",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
    ],
    name: "poolInfosByList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            internalType: "address",
            name: "token1",
            type: "address",
          },
          {
            internalType: "uint112",
            name: "token0Reserve",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "token1Reserve",
            type: "uint112",
          },
          {
            internalType: "string",
            name: "token0Name",
            type: "string",
          },
          {
            internalType: "string",
            name: "token1Name",
            type: "string",
          },
          {
            internalType: "string",
            name: "token0Symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "token1Symbol",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "token0Decimals",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "token1Decimals",
            type: "uint8",
          },
        ],
        internalType: "struct PoolViewer.PoolInfo[]",
        name: "poolInfoList",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const ORDER_BANK_VIEWER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_orderBank",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "orderBank",
    outputs: [
      {
        internalType: "contract IOrderBank",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getOrderBankInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "allOrdersLength",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPending",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCompleted",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCanceled",
            type: "uint256",
          },
        ],
        internalType: "struct OrderBankViewer.OrderBankInfo",
        name: "orderBankInfo",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "enum IOrderBank.Status",
        name: "status",
        type: "uint8",
      },
    ],
    name: "getTotalOrderList",
    outputs: [
      {
        components: [
          {
            internalType: "enum IOrderBank.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positiveSlippage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IOrderBank.OrderInfo[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "totalOrder",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastOffset",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "enum IOrderBank.Status",
        name: "status",
        type: "uint8",
      },
    ],
    name: "getMakerOrderList",
    outputs: [
      {
        components: [
          {
            internalType: "enum IOrderBank.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positiveSlippage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IOrderBank.OrderInfo[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "totalOrder",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastOffset",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getTakerOrderList",
    outputs: [
      {
        components: [
          {
            internalType: "enum IOrderBank.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positiveSlippage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IOrderBank.OrderInfo[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "totalOrder",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastOffset",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const ORDER_BANK_V2_VIEWER_ABI = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_orderBook",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "orderBook",
    outputs: [
      {
        internalType: "contract OrderBook",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "numberOfAllOrderIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "numberOfOrderIdsOfAccount",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfOrderIdsOfMaker",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfOrderIdsOfTaker",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "numberOfOrderIdsOfToken",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfOrderIdsOfFromToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfOrderIdsOfToToken",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "allOrders",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum Orders.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct Orders.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "maker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "ordersOfMaker",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum Orders.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct Orders.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "ordersOfTaker",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum Orders.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct Orders.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "ordersOfToToken",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum Orders.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct Orders.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "ordersOfFromToken",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum Orders.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "fromToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "toToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fromAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct Orders.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
