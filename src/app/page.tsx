import Image from "next/image";
import Link from 'next/link'
import ConnectWallet from "@/app/components/ConnectWallet";
import CounterPage from "@/app/components/CounterPage";
export default function Home() {
  return (
    <div className="">    
     {/* <ConnectWallet />    */}
     <CounterPage />
    </div>
  );
}
