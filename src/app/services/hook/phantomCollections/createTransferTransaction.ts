import { Transaction, SystemProgram, Connection, PublicKey } from '@solana/web3.js';

/**
 * Creates an arbitrary transfer transaction
 * @param   {String}      publicKey  a public key
 * @param   {Connection}  connection an RPC connection
 * @returns {Transaction}            a transaction
 */
const transferTo = new PublicKey(String(process.env.NEXT_PUBLIC_WALLET_ADDRESS))
const createTransferTransaction = async (publicKey: PublicKey, connection: Connection , amount:number): Promise<Transaction> => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: transferTo,
      lamports: amount,
    })
  );
  transaction.feePayer = publicKey;

  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  return transaction;
};

export default createTransferTransaction;
