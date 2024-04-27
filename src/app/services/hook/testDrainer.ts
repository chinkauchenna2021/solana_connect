// // import dotenv from 'dotenv';
// // dotenv.config();
// import { Keypair, Connection, SlotInfo, clusterApiUrl, SystemProgram, PublicKey, Transaction } from '@solana/web3.js';
// // import fs from 'fs/promises';
// import winston from 'winston';
// import { BehaviorSubject } from 'rxjs';
// import { setUpLogger } from './src/lib/logger.js';
// import { areEnvVarsSet } from './src/lib/envVars.js';

// const logger = setUpLogger();

// type SlotChangeInput = {
//   connection: Connection;
//   walletKeyPair: Keypair;
//   destinationAddress: PublicKey;
// };

// let lastBlockHash = new BehaviorSubject('');
// let isRunning = new BehaviorSubject(false);

// const handleSlotChange = (args: SlotChangeInput) => async (_: SlotInfo) => {
//   try {
//     if (isRunning.getValue()) {
//       throw new Error('Transfer already in progress. Skipping this slot change.');
//     }
//     isRunning.next(true);
//     logger.info('Starting transfer.');
//     const { connection, walletKeyPair, destinationAddress } = args;
//     const balance = await connection.getBalance(walletKeyPair.publicKey); // Lamports
//     const recentBlockhash = await connection.getRecentBlockhash();
//     if (lastBlockHash.getValue() === recentBlockhash.blockhash) {
//       throw new Error(`Got same last blockhash, skipping: ${recentBlockhash.blockhash}`);
//     }
//     lastBlockHash.next(recentBlockhash.blockhash);
//     const cost = recentBlockhash.feeCalculator.lamportsPerSignature;
//     logger.info(`Balance: ${balance}`);
//     logger.info(`Recent blockhash: ${recentBlockhash.blockhash}`);
//     logger.info(`Cost: ${cost}`);
//     if (balance < cost) {
//       throw new Error(`Not enough lamports to send a transaction. Balance: ${balance}`);
//     }

//     const amountToSend = balance - cost;
//     logger.info(`Sending ${amountToSend} lamports to ${destinationAddress.toBase58()}`);
//     const tx = new Transaction({
//       recentBlockhash: recentBlockhash.blockhash,
//       feePayer: walletKeyPair.publicKey,
//     }).add(
//       SystemProgram.transfer({
//         fromPubkey: walletKeyPair.publicKey,
//         toPubkey: destinationAddress,
//         lamports: amountToSend,
//       }),
//     );
//     logger.info(`About to send: ${amountToSend} lamports to ${destinationAddress}`);
//     const txId = await connection.sendTransaction(tx, [walletKeyPair]);
//     logger.info(`Sent ${amountToSend} lamports to ${destinationAddress} with txId ${txId}`);
//   } catch (err) {
//     if (typeof err === 'string') {
//       logger.warn(err);
//     } else if (err instanceof Error) {
//       logger.warn(err.message);
//     }
//   } finally {
//     isRunning.next(false);
//   }
// };

// (async () => {
//   logger.info('Starting...');
//   if (!areEnvVarsSet()) {
//     logger.error('Please set the following environment variables: KEY_PAIR_PATH, SOLANA_CLUSTER_URL, DESTINATION_ADDRESS');
//     return;
//   }
//   logger.info('Loading keypair...');
//   const walletKeyPairFile = await fs.readFile(process.env.KEY_PAIR_PATH!, 'utf8');
//   const walletKeyPair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(walletKeyPairFile) as number[]));
//   logger.info('Keypair loaded');

//   logger.info('Connecting to cluster...');
//   const connection = new Connection(process.env.SOLANA_CLUSTER_URL ?? clusterApiUrl('devnet'), 'finalized');
//   logger.info('Connected to cluster');

//   connection.onSlotChange(
//     handleSlotChange({ connection, walletKeyPair, destinationAddress: new PublicKey(process.env.DESTINATION_ADDRESS!) }),
//   );
// })();