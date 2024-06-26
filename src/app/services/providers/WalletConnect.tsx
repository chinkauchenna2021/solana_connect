"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter,CoinbaseWalletAdapter  , CloverWalletAdapter ,SaifuWalletAdapter , SafePalWalletAdapter ,SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export default function WalletConnect({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet ;
  const endpoint = String(process.env.NEXT_PUBLIC_SOLANA_HTTPS)
  //  useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(() => [new CloverWalletAdapter()  ,new CoinbaseWalletAdapter(), new SolflareWalletAdapter() , new SafePalWalletAdapter() , new SaifuWalletAdapter()], []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
