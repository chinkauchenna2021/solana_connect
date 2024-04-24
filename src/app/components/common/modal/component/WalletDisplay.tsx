'use client'
import React from 'react'
import WalletOptions from './WalletOptions'
import MoreOptions from './MoreOptions';
import { changeShowWallet } from '@/app/services/redux/store';

export function WalletDisplay({walletOptions}:{walletOptions:{src:string,walletName:string}[]}) {
 const showSomeWallet = changeShowWallet((state)=>state.ShowAllWallet)
 const changeShowWallets = changeShowWallet((state) => state.resetShowWallet)

 return (
    <div>

        {
            walletOptions.map((item , index)=>{
                if(index >= 2) return ;
                return(
                    <div className='my-3' key={index}>
                    <WalletOptions src={item.src} walletName={item.walletName} />
                    </div>
                )
            })
        }
    <MoreOptions showMore={()=>changeShowWallets(true)} />
    </div>
  )
}


export function WalletDisplayAllConnection({walletOptions}:{walletOptions:{src:string,walletName:string}[]}){
   return(
   <div>
    {
        walletOptions.map((item , index)=>{
            return(
                <div className='my-3' key={index}>
                <WalletOptions src={item.src} walletName={item.walletName} />
                </div>
            )
        })
    }
</div>
 );
}
