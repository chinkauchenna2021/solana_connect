// import React from 'react';
// import {
//   WalletNotConnectedError,
//   SignerWalletAdapterProps
// } from '@solana/wallet-adapter-base';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import {
//   createTransferInstruction,
//   createAssociatedTokenAccountInstruction,
//   getAssociatedTokenAddress,
//   getAccount
// } from '@solana/spl-token';
// import {
//   PublicKey,
//   Transaction,
//   Connection,
//   TransactionInstruction
// } from '@solana/web3.js';

// export const configureAndSendCurrentTransaction = async (
//   transaction: Transaction,
//   connection: Connection,
//   feePayer: PublicKey,
//   signTransaction: SignerWalletAdapterProps['signTransaction']
// ) => {


// const SendSolanaSplTokens: React.FC = () => {
//   const { connection } = useConnection();
//   const { publicKey, signTransaction } = useWallet();

//   const handlePayment = async () => {
//     try {
//       if (!publicKey || !signTransaction) {
//         throw new WalletNotConnectedError();
//       }
//       const mintToken = new PublicKey(
//         '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
//       ); // 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU is USDC token address on solana devnet
//       const recipientAddress = new PublicKey(
//         'token receiver solana account address'
//       );

//       const transactionInstructions: TransactionInstruction[] = [];
//       const associatedTokenFrom = await getAssociatedTokenAddress(
//         mintToken,
//         publicKey
//       );
//       const fromAccount = await getAccount(connection, associatedTokenFrom);
//       const associatedTokenTo = await getAssociatedTokenAddress(
//         mintToken,
//         recipientAddress
//       );
//       if (!(await connection.getAccountInfo(associatedTokenTo))) {
//         transactionInstructions.push(
//           createAssociatedTokenAccountInstruction(
//             publicKey,
//             associatedTokenTo,
//             recipientAddress,
//             mintToken
//           )
//         );
//       }
//       transactionInstructions.push(
//         createTransferInstruction(
//           fromAccount.address, // source
//           associatedTokenTo, // dest
//           publicKey,
//           1000000 // transfer 1 USDC, USDC on solana devnet has 6 decimal
//         )
//       );
//       const transaction = new Transaction().add(...transactionInstructions);
//       const signature = await configureAndSendCurrentTransaction(
//         transaction,
//         connection,
//         publicKey,
//         signTransaction
//       );
//       // signature is transaction address, you can confirm your transaction on 'https://explorer.solana.com/?cluster=devnet'
//     } catch (error) {}
//   };

//   return <button onClick={handlePayment}>Transfer spl token</button>;
// };


// export default SendSolanaSplTokens;