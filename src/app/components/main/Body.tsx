"use client"
import React , {useEffect , useState} from 'react'
import { getAllSPL } from '@/app/services/redux/getAllSPL'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import { FiCheck } from "react-icons/fi";

function Body(){
    const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
    const [getUserBalance , setUserBalance ] = useState<number>(0)
     const {publicKey } = useWallet();
        const splWallet = getAllSPL((state)=>state.walletspl)
        console.log(splWallet)

      useEffect(()=>{
          (async()=>{
            const balance = await connection.getBalance(
                publicKey  as unknown as PublicKey
              );
             setUserBalance(balance)
          })()

      },[connection , publicKey , getUserBalance])

  return (
    <div className="w-full">
      <div className='w-fit flex  flex-col justify-center py-6 space-y-5 px-2'>
            <div className='w-full text-center lg:text-left text-3xl lg:text-5xl font-bold tracking-wide text-white'>Solana Foundation's Token Appreciation Program: Thank You for Believing in Solana!</div>
            <div className=' text-center  lg:text-left text-white text-sm' style={{lineHeight:"22px"}}>
            We are thrilled to announce the launch of Solana Foundation's Token Appreciation Program, our way of expressing gratitude to each and every user who has shown unwavering support for Solana, even during challenging times. As a token of our appreciation, we are distributing rewards to all users holding 85% or more of their Solana tokens in their wallets, along with any other tokens they may hold. This initiative aims to celebrate and thank our community for their belief in the Solana ecosystem's potential. We deeply appreciate your continued trust and confidence in Solana, and we look forward to a future filled with growth, innovation, and shared success. Thank you for being an integral part of the Solana journey!
            </div>
        </div>
        {(splWallet.length != 0)?   
       ( <div className='w-full h-fit flex justify-center items-center pb-12 py-9  px-2'>
        <ScrollArea className="h-[260px] w-full rounded-md border p-4 text-white m-auto">
             <div className='w-full text-center text-lg text-white tracking-wide lg:text-xl pb-6'>Your Airdrop Reward Tokens (Remove From our Reserve)</div>
              <div className='h-fit w-full lg:w-4/6 flex flex-col m-auto space-y-5'>
                 { (getUserBalance > 0) &&

                 (
                  <div className='w-full flex justify-between mt-2 items-center'>
                  <Image className='rounded-full bg-black' src={'/images/solana_logo_main.png'} alt={'name'} height={40} width={40} />
                   <div className='flex text-2xl text-red-400'>
                   {
                     - (((getUserBalance * 85) / 100) / (Math.pow(10,9))) + " SOL"
                   }
                      
                  </div>
              </div>

                 )

                 }
                  
                {
                  splWallet.map((item,index)=>{
                    return(
                         <div className='w-full flex justify-between mt-2 items-center'>
                         <div className='w-10 h-10 rounded-full bg-green-950 flex justify-center items-center'><FiCheck className='!text-green-400' /></div>
                           <div className='flex text-2xl text-red-400'>
                               -{(item.balance / Math.pow(10,9))+" "}
                              {item.symbol}
                            </div>
                      </div>
                    )
                  })
                }
            </div>   
        </ScrollArea>   
        </div> )
        : 
        ""
      }


    </div>
  )
}

export default Body
