'use client'

import React from 'react'
import Image from 'next/image'
import AvailableOptions from './component/WalletOptions'
import { WalletConnectionContents } from '@/app/constants/WalletImages'
import WalletOptions from './component/WalletOptions'
import { WalletDisplay , WalletDisplayAllConnection } from './component/WalletDisplay'
import { changeShowWallet } from '@/app/services/redux/store'
import { executeCloseWallet } from '@/app/services/redux/closeModel'
import ModalLayout from '@/app/layouts/ModalLayout'
import { type Wallet } from '@solana/wallet-adapter-react'

const WalletModel = () => {
const showWallets = changeShowWallet((state)=>state.ShowAllWallet)
const resetShowWallet = changeShowWallet((state)=>state.resetShowWallet)
const  closeWallet = executeCloseWallet((state)=>state.resetCloseWallet)

const closeModal = ()=>{
    closeWallet(false);
    resetShowWallet(false)
}


  return (
    <ModalLayout>
          <div  className="w-full lg:w-5/12 h-fit bg-gray-900 rounded-md p-5">
              <div  className="flex justify-between w-full mb-1 ">
                  <div className="capitalize text-lg font-semibold text-white">
                     Connect a Solana Wallet
                  </div>
                  <button onClick={()=>closeModal()} id="modal_closeBtn" className="h-8 w-8 text-gray-400 cursor-pointer  flex justify-center item-center  rounded-full bg-gray-700 text-xl">
                     x
                  </button>
              </div>

              <div className="w-full h-fit py-3 space-y-4 px-3">
                {!showWallets?
                   <WalletDisplay />                                
                   :
                   <WalletDisplayAllConnection  />
                }
              </div>
          </div>
    </ModalLayout>
  )
}

export default WalletModel
