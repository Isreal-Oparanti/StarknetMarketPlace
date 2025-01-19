"use client";

import {
  type ConnectOptions,
  type DisconnectOptions,
  connect,
  disconnect,
} from "get-starknet";
import { AccountInterface, wallet } from "starknet";
import { useState } from "react";
import { TokenBalanceAndTransfer } from "../components/TokenBalanceAndTransfer";

function App() {
  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletIcon, setWalletIcon] = useState("");
  const [walletAccount, setWalletAccount] = useState<AccountInterface | null>(
    null
  );

  async function handleConnect(options?: ConnectOptions) {
    const res = await connect(options);
    setWalletName(res?.name || "");
    setWalletAddress(res?.account?.address || "");
    setWalletIcon(res?.icon || "");
    setWalletAccount(res?.account as unknown as AccountInterface);
  }

  async function handleDisconnect(options?: DisconnectOptions) {
    await disconnect(options);
    setWalletName("");
    setWalletAddress("");
    setWalletAccount(null);
  }

  return (
    <div className="App">
      <h1>get-starknet</h1>
      <div className="card">
        <button onClick={() => handleConnect({ modalMode: "alwaysAsk" })}>
          Connect
        </button>
        <button onClick={() => handleDisconnect()}>Disconnect</button>
      </div>
      {walletName && (
        <div>
          <h2>
            Selected Wallet: <pre>{walletName}</pre>
            <img src={walletIcon} alt="Wallet icon" />
          </h2>
          <ul>
            <li>
              Wallet address: <pre>{walletAddress}</pre>
            </li>
          </ul>
        </div>
      )}
      {walletAccount && (
        <TokenBalanceAndTransfer
          account={walletAccount}
          tokenAddress="0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
        />
      )}
    </div>
  );
}

export default App;
