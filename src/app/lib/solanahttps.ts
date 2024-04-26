import { Connection } from '@solana/web3.js';

export function solanaConnection(){
    console.log(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
    const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS));
    return connection;
}