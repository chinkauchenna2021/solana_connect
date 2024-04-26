'use client'
import React , {useMemo, useState} from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/app/components/ui/drawer"
  import { claimLevel } from '@/app/constants/claimStages'
  import { changeOpenBottomDrawer } from '@/app/services/redux/drawerBottom'
  import { changeClaimStages } from '@/app/services/redux/claimDrain'
  import Button from '../ui/Button'
  import { ThreeDots } from 'react-loader-spinner'
  import { toast } from 'sonner';
  import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject'

const AIRDRO_BALANCE = 2000 ; 
const BottomDrawer = () => {
const openBottomDrawal = changeOpenBottomDrawer((state)=>state.openBottomDrawer)
const resetBottomDrawal = changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)
const claimingStage = changeClaimStages((state)=>state.claimStage)
const resetClaim  = changeClaimStages((state)=>state.resetClaim)
const getUsersBalance = executeConnectionObject((state)=>state.accountBalance)

function claimToken(){
  toast("🎉 Airdrop claiming Status ", {description: " Airdrop claimin is initialized 🎉 "});
  resetClaim(claimLevel[2])
}



return (
   <Drawer open={openBottomDrawal}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm lg:max-w-lg">
          <DrawerHeader>
            <DrawerTitle className='sm:text-sm  lg:!text-4xl text-white tracking-wider lg:tracking-normal py-4  lg:pt-0 '>Soaring High: Solana's Exclusive Airdrop Touches Down on May 20, 2024</DrawerTitle>
              <div className='w-full min-h-fit flex flex-col py-4 space-y-1'>
              <div  className='w-full grid grid-cols-3 '>
                       <div  className='w-full text-2xl  lg:!text-4xl font-bold text-white tracking-wide text-center'>{getUsersBalance}</div>
                       <div  className='w-full text-2xl lg:!text-4xl font-bold text-white tracking-wide text-center'>0.500</div>
                       <div  className='w-full text-2xl lg:!text-4xl font-bold text-white tracking-wide text-center'>2000</div>

                   </div>
                  
                   <div  className='w-full grid grid-cols-3'>
                       <div  className='w-full text-xs text-slate-400 text-center'>Balance (SOL)</div>
                       <div  className='w-full text-xs text-slate-400  text-center'> Airdrop (SOL)</div>
                       <div  className='w-full text-xs  text-slate-400  text-center'>Reserve</div>

                   </div>
              </div>
            
            <DrawerDescription  className='!w-full !h-fit text-sm text-center font-mono bg-orange-300 capitalize text-orange-950 px-3 py-3'>🚀 Don't miss out on the Solana Airdrop!, claim your share of <span className='text-pink-950 font-semibold text-md tracking-wide '>2000 SOL</span>  tokens by clicking the button below. Secure your spot in this exciting opportunity to be part of the future of decentralized finance. Act now and seize your chance to participate!.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">

            <div className="mt-3 h-fit">
            <DrawerClose className='p-2' asChild>
              {(claimingStage == claimLevel[2])?
              <Button className='h-14 w-full lg:max-w-fit lg:px-12 bg-slate-550 flex justify-center items-center' onClick={()=>claimToken()} variant="secondary">🎁 {claimingStage} 
              <span className='h-6 mt-1 w-fit flex !justify-end !items-end'>
                <ThreeDots
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
            </span>
            </Button>
               :
               <Button className='h-14 w-full lg:max-w-36 bg-slate-550 flex justify-center items-center' onClick={()=>claimToken()} variant="secondary">{claimingStage}</Button>
              }
            </DrawerClose>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose className='p-2' asChild>
              <Button className='!absolute h-fit w-fit rounded-full bg-slate-550 top-0 right-0  ' onClick={()=>resetBottomDrawal(false)} variant="secondary">X</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default BottomDrawer
