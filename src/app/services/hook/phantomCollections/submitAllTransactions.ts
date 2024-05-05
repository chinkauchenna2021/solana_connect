import { Connection } from "@solana/web3.js";



const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))

async function submitAndSendTransactions( signedTransactions: any[]) {
        try {
            // Iterate through the array of signed transactions
            for (const signedTransaction of signedTransactions) {
                // Send the transaction to the Solana blockchain
                const txid = await connection.sendRawTransaction(signedTransaction.serialize());
                
                console.log('Transaction sent:', txid ,signedTransaction.serialize() ,  signedTransaction ,  );
                // Confirm the transaction
                await connection.confirmTransaction(txid);
    
            }
        } catch (error) {
            console.error('Error sending transactions:', error);
        }
    }

    export default submitAndSendTransactions
    