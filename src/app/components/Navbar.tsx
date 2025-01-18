"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useConnect,
  useDisconnect,
  braavos,
  argent,
  useAccount,
} from "@starknet-react/core";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [storedAddress, setStoredAddress] = useState<string | null>(null);
  const connectors = [braavos(), argent()];
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();
  const router = useRouter();

  const handleConnect = async (connector: any) => {
    setLoading(true);
    try {
      connect({ connector });
      setModalOpen(false);
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      disconnect();
      console.log("Wallet disconnected");
      localStorage.removeItem("walletAddress"); // Remove address from localStorage
      setStoredAddress(null); // Clear the stored address in state
      router.push("/");
    } catch (error) {
      console.error("Disconnection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync wallet address with localStorage when connected
  useEffect(() => {
    if (status === "connected" && address) {
      console.log("Wallet connected");
      localStorage.setItem("walletAddress", address); // Store address in localStorage
      setStoredAddress(address); // Update state
      router.push("/create-model");
    }
  }, [status, address, router]);

  // Get wallet address from localStorage on page load
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setStoredAddress(savedAddress);
    }
  }, []);

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
            {storedAddress ? (
              <div className="flex items-center gap-4">
                <span className="text-purple-700 font-bold px-4 py-2 rounded-lg">
                  Connected: {storedAddress.substring(0, 6)}...
                  {storedAddress.substring(storedAddress.length - 4)}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Disconnecting..." : "Disconnect"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="p-2 pr-4 pl-4 bg-purple-900 text-white rounded hover:bg-purple-700 m-2"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </nav>

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
                  disabled={loading} // Disable buttons when loading
                >
                  {loading ? "Connecting..." : connector.id || "Unknown Wallet"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 p-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
              disabled={loading} // Disable button when loading
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
