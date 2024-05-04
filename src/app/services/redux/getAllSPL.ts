import { create } from 'zustand'


interface StateObject{ 
    balance: number;
    name: any; 
    symbol: any;
    logo: any; 
}

interface State {
  walletspl:StateObject[]
}

interface Action{
  resetWalletSpl : (spl:[]) => void;
}


export const  getAllSPL = create<State & Action>((set) => ({
    walletspl:[],
    resetWalletSpl: (spl:[])=>set({walletspl:spl})
}))