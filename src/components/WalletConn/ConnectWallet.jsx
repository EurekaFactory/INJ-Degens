// React imports
import { useState, useEffect } from "react";

// Injective Labs imports
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { Web3Exception } from "@injectivelabs/exceptions";

import { MsgSend } from '@injectivelabs/sdk-ts'
import { BigNumberInBase } from '@injectivelabs/utils'

import { getAddresses, msgBroadcastClient } from "../../services/wallet";

const ConnectWallet = () => {
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [injectiveAddress, setInjectiveAddress] = useState("");

  // Formatted text for display
  const btnText = injectiveAddress
    ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
    : "Connect Wallet";
  const ethText = ethereumAddress
    ? `${ethereumAddress.slice(0, 5)}...${ethereumAddress.slice(-3)}`
    : "Click Connect Wallet button";

  // Function to connect the wallet and set addresses
  const connectWallet = async () => {
    try {
      const [address] = await getAddresses();
      setEthereumAddress(address);
      const injectiveAddr = getInjectiveAddress(address);
      setInjectiveAddress(injectiveAddr);
    } catch (error) {
      console.error("Error connecting to the wallet:", error);
    }
  };

  useEffect(() => {
    connectWallet();
    console.log(injectiveAddress);
  }, [injectiveAddress]);

  // used to send assets from one address to another
  const makeMsgSend = async ({
    sender,
    recipient,
    send_amt, // human readable amount
    denom
  }) => {
    let hash;
    try {
      const amount = {
        denom,
        amount: new BigNumberInBase(send_amt).toWei().toFixed()
      }
  
      const msg = MsgSend.fromJSON({
        amount,
        srcInjectiveAddress: sender,
        dstInjectiveAddress: recipient,
      });
  
      hash = await msgBroadcastClient.broadcast({
        injectiveAddress: sender,
        msgs: msg
      })
    } catch (error) {
      throw new Web3Exception(
        new Error(error.message)
      );
    } finally {
      console.log(hash)
    }
  }


  // Component render
  return (
    <div>
      <button onClick={connectWallet} className="btn">
        {btnText}
      </button>
      <span>{ethText}</span>

      <button className="btn" onClick={
        () => {
          makeMsgSend({ sender: injectiveAddress, recipient: "inj1u9mgmhrvjrnx4e0qpad8sxtc97pkghtt6s0s70", send_amt: "0.05", denom: "inj" });
        }
      }>Tnx</button>
    </div>
  );
};

export default ConnectWallet;
