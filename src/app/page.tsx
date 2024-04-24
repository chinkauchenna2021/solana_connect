'use client'
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


export default function Home() {
const closeWallet = executeCloseWallet((state)=>state.closeWallet)
const resetCloseWallet = executeCloseWallet((state)=>state.resetCloseWallet)
const drainStage = changeDrainStage((state)=>state.connectionStage)
const loading = changeLoadingState((state)=>state.loading)
const openDrawer = changeOpenBottomDrawer((state)=>state.openBottomDrawer)
const resetOpenDrawer =  changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)


const claim = ()=>{
  resetOpenDrawer(true)   
}
  return (
<div className="w-full flex justify-center items-center">
   <BodyLayout>
        <HeaderLayout>
          {(drainStage == connectionLevel[0]) && <Button onClick={()=>resetCloseWallet(true)}  variant="secondary" >{drainStage}</Button>}
          {(drainStage == connectionLevel[1]) && <Button onClick={()=>claim()}  variant="secondary" >{drainStage}</Button>}
           
        </HeaderLayout>
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
