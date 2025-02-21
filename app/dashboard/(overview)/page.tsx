"use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-between">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
      <p className="text-lg">
        Today is{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        .
      </p>
      <div className="">
        <div className="mt-8">
          <p className="text-lg">Hello,!</p>
        </div>
      </div>
    </div>
  );
}
