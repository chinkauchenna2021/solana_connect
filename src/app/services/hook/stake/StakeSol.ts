'use client'
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
  } from "@solana/web3.js";
  import { Wallet, useWallet } from "@solana/wallet-adapter-react";
  import { executeConnectionObject } from "../../redux/walletConnectionObject";
  
 export  async function StakeSol() {
    const userBalance = executeConnectionObject((state)=>state.accountBalance)
    const lamportconversion = userBalance * LAMPORTS_PER_SOL
    const { wallet , publicKey:usersPublicKey } = useWallet()
    // Setup our connection and wallet
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection(String(process.env.NEXT_PUBLIC_SOLANA_HTTPS))
    // const wallet = Keypair.generate();
  
    // Fund our wallet with 1 SOL
    // const airdropSignature = await connection.requestAirdrop(
    //   wallet.publicKey,
    //   LAMPORTS_PER_SOL
    // );
    // await connection.confirmTransaction(airdropSignature);
  
    // Create a keypair for our stake account
    // const stakeAccount = Keypair.generate();
  
    // Calculate how much we want to stake
    const minimumRent = await connection.getMinimumBalanceForRentExemption(
      StakeProgram.space
    );
    const amountUserWantsToStake =  lamportconversion // This is can be user input. For now, we'll hardcode to 0.5 SOL
    const amountToStake = minimumRent + amountUserWantsToStake;
  
    // Setup a transaction to create our stake account
    // Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured with the necessary `TransactionInstruction`s
    const createStakeAccountTx = StakeProgram.createAccount({
      authorized: new Authorized(usersPublicKey as PublicKey, usersPublicKey as PublicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our wallet.
      fromPubkey: usersPublicKey as PublicKey,
      lamports: amountToStake,
      lockup: new Lockup(0, 0,  usersPublicKey as PublicKey), // Optional. We'll set this to 0 for demonstration purposes.
      stakePubkey: usersPublicKey as PublicKey,
    });
  
    const createStakeAccountTxId = await sendAndConfirmTransaction(
      connection,
      createStakeAccountTx,
      [wallet] as unknown  as Signer[]
    );
    // stakeAccount, // Since we're creating a new stake account, we have that account sign as well
    console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);
  
    // Check our newly created stake account balance. This should be 0.5 SOL.
    let stakeBalance = await connection.getBalance(usersPublicKey as PublicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);
  
    // Verify the status of our stake account. This will start as inactive and will take some time to activate.
    let stakeStatus = await connection.getStakeActivation(usersPublicKey as PublicKey);
    console.log(`Stake account status: ${stakeStatus.state}`);
  };