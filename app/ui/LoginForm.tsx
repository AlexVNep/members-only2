"use client";
import { useSession } from "next-auth/react";
// import { auth } from "@/auth";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";
// import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [error, setError] = useState<string | null>(null);

  console.log(session, status);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await loginWithCreds(formData);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    // ✅ Force update session so the UI updates immediately
    await update();

    // ✅ Redirect to dashboard
    router.push("/dashboard");
  }
  return (
    <div className="">
      <form action={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton />
        </div>
        <div className="text-center">
          Don&apos;t have an account?
          <br />
          <Link className="text-blue-600 hover:underline" href="/register">
            Register Here.
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
