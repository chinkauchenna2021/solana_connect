import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Keypair } from '@solana/web3.js';

export async function generateSolanaWallet() {
    try {
        // Generate a mnemonic phrase
        const mnemonic = generateMnemonic();

        // Convert mnemonic phrase to seed
        const seedBuffer = await mnemonicToSeed(mnemonic);
        const seed = new Uint8Array(seedBuffer).slice(0, 32);
        const keypair = Keypair.fromSeed(seed);
        const publicKey = keypair.publicKey;
        return { mnemonic, seed, keypair, publicKey };
    } catch (error) {
        console.error('Error:', error);
    }
}

