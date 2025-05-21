"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import clsx from "clsx";

const tabs = [
  { name: "สิทธิพิเศษ", href: "/deal" },
  { name: "สินค้า", href: "/product" },
  { name: "คูปองของฉัน", href: "/voucher" },
];

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.href = "/deal";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">GOOK GOOK</h1>

        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                pathname.startsWith(tab.href)
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer text-sm text-red-600 border border-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition"
        >
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
}
