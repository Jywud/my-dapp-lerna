'use client'
import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'viem/chains'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

// 定义你的本地测试网。这里以 Ganache 默认配置为例。
const localNetwork = {
  id: 5777, // 或 5777 等，请根据你的本地测试网 ID 修改
  name: 'Local Network',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:7545'], // 请替换为你的本地测试网 RPC URL，例如 Ganache 通常是 7545 或 8545
    },
  },
};

// 创建 wagmi 配置
export const config = createConfig({
  chains: [localNetwork, mainnet, sepolia],
  ssr: true,
  connectors: [injected()], // injected 浏览器
  transports: {
    [localNetwork.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// 创建 QueryClient 实例
const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}