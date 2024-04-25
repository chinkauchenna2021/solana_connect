'use client'
import React from 'react'
import WalletOptions from './WalletOptions'
import MoreOptions from './MoreOptions';
import { changeShowWallet } from '@/app/services/redux/store';
import {useWallet, type Wallet } from '@solana/wallet-adapter-react';

export function WalletDisplay() {
    const { select, wallets, publicKey, disconnect, connecting } = useWallet();
 const showSomeWallet = changeShowWallet((state)=>state.ShowAllWallet)
 const changeShowWallets = changeShowWallet((state) => state.resetShowWallet)
 return (
    <div>

        {
            wallets?.map((item:Wallet, index:number)=>{
                if(index >= 2) return ;
                return(
                    <div className='my-3' key={index}>
                    <WalletOptions src={item.adapter.icon} walletName={item.adapter.name} />
                    </div>
                )
            })
        }
    <MoreOptions showMore={()=>changeShowWallets(true)} />
    </div>
  )
}


export function WalletDisplayAllConnection(){
    const { select, wallets, publicKey, disconnect, connecting } = useWallet();
   return(
   <div>
    {
        wallets?.map((item:Wallet, index:number)=>{
            return(
                <div className='my-3' key={index}>
                <WalletOptions src={item.adapter.icon} walletName={item.adapter.name} />
                </div>
            )
        })
    }
</div>
 );
}
