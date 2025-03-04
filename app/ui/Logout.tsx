"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div onClick={() => signOut({ callbackUrl: "/sign-in" })}>
      <div className="bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer">
        logout
      </div>
    </div>
  );
}
