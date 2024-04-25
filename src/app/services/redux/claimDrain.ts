import { create } from 'zustand'
import { claimLevel } from '@/app/constants/claimStages';

interface State {
  claimStage:string
}

interface Action{
  resetClaim : (booleanValue:string) => void;
}



export const changeClaimStages = create<State & Action>((set) => ({
    claimStage:claimLevel[1],
    resetClaim: (booleanValue:string)=>set({claimStage: booleanValue})
}))