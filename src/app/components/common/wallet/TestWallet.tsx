import React, { useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

function TestWallet() {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // Define the Solana network to connect to
  const network = WalletAdapterNetwork.Devnet;

  // Create a connection to the Solana network
  const endpoint = clusterApiUrl(network);

  const wallets = [
    {
      name: 'Phantom',
      provider: 'https://phantom.app/',
    },
    {
      name: 'Sollet',
      provider: 'https://www.sollet.io/',
    },
    // Add more wallet options as needed
  ];

  const handleWalletClick = (provider:any) => {
    setSelectedWallet(provider);
    setWalletModalOpen(true);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
        {/* @ts-ignore */}
      <WalletProvider wallets={wallets} autoConnect>
        <div>
          <h1>Select a Solana wallet:</h1>
          <ul>
            {wallets.map((wallet) => (
              <li key={wallet.name}>
                <button onClick={() => handleWalletClick(wallet.provider)}>
                  {wallet.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedWallet && (
          <WalletModal
            isOpen={walletModalOpen}
            provider={selectedWallet}
            onClose={() => setWalletModalOpen(false)}
          />
        )}
        {/* Your Solana application components */}
      </WalletProvider>
    </ConnectionProvider>
  );
}

// WalletModal component
const WalletModal = ({ isOpen, provider, onClose }:{isOpen:boolean , provider:any , onClose:()=>void}) => {
  const { wallet } = useWallet();

  const connectWallet = () => {
    window.open(provider, '_blank');
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>
        <h2>Connect {provider} wallet</h2>
        <p>
          Click the button below to open {provider} and connect your wallet.
        </p>
        <button onClick={connectWallet}>Connect Wallet</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TestWallet;
