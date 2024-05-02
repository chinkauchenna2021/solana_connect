// import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletAdapterPhantom } from '@solana/wallet-adapter-wallets';

// // Function to send a transaction without revealing details
// async function sendTransactionWithoutDetails(wallet, transaction) {
//     if (wallet) {
//         if (wallet.wallet instanceof WalletAdapterPhantom) {
//             try {
//                 // Sign the transaction without revealing details
//                 await wallet.signTransaction(transaction, wallet.publicKey, { signOnly: true });
//                 // Broadcast the transaction separately
//                 await wallet.sendSignedTransaction(transaction.serialize());
//                 console.log("Transaction signed and broadcasted successfully!");
//             } catch (error) {
//                 console.error("Error signing or broadcasting transaction:", error);
//             }
//         } else {
//             console.error("Unsupported wallet adapter. Only Phantom wallet is supported.");
//         }
//     } else {
//         console.error("Wallet not connected.");
//     }
// }

// // Example usage
// const { wallet, connect, disconnect, connected } = useWallet();
// const transaction = /* Your transaction object */;
// sendTransactionWithoutDetails(wallet, transaction);