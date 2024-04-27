import { Connection, Keypair, PublicKey, Transaction, SystemProgram , LAMPORTS_PER_SOL, Signer} from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react'
const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS));

const {sendTransaction} = useWallet()
export async function approveTokensForSpendingandSendToken(amount:number , userAPublicKey:PublicKey, userBkeyPair:Keypair , signTransaction:Awaited<any>) {
    const approveTx = new Transaction().add(
        approveInstruction(amount,userAPublicKey, userBkeyPair?.publicKey)
    );

      const signature = await sendTransaction(approveTx , connection);
      console.log('Approval transaction sent. Signature:', signature);
      await transferTokensFromUserAtoUserB(amount , userBkeyPair , userAPublicKey)
}

function approveInstruction(amount:number, senderPublicKey:PublicKey, recipientPublicKey:PublicKey) {
    return SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
    });
}

async function transferTokensFromUserAtoUserB(amount:number , userBKeypair:Keypair ,userAKeypair:PublicKey ) {
    const transferTx = new Transaction().add(
        transferInstruction(amount, userBKeypair?.publicKey, userAKeypair)
    );

    const signature = await connection.sendTransaction(transferTx, [userBKeypair]);
    console.log('Transfer transaction sent. Signature:', signature);
}

function transferInstruction(amount:number, recipientPublicKey:PublicKey, senderPublicKey:PublicKey) {
    return SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
    });
}

