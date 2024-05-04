import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { ENV, TokenListProvider } from "@solana/spl-token-registry";
const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS));


export async function getTokenMetadataSPL(tokenAddress:string) {
  const metaplex = Metaplex.make(connection);
  const mintAddress = new PublicKey(tokenAddress);

  let tokenName;
  let tokenSymbol;
  let tokenLogo;
  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

    if (metadataAccountInfo) {
          const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
          tokenName = token.name;
          tokenSymbol = token.symbol;
          tokenLogo = token.json?.image;
    }
    else {
        const provider = await new TokenListProvider().resolve();
        const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
        console.log(tokenList)
        const tokenMap = tokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map());

        const token = tokenMap.get(mintAddress.toBase58());

        tokenName = token.name;
        tokenSymbol = token.symbol;
        tokenLogo = token.logoURI;
    }

    return{
        tokenName,
        tokenSymbol,
        tokenLogo
    }
}
