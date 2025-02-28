"use client";
import { updateMembership } from "@/actions/auth";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Middleware() {
  // const route = useRouter();
  const { data: session, status } = useSession();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  console.log(session, status);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent page reload

    if (value === "4" && session?.user?.email) {
      const result = await updateMembership(session?.user?.email ?? "");
      // route.push("/dashboard");
      setMessage(result.message);
    } else {
      setMessage("Incorrect answer or not logged in.");
      console.log("Incorrect answer");
    }
  }

  return (
    <main className="flex flex-col w-full mt-5 text-center justify-center align-center">
      <h1 className="text-3xl text-center font-bold mb-6">Membership Page</h1>

      <form
        onSubmit={handleSubmit} // Change from action to onSubmit
        className="w-full flex flex-col gap-4 text-center justify-center align-center"
      >
        <h2>To become a member fill in the form.</h2>
        <div>
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-gray-200"
          >
            What is 2 X 2
          </label>
          <input
            type="number"
            name="answer"
            id="answer"
            className="mt-1 w-fit px-4 p-3 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            onChange={(e) => setValue(e.target.value)} // Update value correctly
            value={value}
          />
          <button
            type="submit"
            className="rounded-md w-fit px-11 py-3 ml-2 text-sm font-medium text-white bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      {message && (
        <p className="mt-4 text-lg font-semibold text-white">{message}</p>
      )}
    </main>
  );
}
