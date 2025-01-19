"use client";
import React, { useState, useEffect } from "react";
import { connect } from "starknetkit";
import {
  useUniversalDeployerContract,
  useSendTransaction,
  useAccount,
} from "@starknet-react/core";

function DeployERC20() {
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const { address } = useAccount(); // Get the connected wallet address
  const { udc } = useUniversalDeployerContract();

  // Function to connect wallet when button is clicked
  const connectToStarknet = async () => {
    try {
      const { wallet, connectorData } = await connect({
        modalMode: "canAsk", // Try connecting silently, ask if needed
        modalTheme: "light", // Light theme for the modal
        dappName: "My Starknet dApp", // Custom name for your dApp
        resultType: "wallet", // Return wallet object
      });

      // Log the success response
      console.log("Wallet connected successfully:", wallet);
      console.log("Connector data:", connectorData?.account);
      setWalletAddress(connectorData?.account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const { send, isPending, error, data } = useSendTransaction({
    calls:
      udc && walletAddress // Ensure walletAddress is available
        ? [
            udc.populate("deploy_contract", [
              "Starknet Contract", // Token name
              23, // Salt (ensure it's the correct value)
              false, // fromZero (boolean)
              [walletAddress], // Owner address (wrapped in an array)
            ]),
          ]
        : undefined,
  });

  useEffect(() => {
    if (address) {
      setWalletAddress(address); // Automatically set wallet address if already connected
    }
  }, [address]);

  return (
    <div>
      <div>
        {walletAddress ? (
          <p>Connected Address: {walletAddress}</p>
        ) : (
          <p>Wallet is not connected. Please connect your wallet.</p>
        )}
      </div>

      {/* Button to open the connect modal */}
      <button onClick={connectToStarknet}>Connect Wallet</button>

      {/* Button to trigger the contract deployment if wallet is connected */}
      {walletAddress && (
        <button onClick={() => send()} disabled={isPending}>
          {isPending ? "Deploying..." : "Deploy ERC20"}
        </button>
      )}

      {/* Error handling */}
      {error && <div style={{ color: "red" }}>Error: {error.message}</div>}

      {/* Displaying transaction data */}
      {data && <div>Transaction Data: {JSON.stringify(data)}</div>}
    </div>
  );
}

export default DeployERC20;
