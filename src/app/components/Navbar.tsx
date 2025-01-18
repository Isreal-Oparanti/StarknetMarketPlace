"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConnect, useDisconnect, braavos, argent, useAccount } from "@starknet-react/core";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const connectors = [braavos(), argent()];
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();
  const router = useRouter();

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector });
      setModalOpen(false); // Close modal on successful connection

      // Save connection state to localStorage
      if (status === "connected" && address) {
        console.log("Wallet connected, storing state in localStorage");
        localStorage.setItem("walletConnected", "true");
        localStorage.setItem("walletAddress", address);
        router.push("/models"); // Redirect to models page
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();

    // Clear connection state from localStorage
    console.log("Wallet disconnected, clearing localStorage");
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    router.push("/"); // Redirect to landing page
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isWalletConnected = localStorage.getItem("walletConnected") === "true";
      const savedAddress = localStorage.getItem("walletAddress");

      console.log("Navbar useEffect - Wallet state:", {
        isWalletConnected,
        savedAddress,
        status,
      });

      if (isWalletConnected && savedAddress && status !== "connected") {
        router.push("/models");
      }
    }
  }, [status, address, router]);

  return (
    <>
      <nav className="bg-gray-800 border-gray-800 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <img src="/manu.png" alt="logo" className="w-10 inline" />
            <Link href="/" className="inline">
              AI Nexa
            </Link>
          </div>

          <div>
            {status === "connected" && address ? (
              <div className="flex items-center gap-4">
                <span className="text-purple-700 font-bold px-4 py-2 rounded-lg">
                  Connected: {address.substring(0, 6)}...{address.substring(address.length - 4)}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="p-2 pr-4 pl-4 bg-purple-900 text-white rounded hover:bg-purple-700 m-2"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal for Wallet Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Select Wallet</h2>
            <div className="flex flex-col gap-4">
              {connectors.map((connector, index) => (
                <button
                  key={index}
                  onClick={() => handleConnect(connector)}
                  className="p-2 border border-purple-800 rounded hover:bg-gray-800 rounded-xl font-bold"
                >
                  {connector.id || "Unknown Wallet"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 p-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
