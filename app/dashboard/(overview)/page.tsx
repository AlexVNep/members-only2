// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

import Post from "@/app/components/Post";
import { auth } from "@/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex flex-col gap-5 mt-5 items-center justify-between">
      <div className="flex gap-40 justify-around">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Link href="/postform">
          <div className="rounded-md w-full px-12 py-3 text-sm font-medium text-white bg-blue-600">
            Add New Post
          </div>
        </Link>
      </div>

      <Post />
    </div>
  );
}
