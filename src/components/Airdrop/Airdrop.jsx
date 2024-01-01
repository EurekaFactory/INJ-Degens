import { useState } from 'react';
import { MsgSend, MsgBroadcasterWithPk, PrivateKey, } from '@injectivelabs/sdk-ts';
import { Network } from '@injectivelabs/networks';
import { mnemonic, firebaseConfig } from '../../services/wallet';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const subdenom = "DGNZ";
const network = Network.Mainnet;

const Airdrop = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimBtnEnabled, setClaimBtnEnabled] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleClaimAirdrop = async (event) => {
    event.preventDefault();
    setClaimBtnEnabled(true);
    setError('');

    let airdropAmt;

    let x = true;
    if (x) {
      alert("Airdropping will start soon...")
      setClaimBtnEnabled(false);
      return
    }

    try {
      const docRef = doc(db, "Airdrop", walletAddress);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const airdropData = docSnap.data();
        if (!airdropData["isClaimed"]) {
          airdropAmt = airdropData["amount"]
        } else {
          setError("Tokens claimed already");
          setClaimBtnEnabled(false);
          return
        }
      } else {
        setError("Address not eligible for Airdrop");
        setClaimBtnEnabled(false);
        return
      }
    } catch (error) {
      setError('Failed to claim airdrop. Please try again.');
      setIsSubmitted(false); // Allow retrying
      setClaimBtnEnabled(false);
    }

    try {
      // Derive private key and address from the mnemonic
      const privateKeyFromMnemonic = PrivateKey.fromMnemonic(mnemonic);
      const injectiveAddress = privateKeyFromMnemonic.toAddress().toBech32();

      const amount = {
        denom: `factory/${injectiveAddress}/${subdenom}`,
        amount: airdropAmt.toString(), // Amount to airdrop
      };

      const msg = MsgSend.fromJSON({
        amount,
        srcInjectiveAddress: injectiveAddress,
        dstInjectiveAddress: walletAddress, // Destination address from the user input
      });

      const txResult = await new MsgBroadcasterWithPk({
        privateKey: privateKeyFromMnemonic,
        network: network, // TODO: change to Mainnet 
      }).broadcast({
        msgs: msg,
      });

      await updateDoc(doc(db, "Airdrop", walletAddress), {
        "tnx_hash": txResult["txhash"],
        "isClaimed": true
      })

      setTxHash(txResult["txhash"]);
      setIsSubmitted(true);
      setClaimBtnEnabled(false);
    } catch (err) {
      setError('Failed to claim airdrop. Please try again.');
      setIsSubmitted(false); // Allow retrying
      setClaimBtnEnabled(false);
    }
  };

  return (
    <div className="symbol max-w-md mx-auto mt-10 p-6 border border-zinc-950 backdrop-blur rounded-xl text-center">
      <h2 className="text-2xl font-semibold text-gray-700">Claim Your Airdrop</h2>
      {!isSubmitted ? (
        <form className="mt-4" onSubmit={handleClaimAirdrop}>
          <input
            type="text"
            value={walletAddress}
            onChange={handleAddressChange}
            placeholder="Enter your wallet address"
            className="w-full p-2 text-lg text-gray-700 border rounded-md outline-none transition duration-150 ease-in-out mb-4"
            required
          />
          <button type="submit" disabled={claimBtnEnabled} className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Claim Airdrop
          </button>
        </form>
      ) : (
        <p className="mt-4">Airdrop claimed successfully!</p>
      )}

      {
        claimBtnEnabled && <div>Claiming tokens...</div>
      }

      {/* Transaction hash display */}
      {txHash && (
        <div className="p-2 bg-green-100 rounded-md text-green-700">
          <p>Transaction successful!</p>
          <a href={`https://${network == Network.Testnet ? "testnet." : ""}explorer.injective.network/transaction/${txHash}`} target="_blank" rel="noopener noreferrer">
            <p>Hash: {txHash} <span>🔗</span></p>
          </a>
        </div>
      )}      

      {/* Error message display */}
      {error && (
        <div className="p-2 bg-red-100 rounded-md text-red-700">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Airdrop;
