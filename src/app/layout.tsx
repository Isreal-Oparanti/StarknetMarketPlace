import type { Metadata } from "next";
//  
import "./globals.css";
import { StarknetProvider } from "./components/starknet-provider";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "AI Marketplace",
  description: "Decentralized AI Model Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StarknetProvider>
          <Navbar />
          {children}
        </StarknetProvider>
      </body>
    </html>
  );
}
