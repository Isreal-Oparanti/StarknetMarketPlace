"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { Sidebar } from "../components/Sidebar";
import { ModelListing } from "../components/ModelListing";

export default function ModelsPage() {
  const router = useRouter();
  const { status } = useAccount();

//   useEffect(() => {
//     // Redirect to landing page if not connected
//     if (status !== "connected") {
//       router.push("/");
//     }
//   }, [status, router]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1">
        <ModelListing />
      </main>
    </div>
  );
}
