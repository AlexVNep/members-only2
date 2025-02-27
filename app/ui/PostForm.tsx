"use client";
import { useRouter } from "next/navigation";
import PostButton from "./PostButton";
import { createPost } from "@/actions/auth";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PostForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [createdBy, setCreatedBy] = useState(session?.user?.email);

  useEffect(() => {
    setCreatedBy(session?.user?.email);
  }, [session]);

  console.log(session, status);
  async function handleSubmit(formData: FormData) {
    const result = await createPost(formData);

    if ("error" in result) {
      setError(result.error);
    } else if ("success" in result) {
      router.push("/dashboard"); // Redirect only if registration is successful
    }
  }
  return (
    <div>
      <form action={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-200">
            Title:
          </label>
          <input
            type="text"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            name="title"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-200">
            Message:
          </label>
          <input
            type="text"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            name="message"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-200">
            Created by:
          </label>
          <input
            type="text"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            name="createdBy"
            defaultValue={createdBy ?? ""}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <PostButton />
      </form>
    </div>
  );
}
