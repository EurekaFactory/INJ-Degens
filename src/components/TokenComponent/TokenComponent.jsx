import React, { useState } from "react";
import Countdown from "react-countdown";
import { addDays } from 'date-fns';
import ProgressBar from "@ramonak/react-progress-bar";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 


const firebaseConfig = {
    // FIREBASE_CONFIGURATION
    apiKey: "AIzaSyDi6IhYhsmhpS0Tiusd90r7V2XgK_-lofc",
    authDomain: "inj-degens.firebaseapp.com",
    projectId: "inj-degens",
    storageBucket: "inj-degens.appspot.com",
    messagingSenderId: "1049321045962",
    appId: "1:1049321045962:web:60072976707ac52b9d9933",
    measurementId: "G-WDPH9VNVQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// } 


const TokenComponent = () => {
  // Define the state variables you'll need
  const [tokenDetails, setTokenDetails] = useState("");
  const [tokenImage, setTokenImage] = useState("hakiImg")
  const [tokenAddr, setTokenAddr] = useState("")
  const [tokenName, tokenNameState] = useState("Injective Degens")
  const [mCap, mCapState] = useState("")
  const [supply, supplyState] = useState("21,000,000,000")
  const [price, priceState] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("$DGNZ")
  const [launchpadAddr, setLaunchpadAddr] = useState("")
  const [launchpadBal, setLaunchpadBal] = useState("4,410,000,000")
  const [launchpadOwner, setLaunchpadOwner] = useState("")
  const [minBuy, setMinBuy] = useState("")
  const [maxBuy, setMaxBuy] = useState("")
  const [webUrl, setWebUrl] = useState("")
  const [startDate, setStartDate] = useState("2023-12-28")
  const [endDate, setEndDate] = useState(addDays(new Date(startDate), 30).toISOString().slice(0, 10));
  const [tokenDetailsState, setTokenDetailsState] = useState(false)
  const [progress, setProgress] = useState(99);
  const [modalState, setModalState] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });




  // Add other states for tokenImage, tokenName, tokenSymbol, etc.

  // Define any functions you'll need
  const openTokenDetailsState = (isOpen) => {
    setTokenDetailsState(isOpen);
  };
  const refundINJ = (launchpadAddr) => {
    // Handle the refund logic here
  };

  const connectWallet = () => {
    // Logic to connect the wallet
    console.log("Connect wallet function triggered");
    // Typically you'd use a library like web3.js, ethers.js, or a wallet API here
  };

  // Add other functions for handling edit, buy, etc.
  function renderCountDown({ hours, minutes, seconds, completed }) {
    const countDownStyle = "flex flex-col items-center justify-center text-sm"; // Consistent text size and alignment
    const numberStyle = "font-bold text-lg"; // Larger, bold font for numbers
    const labelStyle = "text-xs"; // Smaller font for labels

    if (completed) {
      return <div className={countDownStyle}><span className="text-xl font-bold text-yellow-200 ">Private Sales is over!!</span></div>;
    } else {
      return (
        <div className="flex flex-row space-x-1 text-yellow-200 text-center">
          <div className={countDownStyle}>
            <div className={numberStyle}>{hours}</div>
            <div className={labelStyle}>Hours</div>
          </div>
          <span>:</span>
          <div className={countDownStyle}>
            <div className={numberStyle}>{minutes}</div>
            <div className={labelStyle}>Minutes</div>
          </div>
          <span>:</span>
          <div className={countDownStyle}>
            <div className={numberStyle}>{seconds}</div>
            <div className={labelStyle}>Seconds</div>
          </div>
        </div>
      );
    }
  }

  const textStyle = "text-base text-white"; // Base text size
  const titleStyle = "text-lg font-semibold"; // Slightly larger and bold for titles
  const detailStyle = "text-sm"; // Smaller text for details

  // Component JSX
  return  (
    <div className="max-w-4xl mx-auto p-4 m-6 shadow-lg rounded-lg">
      <button
        onClick={connectWallet}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Connect Wallet
      </button>

        <div className="p-6 m-4 border rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b pb-4">
            <div className="flex items-center space-x-2 max-sm:justify-center">
              <div>
                <img className="w-11 h-11 rounded-full overflow-hidden" src={logo} alt="logo" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">{tokenName}</h2>
              </div>
          </div>
          <Countdown date={new Date(startDate).getTime() + 86400000} renderer={renderCountDown} />
        </div>

        <div className="flex justify-between items-start my-4 max-sm:block">
          <div className="mb-5">
            <p className="p-2 max-w-[500px]">$DGNZ born  for Injective degens a community based token for Injective fan bois .</p>
          </div>
        <form>
          <div className="flex flex-col space-y-2">
          <input type="text" id="" class=" w-full rounded-lg bg-yellow-100 p-2 text-sm text-black focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter $DGNZ amount" required/>
            <button type="submit"
              onClick={() => modalState(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded-lg"
            >
              Buy {tokenSymbol}
            </button>

          </div>
        </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-2 text-left max-md:text-center max-sm:text-center border rounded-xl p-2">
            <h4 className="text-lg text-center font-semibold mb-2 underline">Token Details</h4>
            <p><strong>Total Supply:</strong> {supply} {tokenSymbol}</p>
            <p><strong>Supply in Presale:</strong> 40% </p>
            <p><strong>Soft Cap:</strong> {tokenSymbol} </p>
            <p><strong>Hard Cap:</strong> {tokenSymbol} </p>
          </div>

          <div className="m-2 text-left max-md:text-center max-sm:text-center border rounded-xl p-2">
            <h4 className="text-lg underline font-semibold mb-2 text-center">Purchase Details</h4>
            <p><strong>Minimum Buy:</strong> 0.27 INJ</p>
            <p><strong>Maximum Buy:</strong> 2.68 INJ</p>
            <p><strong>Total Contributors:</strong></p>
          </div>
        </div>

        <ProgressBar
        completed={progress}
        className="wrapper m-3"
        barContainerClassName="container"
        completedClassName="barCompleted"
        labelClassName="label"
        />

        {/* <a
          href={webUrl}
          target="_blank"
          className="block text-center text-yellow-400 hover:underline mt-5"
          rel="noreferrer">
          Visit Website
        </a> */}
      </div>
    </div>
  );
};

export default TokenComponent;