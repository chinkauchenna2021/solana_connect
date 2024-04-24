"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");
import WalletConnect from "@/app/services/providers/WalletConnect";

export default function WalletConnection() {
  return (
    <WalletConnect>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div></div>
        <div className="flex space-x-4">
  
        </div>
        <div></div>
      </div>
    </WalletConnect>
  );
}