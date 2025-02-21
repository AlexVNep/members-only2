"use client";

// import { useSession } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

export default function RegisterForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 text-black rounded px-3 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 text-black rounded px-3 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <p className="text-red-600 text-[16px] mb-4"></p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
}
