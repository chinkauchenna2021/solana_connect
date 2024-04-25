import React , { useState  , useCallback} from 'react';
import { Wallet, useWallet} from '@solana/wallet-adapter-react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { PublicKey } from '@solana/web3.js';
import { WalletName } from '@solana/wallet-adapter-base';
import Button from './Button';
import WalletConnect from '@/app/services/providers/WalletConnect';
import ModalLayout from '@/app/layouts/ModalLayout';

type ButtonState = {
    buttonState: 'connecting' | 'connected' | 'disconnecting' | 'has-wallet' | 'no-wallet';
    onConnect?: () => void;
    onDisconnect?: () => void;
    onSelectWallet?: () => void;
    publicKey?: PublicKey;
    walletIcon?: Wallet['adapter']['icon'];
    walletName?: Wallet['adapter']['name'];
};

type Config = {
    onSelectWallet: (config: {
        onSelectWallet: (walletName: Wallet['adapter']['name']) => void;
        wallets: Wallet[];
    }) => void;
};


 export  function CustomConnectButton() {
    const { connect, connected, connecting, disconnect, disconnecting, select, wallet } = useWallet();
    const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
        onSelectWallet(walletName: WalletName): void;
        wallets:Wallet[];
    }> | null>(null);
    const { buttonState, onConnect, onDisconnect, onSelectWallet } = useWalletMultiButton({
        onSelectWallet: setWalletModalConfig,
    });
    let label;
    switch (buttonState) {
        case 'connected':
            label = 'Disconnect';
            break;
        case 'connecting':
            label = 'Connecting';
            break;
        case 'disconnecting':
            label = 'Disconnecting';
            break;
        case 'has-wallet':
            label = 'Connect';
            break;
        case 'no-wallet':
            label = 'Select Wallet';
            break;
    }
    const handleClick = useCallback(() => {
        switch (buttonState) {
            case 'connected':
                return onDisconnect;
            case 'connecting':
            case 'disconnecting':
                break;
            case 'has-wallet':
                return onConnect;
            case 'no-wallet':
                return onSelectWallet;
                break;
        }
        console.log(buttonState)
    }, [buttonState, onDisconnect, onConnect, onSelectWallet]);



    return (
        <WalletConnect>
            <Button  variant='secondary'  disabled={buttonState === 'connecting' || buttonState === 'disconnecting'} onClick={()=>handleClick()}>
            {label}
            </Button>
            {walletModalConfig ? (
                <ModalLayout>
                    {walletModalConfig.wallets.map((wallet) => (
                        <button
                            key={wallet.adapter.name}
                            onClick={() => {
                                walletModalConfig.onSelectWallet(wallet.adapter.name);
                                setWalletModalConfig(null);
                            }}
                        >
                            {wallet.adapter.name}
                        </button>
                    ))}
                </ModalLayout>
            ) : null}
        </WalletConnect>
    );
}

