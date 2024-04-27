import  bip39 from  'bip39';
import { Keypair } from '@solana/web3.js';

export async function generateSolanaWallet() {
    try {
        const mnemonic = bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const keypair = Keypair.fromSeed(seed);
        const publicKey = keypair.publicKey.toString();
        return{mnemonic , seed , keypair , publicKey }
    } catch (error) {
        console.error('Error:', error);
    }
}
