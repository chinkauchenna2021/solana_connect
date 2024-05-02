import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { Connection, Keypair, ParsedAccountData, PublicKey, Transaction } from '@solana/web3.js';
// import {Token} from '@solana/spl-token';

// const solanaRpcUrl = 'https://api.mainnet-beta.solana.com'; // or your preferred Solana RPC URL

// const connection = new web3.Connection(solanaRpcUrl, 'confirmed');

// // Connect to the wallet
// const wallet = new web3.WalletConnection(yourPrivateKey);

// // Load the SPL token program
// const tokenProgramId = new web3.PublicKey(splToken.TOKEN_PROGRAM_ID);

// // Sender's token account
// const senderTokenAccount = new web3.PublicKey(yourSenderTokenAccountAddress);

// // Recipient's token account
// const recipientTokenAccount = new web3.PublicKey(yourRecipientTokenAccountAddress);

// Amount of tokens to transfer
// const amount = 100; // or your desired amount
const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))

async function getNumberDecimals(mintAddress: string):Promise<number> {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
}




export async function tokenInstruction(transferAmount:number , mintAddress:string , from_publicKey:PublicKey ,from_keypair:Keypair , to_publicKey:string) {
    console.log(`Sending ${transferAmount} ${(mintAddress)} from ${(from_publicKey)} to ${(to_publicKey)}.`)
    const numberDecimals = await getNumberDecimals(mintAddress);
    console.log(`Number of Decimals: ${numberDecimals}`);


    let sourceAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        from_keypair,
        new PublicKey(mintAddress),
        from_publicKey
    );


    let destinationAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        from_keypair,
        new PublicKey(mintAddress),
        new PublicKey(to_publicKey)
    );

    console.log(`4 - Creating and Sending Transaction`);

    const transaction  = new Transaction().add(createTransferInstruction(
        sourceAccount.address,
        destinationAccount.address,
        from_publicKey,
        transferAmount * Math.pow(10, numberDecimals)
    ))

    const latestBlockHash = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = await latestBlockHash.blockhash; 
    transaction.feePayer
//     // Create transfer transaction
//     const transaction = new web3.Transaction().add(
//       splToken.Token.createTransferInstruction(
//         tokenProgramId,
//         senderTokenAccount,
//         recipientTokenAccount,
//         wallet.publicKey, // sender's public key
//         [],
//         amount
//       )
//     );
    
//     // Sign and send transaction
//     web3.sendAndConfirmTransaction(
//       connection,
//       transaction,
//       [wallet.signer],
//       { commitment: 'confirmed' }






    //   const transferInstruction = Token.createTransferInstruction(
    //     TOKEN_PROGRAM_ID,
    //     publicKey, // Sender's token account
    //     receiverPublicKey, // Receiver's token account
    //     publicKey, // Payer
    //     [], // Signers (empty because payer is the only signer)
    //     100 // Amount to transfer (in lamports)
    // );
    
    // // Create a new transaction
    // const transaction = new Transaction().add(transferInstruction);
    
    // // Set the fee payer for the transaction
    // transaction.feePayer = publicKey;
    
    // // Set the recent blockhash for the transaction
    // transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    

}



