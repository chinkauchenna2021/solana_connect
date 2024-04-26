'use client'
import React, { useMemo } from 'react'
import HeaderLayout from '@/app/layouts/HeaderLayout';
import Button from '../ui/Button';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { useWallet, } from '@solana/wallet-adapter-react';
import { changeOpenBottomDrawer } from '@/app/services/redux/drawerBottom';
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject';

export default function Navbar(){
    const { connect, connected, connecting, disconnect, disconnecting, select, } = useWallet();
    const resetOpenDrawer =  changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)
    const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
    const drainStage = changeDrainStage((state)=>state.connectionStage)
    const getIsConnected = executeConnectionObject((state)=>state.isConnected)
    

    useMemo(()=>{
      console.log(connected , connecting )
  },[connected , connecting])
  

    function claim(){
      resetOpenDrawer(true) 
    }


  return (
        <HeaderLayout>
          {(drainStage == connectionLevel[0] ) &&  <Button onClick={()=>resetCloseWallet(true)}  variant="secondary" >{drainStage}</Button> }
          {(drainStage == connectionLevel[1]) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
        </HeaderLayout>

  )
}



