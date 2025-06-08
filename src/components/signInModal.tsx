"use client";

import clsx from "clsx";
import { useAuth } from "@/hooks/users/useAuth";

export default function SigninModal() {
  const auth = useAuth();

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center transition-opacity duration-500 z-50",
        auth.showModal ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
      <form
        onSubmit={auth.login}
        className="bg-white p-8 rounded-xl max-w-sm w-full relative z-10 shadow-2xl space-y-4 animate-fade-in"
      >
        <h2 className="text-xl font-bold text-center text-gray-800">
          🔐 กรุณาเข้าสู่ระบบ
        </h2>

        <input
          name="username"
          value={auth.username}
          onChange={(e) => auth.setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="password"
          value={auth.password}
          onChange={(e) => auth.setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={auth.loading}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md font-medium disabled:opacity-50"
          >
            {auth.loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
          <button
            type="button"
            onClick={auth.fillDefaultCredentials}
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm whitespace-nowrap"
          >
            ใช้ Default User
          </button>
        </div>
      </form>
    </div>
  );
}
