import { create } from 'zustand'

interface State {
  openBottomDrawer:boolean
}

interface Action{
  resetOpenBottomDrawer : (isOpen:boolean) => void;
}

export const changeOpenBottomDrawer= create<State & Action>((set) => ({
    openBottomDrawer:false,
    resetOpenBottomDrawer: (isOpen:boolean)=>set({openBottomDrawer: isOpen}) 
}))