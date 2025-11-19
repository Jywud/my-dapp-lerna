"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  const [menus, setMenu] = useState([
    { url: "/dashboard", name: "wallet" },
    { url: "/dashboard/myToken", name: "myToken" },
    { url: "/dashboard/material", name: "Material UI" },
    { url: "/dashboard/zustand", name: "zustand" },
  ]);

  return (
    <div className="">
      <div className="flex justify-start items-center gap-6 mb-1 border-b border-gray-200 px-4 py-2">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            className={isActive(menu.url) ? activeClassName : ""}
            href={menu.url}
          >
            {menu.name}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
