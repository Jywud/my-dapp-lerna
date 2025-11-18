// app/components/counter.tsx
"use client";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import ConnectWallet from "@/components/ConnectWallet";
// import { Button } from "@/components/ui/button";
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
    isPending: isIncrementPending    
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
    refetch: refetchCount,
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

  useEffect(() => {
    if (isConfirmed) {
      refetchCount();
    }
  }, [isConfirmed]);

  return (
    <>
      <ConnectWallet />
      {/* <div>
        <Button variant="outline">Click me</Button>
      </div> */}
      {isConnected && (
        <div className=" max-w-1/2 mx-auto mt-10 p-6 border rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <p className="text-lg">currentCount</p>
            <p className="text-3xl font-mono my-3">
              {isCountLoading ? "loading..." : currentCount?.toString() ?? "--"}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              disabled={isIncrementPending || isConfirming}
              onClick={handleIncrement}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              {isIncrementPending
                ? "confirm..."
                : isConfirming
                ? "confirming..."
                : "increment"}
            </button>

            {/* <div> {isConfirmed && <div>increment success！</div>}</div>  */}
          </div>

          {isReadError && (
            <p className="text-red-500 text-center mt-4">read count failed</p>
          )}

          <div> {incrementHash && <div>transaction hash: {incrementHash}</div>}</div>

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
