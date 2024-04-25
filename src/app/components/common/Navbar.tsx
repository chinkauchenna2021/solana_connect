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
  require("@solana/wallet-adapter-react-ui/styles.css");
  

export default function Navbar(){

    const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
    const drainStage = changeDrainStage((state)=>state.connectionStage)
    
    function claim(): void {
        
    }
    
    function testClicked(){
        
    }
    

  return (
  <WalletConnect>
        <HeaderLayout>
          {(drainStage == connectionLevel[0]) && <WalletMultiButton  onClick={()=>testClicked()} />}
          {/* {(drainStage == connectionLevel[0]) && <Button onClick={()=>resetCloseWallet(true)}  variant="secondary" >{drainStage}</Button>} */}
          {(drainStage == connectionLevel[1]) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
        </HeaderLayout>

          {/* <WalletDisconnectButton /> */}
  </WalletConnect>
  )
}



