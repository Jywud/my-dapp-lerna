'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 导航栏Link根据 url高亮
  const currentPathname = usePathname();
  // 导航栏Link根据 url高亮
  const isActive = (href: string) => {
    return currentPathname === href;
  };
  // 导航栏Link根据 url高亮
  const activeClassName = "text-[#0080ff]";

  return (
    <div className="">
      <div className="flex justify-start items-center gap-6 mb-1 border-b border-gray-200 px-4 py-2">
        <Link className={isActive("/dashboard") ? activeClassName : ""} href="/dashboard">wallet</Link>
        <Link className={isActive("/dashboard/myToken") ? activeClassName : ""} href="/dashboard/myToken">MyToken</Link>
        <Link className={isActive("/dashboard/about") ? activeClassName : ""} href="/dashboard/about">Material</Link>
      </div>
      {children}
    </div>
  );
}
