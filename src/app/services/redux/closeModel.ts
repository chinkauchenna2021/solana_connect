import { create } from 'zustand'
import { persist} from 'zustand/middleware'


interface State {
  closeWallet:boolean
}

interface Action{
  resetCloseWallet : (booleanValue:boolean) => void;
}

export const executeCloseWallet = create<State & Action>((set) => ({
  closeWallet:false,
  resetCloseWallet: (booleanValue:boolean)=>set({closeWallet: booleanValue}) 
}))