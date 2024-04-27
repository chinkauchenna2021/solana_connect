//sendSol.js
// const web3 = require("@solana/web3.js");
// const connection = new web3.Connection(
//     "<YOUR_QUICKNODE_URL_HERE>",
//     'confirmed',
//   );

// const secret=[00, ... 00]; // Replace with your secret key
// const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));

// // Generate a random address to send to
// const to = web3.Keypair.generate();


// (async () => {
//     const transaction = new web3.Transaction().add(
//         web3.SystemProgram.transfer({
//           fromPubkey: from.publicKey,
//           toPubkey: to.publicKey,
//           lamports: web3.LAMPORTS_PER_SOL / 100,
//         }),
//       );
    
//       // Sign transaction, broadcast, and confirm
//       const signature = await web3.sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [from],
//       );
//       console.log('SIGNATURE', signature);
// })()


// //sendSol.js
// const web3 = require("@solana/web3.js");
// const connection = new web3.Connection(
//     "<YOUR_QUICKNODE_URL_HERE>",
//     'confirmed',
//   );

// const secret=[00, ... 00]; // Replace with your secret key
// const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));

// // Generate a random address to send to
// const to = web3.Keypair.generate();

// (async () => {
//     const transaction = new web3.Transaction().add(
//         web3.SystemProgram.transfer({
//           fromPubkey: from.publicKey,
//           toPubkey: to.publicKey,
//           lamports: web3.LAMPORTS_PER_SOL / 100,
//         }),
//       );
    
//       // Sign transaction, broadcast, and confirm
//       const signature = await web3.sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [from],
//       );
//       console.log('SIGNATURE', signature);
// })()


// import {
//     Connection,
//     PublicKey,
//     Keypair,
//     Transaction,
//     TransactionInstruction,
//   } from '@solana/web3.js';
  
//   // Define constants
//   const TOKEN_PROGRAM_ID = new PublicKey(
//     'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
//   );
  
//   // Define your Solana network connection
//   const connection = new Connection('https://api.devnet.solana.com');
  
//   // Define sender and receiver wallet keypairs
//   const senderWallet = Keypair.generate();
//   const receiverWallet = Keypair.generate();
  
//   // Define sender's token account address
//   const senderTokenAccount = new PublicKey('sender_token_account_address_here');
  
//   // Define receiver's token account address
//   const receiverTokenAccount = new PublicKey('receiver_token_account_address_here');
  
//   // Define the transfer amount and decimals (if applicable)
//   const transferAmount = 1000000; // Amount in smallest token unit (e.g., lamports)
//   const decimals = 6; // Decimals of the token
  
//   // Transfer tokens function
//   async function transferTokens() {
//     try {
//       // Load sender's token account information
//       const senderTokenAccountInfo = await connection.getAccountInfo(senderTokenAccount);
//       if (!senderTokenAccountInfo) {
//         throw new Error('Sender token account not found');
//       }
  
//       // Create a transaction instruction to transfer tokens
//       const transferInstruction = new TransactionInstruction({
//         keys: [
//           { pubkey: senderTokenAccount, isSigner: false, isWritable: true },
//           { pubkey: receiverTokenAccount, isSigner: false, isWritable: true },
//           { pubkey: senderWallet.publicKey, isSigner: true, isWritable: false },
//         ],
//         programId: TOKEN_PROGRAM_ID,
//         data: Buffer.from([3, ...Buffer.alloc(8), ...Buffer.from(transferAmount.toString(), 'utf8')]),
//       });
  
//       // Create a transaction
//       const transaction = new Transaction().add(transferInstruction);
  
//       // Sign the transaction
//       transaction.sign(senderWallet);
  
//       // Send the transaction to the Solana network
//       const signature = await connection.sendTransaction(transaction, [senderWallet]);
  
//       console.log('Transaction sent with signature:', signature);
//     } catch (error) {
//       console.error('Error transferring tokens:', error);
//     }
//   }
  
//   // Call the transferTokens function
//   transferTokens();
  














// import {
//     Connection,
//     PublicKey,
//     Keypair,
//     Transaction,
//     TransactionInstruction,
//     SystemProgram,
//   } from '@solana/web3.js';
  
//   // Define constants
//   const TOKEN_PROGRAM_ID = new PublicKey(
//     'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
//   );
  
//   // Define your Solana network connection
//   const connection = new Connection('https://api.devnet.solana.com');
  
//   // Define sender and recipient wallet keypairs
//   const senderWallet = Keypair.generate();
//   const recipientWallet = Keypair.generate();
  
//   // Define the token account to transfer ownership from
//   const tokenAccount = new PublicKey('sender_token_account_address_here');
  
//   // Create a new token account for the recipient
//   const newTokenAccount = Keypair.generate();
  
//   // Transfer ownership function
//   async function transferOwnership() {
//     try {
//       // Authorize the new token account
//       const authorizeInstruction = Token.createSetAuthorityInstruction(
//         TOKEN_PROGRAM_ID,
//         newTokenAccount.publicKey,
//         recipientWallet.publicKey, // New owner
//         'AccountOwner', // Authority type
//         senderWallet.publicKey, // Current owner
//         [] // Additional signers
//       );
  
//       // Transfer ownership of the token account
//       const transferInstruction = new TransactionInstruction({
//         keys: [
//           { pubkey: tokenAccount, isSigner: false, isWritable: true },
//           { pubkey: newTokenAccount.publicKey, isSigner: true, isWritable: true },
//           { pubkey: senderWallet.publicKey, isSigner: true, isWritable: false },
//         ],
//         programId: TOKEN_PROGRAM_ID,
//         data: Buffer.from([6]), // Transfer instruction data
//       });
  
//       // Create a transaction
//       const transaction = new Transaction().add(authorizeInstruction).add(transferInstruction);
  
//       // Sign the transaction
//       transaction.sign(senderWallet, newTokenAccount);
  
//       // Send the transaction to the Solana network
//       const signature = await connection.sendTransaction(transaction, [senderWallet, newTokenAccount]);
  
//       console.log('Ownership transfer transaction sent with signature:', signature);
//     } catch (error) {
//       console.error('Error transferring ownership:', error);
//     }
//   }
  
//   // Call the transferOwnership function
//   transferOwnership();
  






// import {
//     Connection,
//     PublicKey,
//     Keypair,
//     Transaction,
//     TransactionInstruction,
//     SystemProgram,
//   } from '@solana/web3.js';
  
//   // Initialize connection to Solana network
//   const connection = new Connection('https://api.devnet.solana.com');
  
//   // Initialize User A and User B wallets
//   const userAWallet = Keypair.generate();
//   const userBWallet = Keypair.generate();
  
//   // Initialize User A's token account
//   const userATokenAccount = Keypair.generate();
//   // Initialize User B's token account
//   const userBTokenAccount = Keypair.generate();
  
//   // Initialize token mint
//   const tokenMint = new PublicKey('token_mint_address_here');
  
//   async function main() {
//     try {
//       // Create token accounts for User A and User B
//       const createAccountsTx = new Transaction().add(
//         SystemProgram.createAccount({
//           fromPubkey: userAWallet.publicKey,
//           newAccountPubkey: userATokenAccount.publicKey,
//           lamports: await connection.getMinimumBalanceForRentExemption(165),
//           space: 165,
//           programId: TokenProgram.programId,
//         }),
//         SystemProgram.createAccount({
//           fromPubkey: userBWallet.publicKey,
//           newAccountPubkey: userBTokenAccount.publicKey,
//           lamports: await connection.getMinimumBalanceForRentExemption(165),
//           space: 165,
//           programId: TokenProgram.programId,
//         }),
//       );
  
//       // Sign and send account creation transaction
//       const createAccountsTxSignature = await connection.sendTransaction(
//         createAccountsTx,
//         [userAWallet, userBWallet],
//         { skipPreflight: false },
//       );
//       console.log('Create accounts transaction signature:', createAccountsTxSignature);
  
//       // Allowance approval by User A
//       const approveAmount = 100; // Amount to approve (in token base units)
//       const approveTx = await Token.createApproveInstruction(
//         TokenProgram.programId,
//         userATokenAccount.publicKey,
//         userBWallet.publicKey,
//         userAWallet,
//         approveAmount,
//       );
  
//       console.log('Approval transaction signature:', approveTx);
  
//       // Transfer tokens by User B
//       const transferAmount = 50; // Amount to transfer (in token base units)
//       const transferTx = await Token.createTransferInstruction(
//         TokenProgram.programId,
//         userATokenAccount.publicKey,
//         userBTokenAccount.publicKey,
//         userAWallet,
//         [],
//         transferAmount,
//       );
  
//       console.log('Transfer transaction signature:', transferTx);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
//   // Execute main function
//   main();
  









// const { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');

// async function transferTokens(fromAccount, toAccount, amount) {
//   const connection = new Connection('https://api.mainnet-beta.solana.com');

//   // Fetch recent blockhash
//   const { blockhash } = await connection.getRecentBlockhash();

//   // Create a new transaction
//   const transaction = new Transaction().add(
//     SystemProgram.transfer({
//       fromPubkey: fromAccount.publicKey,
//       toPubkey: toAccount.publicKey,
//       lamports: amount,
//     })
//   );

//   // Sign the transaction
//   transaction.feePayer = fromAccount;
//   transaction.recentBlockhash = blockhash;
//   transaction.partialSign(fromAccount);

//   // Send and confirm the transaction
//   await sendAndConfirmTransaction(connection, transaction, [fromAccount]);

//   console.log('Tokens transferred successfully!');
// }

// // Create Solana keypairs for the sender and receiver accounts
// const senderAccount = Keypair.fromSecretKey(new Uint8Array([...]));

// const receiverAccount = new PublicKey('...');

// // Transfer 1 SOL from sender to receiver
// transferTokens(senderAccount, receiverAccount, 1000000000);








// import React, { useState } from 'react';
// import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

// function TokenOwnershipTransfer() {
//   const [status, setStatus] = useState('');
  
//   // Initialize connection to Solana network
//   const connection = new Connection('https://api.devnet.solana.com');

//   // Initialize User A and User B wallets
//   const userAKeypair = Keypair.generate(); // Sender (User A)
//   const userBPublicKey = new PublicKey('user_b_wallet_public_key_here'); // Recipient (User B)

//   async function transferOwnership() {
//     try {
//       setStatus('Initializing transfer...');
      
//       // Check if User A has sufficient funds and create a transaction
//       const balance = await connection.getBalance(userAKeypair.publicKey);
//       if (balance < 1000000) { // Ensure User A has enough SOL for fees (1000000 lamports = 0.001 SOL)
//         throw new Error('Insufficient funds in User A wallet');
//       }

//       const transaction = new Transaction().add(
//         SystemProgram.transfer({
//           fromPubkey: userAKeypair.publicKey,
//           toPubkey: userBPublicKey,
//           lamports: 1000000, // Transfer ownership fee (0.001 SOL)
//         })
//       );

//       // Sign and send the transaction
//       const signature = await connection.sendTransaction(transaction, [userAKeypair]);
//       setStatus(`Ownership transfer initiated. Transaction Signature: ${signature}`);
//     } catch (error) {
//       setStatus(`Error: ${error.message}`);
//     }
//   }

//   return (
//     <div>
//       <button onClick={transferOwnership}>Transfer Ownership</button>
//       <p>Status: {status}</p>
//     </div>
//   );
// }

// export default TokenOwnershipTransfer;
