import { create } from 'zustand';
import { connectionLevel } from '@/app/constants/conneectionStages';

interface State {
  connectionStage:string
}

interface Action{
  resetConnectionStage : (stages:string) => void;
}

export const changeDrainStage = create<State & Action>((set) => ({
    connectionStage:connectionLevel[0],
    resetConnectionStage :(stages:string)=>set({connectionStage: stages})
}))