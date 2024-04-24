import { create } from 'zustand'

interface State {
  loading:boolean
}

interface Action{
  resetLoadingState : (booleanValue:boolean) => void;
}

export const changeLoadingState = create<State & Action>((set) => ({
  loading:false,
  resetLoadingState: (booleanValue:boolean)=>set({loading: booleanValue}) 
}))