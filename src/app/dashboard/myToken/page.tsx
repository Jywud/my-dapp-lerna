"use client";

import { useState, useEffect } from "react";
import SecureToken from "@/ABI/SecureToken"; // abi
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const COUNTER_ADDRESS = "0x538eF6B3A105C509DD07f5327e82D44032CE85B6" as const; // 测试网合约地址
const ADMIN_ADDRESS = "0x3dbeff0d9f5ac76d64a7eee47d05d8b6866a59d4" as const; // 我的地址

export default function MyToken() {
  const [mintAmount, setMintAmount] = useState("");
  // 获取当前的address是不是合约的部署者
  const { address: MY_ADDRESS } = useAccount();

  const isAdmin = MY_ADDRESS
    ? MY_ADDRESS.toLowerCase() === ADMIN_ADDRESS.toLowerCase()
    : false;

  // 读取 count 值
  const {
    data: balance,
    isError: isReadError,
    isLoading: isCountLoading,
    refetch: refetchBalance,
  } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: SecureToken,
    functionName: "balanceOf",
    args: [MY_ADDRESS],
    // watch: true, // 自动监听新区块并更新数据
  });

  // 读取合约的owner地址
  const { data: ownerAddress } = useReadContract({
    abi: SecureToken,
    address: COUNTER_ADDRESS,
    functionName: "owner",
  });

  // 写入 count 值
  const {
    writeContract,
    data: mintHash, // 交易哈希
    isPending: isMintPending,
  } = useWriteContract();

  const { isLoading: isMintConfirming, isSuccess: isMintConfirmed } =
    useWaitForTransactionReceipt({
      hash: mintHash, // 使用哈希等待交易确认
    });

  useEffect(() => {
    if (isMintConfirmed) {
      refetchBalance();
    }
  }, [isMintConfirmed]);

  // 处理 mint 交易
  function handleMint() {
    if (!mintAmount) {
      return;
    }
    setMintAmount("");

    writeContract({
      address: COUNTER_ADDRESS,
      abi: SecureToken,
      functionName: "mint",
      args: [MY_ADDRESS, mintAmount],
    });
  }
  const isMintDisabled = isMintConfirming || isMintPending;

  const [burnAmount, setBurnAmount] = useState("");

  // 写入 burn 值
  const {
    writeContract: writeBurnContract,
    data: burnHash, // 交易哈希
    isPending: isBurnPending,
  } = useWriteContract();

  const { isLoading: isBurnConfirming, isSuccess: isBurnConfirmed } =
    useWaitForTransactionReceipt({
      hash: burnHash, // 使用哈希等待交易确认
    });

  useEffect(() => {
    if (isBurnConfirmed) {
      refetchBalance();
    }
  }, [isBurnConfirmed]);

  // 处理 burn 交易
  function handleBurn() {
    if (!burnAmount) {
      return;
    }
    setBurnAmount("");

    writeBurnContract({
      address: COUNTER_ADDRESS,
      abi: SecureToken,
      functionName: "burn",
      args: [burnAmount],
    });
  }
  const isBurnDisabled = isBurnConfirming || isBurnPending;


  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  // 写入 transfer 值
  const {
    writeContract: writeTransferContract,
    data: transferHash, // 交易哈希
    isPending: isTransferPending,
  } = useWriteContract();
  const { isLoading: isTransferConfirming, isSuccess: isTransferConfirmed } =
    useWaitForTransactionReceipt({
      hash: transferHash, // 使用哈希等待交易确认
    });

  useEffect(() => {
    if (isTransferConfirmed) {
      refetchBalance();
    }
  }, [isTransferConfirmed]);

  // 处理 transfer 交易
  function handleTransfer() {
    if (!transferAddress || !transferAmount) {
      return;
    }
    // 检查转账地址是否格式正确
    if (!/^0x[a-fA-F0-9]{40}$/.test(transferAddress)) {
      alert("请输入正确的转账地址");
      return;
    }
    setTransferAddress("");
    setTransferAmount("");

    writeTransferContract({
      address: COUNTER_ADDRESS,
      abi: SecureToken,
      functionName: "transfer",
      args: [transferAddress, transferAmount],
    });
  }
  const isTransferDisabled = isTransferConfirming || isTransferPending;

  const [checkAddress, setCheckAddress] = useState("");
  // 输入地址点击按钮才调用

  const {
    data: isFrozen,
    isError: isCheckError,
    isLoading: isCheckLoading,
    refetch: refetchIsFrozen,
  } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: SecureToken,
    functionName: "isFrozen",
    args: [checkAddress],
    query: { enabled: Boolean(checkAddress) },
    // watch: true, // 自动监听新区块并更新数据
  });
  // 处理检查冻结交易
  function handleCheckFrozen() {
    if (!checkAddress) {
      return;
    }
    refetchIsFrozen();
  }


  return (
    <div className="p-10">
      <p>
        {" "}
        Balance: {isCountLoading
          ? "loading..."
          : balance?.toString() + " wei"}{" "}
      </p>
      {/* 转账 */}
      <div className="m-4">
        <input
          className="w-80 p-2 border border-gray-300 rounded-md"
          type="number"
          placeholder="mint amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
        <button
          disabled={isMintDisabled}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleMint}
        >
          {isMintDisabled ? "confirming..." : "mint"}
        </button>
      </div>
      {/* 销毁 */}
      <div className="m-4">
        <input
          className="w-80 p-2 border border-gray-300 rounded-md"
          type="number"
          placeholder="burn amount"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
        />
        <button
          disabled={isBurnDisabled}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={handleBurn}
        >
          {isBurnDisabled ? "confirming..." : "burn"}
        </button>
      </div>
      {/* 给某个地址转账 */}
      <div className="m-4">
        <input
          className="w-80 p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="recipient address"
          value={transferAddress}
          onChange={(e) => setTransferAddress(e.target.value)}
        />
        <input
          className="w-80 p-2 border border-gray-300 rounded-md"
          type="number"
          placeholder="transfer amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button
          disabled={isTransferDisabled}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={handleTransfer}
        >
          {isTransferDisabled ? "confirming..." : "transfer"}
        </button>
      </div>
      {/* 检查地址是否被冻结 */}
      <div className="m-4">
        <input
          className="w-80 p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="check address"
          value={checkAddress}
          onChange={(e) => setCheckAddress(e.target.value)}
        />
        <button          
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          onClick={handleCheckFrozen}
        >
         check frozen
        </button>
        {isCheckLoading ? (
          "loading..."
        ) : (
          <span className="ml-4 text-lg font-bold">{isFrozen ? "frozen" : "not frozen"}</span>
        )}
      </div>
    </div>
  );
}
