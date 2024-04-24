import { Connection, clusterApiUrl, PublicKey, TokenAmount, RpcResponseAndContext } from '@solana/web3.js';

export const getBalance = async (publicKey:string)=>{
    try {
    // const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')
    const connection = new Connection('https://api.metaplex.solana.com'); 
    const publicKeyObj = new PublicKey(publicKey);
    const balance =  await connection.getBalance(publicKeyObj);
    console.log('user solana balance: ',balance)
    return balance;
    } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
    }
   
}