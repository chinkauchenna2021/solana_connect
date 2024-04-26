import { StateCreator, create } from 'zustand'
import { persist, createJSONStorage,devtools  , PersistOptions} from 'zustand/middleware'

type IConnectionObject = {
   isConnected:boolean;
   connectionInstance:{};
   usersPublicKey: string;
   accountBalance: number;
   disconnectWallet:(connect:boolean)=>void;
   resetConnectionInstance:(connectionInstance:{})=>void;
   resetConnectionPublicKey:(connectionPrivateKey:string)=>void;
   resetAccountBalance: (usersAccountBalance:number)=>void;
}

type MyPersist = (
    config: StateCreator<IConnectionObject>,                                            
    options: PersistOptions<IConnectionObject>                                          
  ) => StateCreator<IConnectionObject>    

export const executeConnectionObject = create<IConnectionObject>(
    (persist as MyPersist)(
  (set) =>({
    isConnected:false,
    connectionInstance:{},
    usersPublicKey:'',
    accountBalance:0,
    disconnectWallet : (connect: boolean) => set(()=> ({isConnected : connect})),
    resetConnectionInstance: (connectionInstance:{})=>set(()=>({connectionInstance: connectionInstance})),
    resetConnectionPublicKey: (connectionPrivateKey:string)=>set(()=>({usersPublicKey:connectionPrivateKey})),
    resetAccountBalance: (usersAccountBalance:number)=>set(()=>({accountBalance:usersAccountBalance})),
}),
{
    name: 'wallet-storage', 
  }
))