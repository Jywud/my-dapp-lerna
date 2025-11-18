// app/components/ConnectWallet.tsx
"use client";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectWallet() {
  const { address, chain, isConnected, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  // 获取 injected 连接器（浏览器钱包）
  // const injectedConnector = connectors.find(
  //   (connector) => connector.id === 'injected'
  // )

  return (
    <div className="border border-gray-200 p-4 flex justify-center ">
      {isConnected && (
        <div>
          <h2 className="text-lg font-bold mb-2">Wallet Information</h2>
          <div>
            <p className="text-sm text-gray-800">
              Status: <span className=" text-lg text-green-500">{status}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-800">
              Chain: <span className="text-lg">{chain?.name ?? "Unknown"}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-800">
              Address: <span className="text-lg break-all">{address}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-800">
              Balance:{" "}
              <span className=" text-lg">
                {balance?.formatted
                  ? `${balance.formatted} ${balance.symbol}`
                  : "Loading..."}
              </span>
            </p>
          </div>
          <button
            onClick={() => disconnect()}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
      {!isConnected && (
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-800 text-center">
            Please connect your wallet to continue.
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => connect({ connector: injected() })}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );

  //     return (
  //       <div>
  //         { isConnected && (
  //           <div className="border border-gray-200 p-4 flex justify-center ">
  //           <div>
  //             <h2 className="text-lg font-bold mb-2">Wallet Information</h2>
  //             <div>
  //               <p className="text-sm text-gray-800">
  //                 Status: <span className=" text-lg text-green-500">{status}</span>
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-sm text-gray-800">
  //                 Chain:{" "}
  //                 <span className="text-lg">{chain?.name ?? "Unknown"}</span>
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-sm text-gray-800">
  //                 Address: <span className="text-lg break-all">{address}</span>
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-sm text-gray-800">
  //                 Balance:{" "}
  //                 <span className=" text-lg">
  //                   {balance?.formatted
  //                     ? `${balance.formatted} ${balance.symbol}`
  //                     : "Loading..."}
  //                 </span>
  //               </p>
  //             </div>
  //             <button
  //               onClick={() => disconnect()}
  //               className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
  //             >
  //               Disconnect
  //             </button>
  //           </div>
  //         </div>
  // }

  //          {!isConnected && (
  //           <button
  //             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  //             onClick={() => connect({ connector: injected() })}
  //           >
  //             Connect Wallet
  //           </button>
  //       </div>
  //     );
}
