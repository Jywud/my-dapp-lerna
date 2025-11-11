// app/components/ConnectWallet.tsx
'use client'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function ConnectWallet() {
  const { address, chain, isConnected, status } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })
  // 获取 injected 连接器（浏览器钱包）
  // const injectedConnector = connectors.find(
  //   (connector) => connector.id === 'injected'
  // )

  if (isConnected) {
    return (
     <div>
       <div className="border border-gray-200 rounded-lg p-4 shadow-md bg-white">
        {/* <h3 className="text-lg font-semibold mb-2">Wallet Information</h3> */}
        <div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chain</p>
            <p className="font-medium capitalize">{chain?.name ?? 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="font-medium">
              {balance?.formatted ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => disconnect()} 
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect
        </button>
      </div>
     </div>
    )
  }

  return (
    <button  className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
      onClick={() => connect({ connector: injected() })}
    >
      Connect Wallet
    </button>
  )
}