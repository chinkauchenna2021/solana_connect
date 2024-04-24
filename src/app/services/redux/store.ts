import { create } from 'zustand'

interface State {
  ShowAllWallet:boolean
}

interface Action{
  resetShowWallet : (booleanValue:boolean) => void;
}



export const changeShowWallet = create<State & Action>((set) => ({
  ShowAllWallet:false,
  resetShowWallet: (booleanValue:boolean)=>set({ShowAllWallet: booleanValue})

  
}))