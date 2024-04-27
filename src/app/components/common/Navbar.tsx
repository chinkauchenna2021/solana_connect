'use client'
import React, { useEffect, useMemo } from 'react'
import HeaderLayout from '@/app/layouts/HeaderLayout';
import Button from '../ui/Button';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { useWallet, } from '@solana/wallet-adapter-react';
import { changeOpenBottomDrawer } from '@/app/services/redux/drawerBottom';
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject';
import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar(){
    const { connect, connected, connecting, disconnect, disconnecting, select, wallet } = useWallet();
    const resetOpenDrawer =  changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)
    const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
    const drainStage = changeDrainStage((state)=>state.connectionStage)
    const resetDrainage = changeDrainStage((state)=>state.resetConnectionStage)
    const getIsConnected = executeConnectionObject((state)=>state.isConnected)
  
    function claim(){
      resetOpenDrawer(true) 
    }
   useEffect(()=>{
    if(wallet?.adapter.connected){
      resetDrainage(connectionLevel[1])
    }
   },[wallet?.adapter.connected])

  return (
        <HeaderLayout>
          {(drainStage == connectionLevel[0] ) && <WalletMultiButton/> }
          {(drainStage == connectionLevel[1]) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
        </HeaderLayout>

  )
}



