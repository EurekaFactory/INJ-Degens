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