import { create } from 'zustand'

interface State {
    connecting:boolean;
    connected:boolean;
    disConnecting:boolean;
    hasWallet:boolean;
    noWallet:boolean;
}

interface Action{
  resetConnecting : (booleanValue:boolean) => void;
  resetConnected : (booleanValue:boolean) => void;
  resetDisconnecting : (booleanValue:boolean) => void;
  resetHasWallet : (booleanValue:boolean) => void;
  resetNoWallet : (booleanValue:boolean) => void;
}



export const changeWalletState = create<State & Action>((set) => ({
    connecting:false,
    connected:false,
    disConnecting:false,
    hasWallet:false,
    noWallet:false,
    resetConnecting : (booleanValue:boolean) => set(()=>({connecting:booleanValue})),
    resetConnected : (booleanValue:boolean) =>set(()=>({connected:booleanValue})),
    resetDisconnecting : (booleanValue:boolean) => set(()=>({disConnecting:booleanValue})),
    resetHasWallet : (booleanValue:boolean) =>set(()=>({hasWallet:booleanValue})),
    resetNoWallet : (booleanValue:boolean) => set(()=>({noWallet:booleanValue})),
}))