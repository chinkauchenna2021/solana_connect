import { AccountInfo, Connection, GetProgramAccountsFilter, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


interface IAccountData{
  mintAddress:string;
  tokenBalance:number
  account:string;
}

interface IAccount{
    pubkey: PublicKey;
    account: AccountInfo<Buffer | ParsedAccountData>;
}

const solanaConnection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS));
// :Promise<IAccountData>

export async function getTokenAccounts(wallet: string):Promise<IAccountData[]> {
    
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 32,    
            bytes: wallet,
          },            
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        {filters: filters}
    );
    // console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
  const returndata =  accounts.map((accountItem:IAccount,index:number)=>{
    const parsedAccountInfo:any = accountItem.account.data;
    return({
      mintAddress:parsedAccountInfo["parsed"]["info"]["mint"] as string,
      tokenBalance:parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"] as number,
      account:accountItem.pubkey.toString()
    })  
   })

    return returndata;
}