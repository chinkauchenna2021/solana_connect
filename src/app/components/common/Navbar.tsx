'use client'
import React, { useEffect, useMemo } from 'react'
import {
    WalletDisconnectButton,
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
import WalletConnect from '@/app/services/providers/WalletConnect';
import HeaderLayout from '@/app/layouts/HeaderLayout';
import Button from '../ui/Button';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { useWallet, type Wallet  } from '@solana/wallet-adapter-react';


import type { EventEmitter, SendTransactionOptions, WalletName } from '@solana/wallet-adapter-base';
import { CustomConnectButton } from '../ui/CustomConnectButton';
import CustomWalletConnect from './CustomConnection/CustomWalletConnect';

// import {
//     BaseMessageSignerWalletAdapter,
//     scopePollingDetectionStrategy,
//     WalletAccountError,
//     WalletConnectionError,
//     WalletDisconnectedError,
//     WalletDisconnectionError,
//     WalletError,
//     WalletNotConnectedError,
//     WalletNotReadyError,
//     WalletPublicKeyError,
//     WalletReadyState,
//     WalletSendTransactionError,
//     WalletSignMessageError,
//     WalletSignTransactionError,
// } from '@solana/wallet-adapter-base';
// import type { Connection, SendOptions, Transaction, TransactionSignature } from '@solana/web3.js';
// import { PublicKey } from '@solana/web3.js';


  require("@solana/wallet-adapter-react-ui/styles.css");
  

export default function Navbar(){
    const { connect, connected, connecting, disconnect, disconnecting, select, } = useWallet();
    const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
    const drainStage = changeDrainStage((state)=>state.connectionStage)
    
    function claim(): void {
        
    }

    useMemo(()=>{
        console.log(connected , connecting )
    },[connected , connecting])
    
    function testClicked(){
        

    }

  return (
  <WalletConnect>
        <HeaderLayout>
          {(drainStage == connectionLevel[0]) &&  <CustomWalletConnect /> }

          {/* {(drainStage == connectionLevel[0]) && <WalletMultiButton className='hidden'/>} */}
          {/* {(drainStage == connectionLevel[0]) && <Button onClick={()=>resetCloseWallet(true)}  variant="secondary" >{drainStage}</Button>} */}
          {(drainStage == connectionLevel[1]) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
        </HeaderLayout>

          {/* <WalletDisconnectButton /> */}
  </WalletConnect>
  )
}



