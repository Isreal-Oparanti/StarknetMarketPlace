import { useEffect, useState } from "react";
import { AccountInterface, Call, Contract } from "starknet";
import erc20Abi from "@/utils/erc20Abi.json";

interface TokenBalanceAndTransferProps {
  account: AccountInterface;
  tokenAddress: string;
}

export function TokenBalanceAndTransfer({
  account,
  tokenAddress,
}: TokenBalanceAndTransferProps) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (account) {
          // Create a contract instance
          const erc20 = new Contract(erc20Abi, tokenAddress, account);

          // Use the `call` method to interact with the smart contract
          const result = await erc20.call("balanceOf", [account.address]);

          if (result) {
            const balance = BigInt(result as any); // Parse the result
            const decimals = 18n;
            const formattedBalance = balance / 10n ** decimals; // Adjust for decimals
            setBalance(Number(formattedBalance)); // Convert to a number for UI
          } else {
            console.error(
              "Unexpected result structure from balanceOf:",
              result
            );
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }

    fetchBalance();
  }, [account, tokenAddress]);

  async function handleTransfer() {
    try {
      if (account) {
        const erc20 = new Contract(erc20Abi, tokenAddress, account);
        // Replace this example recipient address.
        const recipientAddress =
          "0x01aef74c082e1d6a0ec786696a12a0a5147e2dd8da11eae2d9e0f86e5fdb84b5";
        const amountToTransfer = 1n * 10n ** 18n; // 1 token (in smallest units).

        // Populate transfer call.
        const transferCall: Call = erc20.populate("transfer", [
          recipientAddress,
          amountToTransfer,
        ]);

        // Execute transfer.
        const { transaction_hash: transferTxHash } = await account.execute([
          transferCall,
        ]);

        await account.waitForTransaction(transferTxHash);

        const newBalance = (await erc20.balanceOf(account.address)) as bigint;
        setBalance(Number(newBalance / 10n ** 18n)); // Adjust for decimals
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    }
  }

  return (
    <div>
      <h3>
        Token Balance: {balance !== null ? `${balance} STRK` : "Loading..."}
      </h3>
      <button onClick={handleTransfer}>Transfer 1 STRK</button>
    </div>
  );
}
