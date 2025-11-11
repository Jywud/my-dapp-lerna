// app/components/counter.tsx
"use client";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import ConnectWallet from "@/app/components/ConnectWallet";
// import { W3mConnectButton } from '@web3modal/wagmi'

// 替换为你部署的 Counter 合约地址
const COUNTER_ADDRESS = "0x0748ddc754a35d1bb0fbd4cb2c054102fe7a4ca7" as const; // 测试网
// const COUNTER_ADDRESS = '0x3f3308dEDf0C5c45bF3015eEf22CD3e6a02269A6' as const // 本地
const counterAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "getCount",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "increment",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export default function CounterPage() {
  const { address, isConnected } = useAccount();

  const {
    writeContract,
    data: incrementHash, // 交易哈希
    isPending: isIncrementPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: incrementHash, // 使用哈希等待交易确认
    });

  // 读取 count 值
  const {
    data: currentCount,
    isError: isReadError,
    isLoading: isCountLoading,
  } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: counterAbi,
    functionName: "getCount",
    // watch: true, // 自动监听新区块并更新数据
  });

  function handleIncrement() {
    writeContract({
      address: COUNTER_ADDRESS,
      abi: counterAbi,
      functionName: "increment",
    });
  }

  return (
    <>
      <ConnectWallet />
      {isConnected && (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <p className="text-lg">当前计数</p>
            <p className="text-3xl font-mono my-3">
              {isCountLoading ? "加载中..." : currentCount?.toString() ?? "--"}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              disabled={isIncrementPending || isConfirming}
              onClick={handleIncrement}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              {isIncrementPending
                ? "确认中..."
                : isConfirming
                ? "处理中.."
                : "增加计数"}
            </button>

            <div> {isConfirmed && <div>增加计数成功！</div>}</div>
          </div>

          {isReadError && (
            <p className="text-red-500 text-center mt-4">读取数据失败</p>
          )}

          <div> {incrementHash && <div>交易哈希: {incrementHash}</div>}</div>

          {/* {isWriteError && (
        <p className="text-red-500 text-center mt-4">
          交易失败: {writeError?.message}
        </p>
      )} */}
        </div>
      )}
    </>
  );
}
