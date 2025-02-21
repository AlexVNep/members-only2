"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>

          <Link href="/login">
            <li>Login</li>
          </Link>

          <Link href="/register">
            <li>Register</li>
          </Link>
        </div>
      </ul>
    </div>
  );
}

{
  /* <>
<li>
  <button className="p-2 px-5 -mt-1 bg-blue-800 rounded-full">
    Logout
  </button>
</li>
</> */
}
