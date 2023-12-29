import { WalletStrategy } from "@injectivelabs/wallet-ts";
import { Web3Exception } from "@injectivelabs/exceptions";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import { Network } from "@injectivelabs/networks";

// Initialize wallet strategy outside the component to avoid re-creation on each render
export const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  ethereumOptions: {
    ethereumChainId: EthereumChainId.Goerli,
  },
  // wallet: Wallet.Keplr
});


// Helper function to get addresses from the wallet
export const getAddresses = async () => {
  const addresses = await walletStrategy.getAddresses();
  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    );
  }
  return addresses;
};

export const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: Network.Testnet,
})

// Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const tokenAddr = import.meta.env.VITE_TOKEN_ADDR;
export const startTime = import.meta.env.VITE_PRIVATE_SALES_STARTTIME;
export const endTime = parseInt(import.meta.env.VITE_PRIVATE_SALES_ENDTIME);