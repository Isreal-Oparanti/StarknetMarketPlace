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
  const [loading, setLoading] = useState(false);
  const [storedAddress, setStoredAddress] = useState<string | null>(null);
  const connectors = [braavos(), argent()];
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  const [linkPath, setLinkPath] = useState("");

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
      localStorage.removeItem("walletAddress");
      setStoredAddress(null);
      router.push("/");
    } catch (error) {
      console.error("Disconnection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "connected" && address) {
      console.log("Wallet connected");
      localStorage.setItem("walletAddress", address);
      setStoredAddress(address);
      router.push("/create-model");
    }
  }, [status, address, router]);

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setStoredAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);

    const newLinkPath =
      path === "/model-listing" ? "/create-model" : "/model-listing";
    setLinkPath(newLinkPath);
  }, []);

  return (
    <>
      <nav className="bg-black bg-gradient-to-r from-black via-[#57328a] to-black text-white shadow-2xl border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <img src="/manu.png" alt="logo" className="w-10 inline" />
            <Link href="/" className="inline">
              AI Nexa
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              {linkPath && (
                <a
                  href={linkPath}
                  className="p-2 rounded underline text-[#A263F7]"
                >
                  {currentPath === "/model-listing"
                    ? "Create Model"
                    : "Go to Listing Page"}
                </a>
              )}
            </div>
            {storedAddress ? (
              <div className="flex items-center gap-4">
                <span className="text-[#A263F7] font-bold px-4 py-2 rounded-lg">
                  Connected: {storedAddress.substring(0, 6)}...
                  {storedAddress.substring(storedAddress.length - 4)}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? "Disconnecting..." : "Disconnect"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="p-2 pr-4 pl-4 text-[#A263F7] text-white rounded hover:text-[#A263F7] m-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6"></div>
                ) : (
                  "Connect Wallet"
                )}
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
                  disabled={loading}
                >
                  {loading ? "Connecting..." : connector.id || "Unknown Wallet"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 p-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
