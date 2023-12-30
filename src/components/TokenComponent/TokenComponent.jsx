import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import ProgressBar from "../ProgressBar/ProgressBar"
import logo from "../../assets/logo.jpeg";
import symbol from "../../assets/inj-logo.png";

// Injective Labs imports
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { Web3Exception } from "@injectivelabs/exceptions";

import { MsgSend } from '@injectivelabs/sdk-ts'
import { BigNumberInBase } from '@injectivelabs/utils'

import { getAddresses, msgBroadcastClient, firebaseConfig, tokenAddr, endTime, startTime } from "../../services/wallet";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TokenComponent = () => {
  const [injectiveAddress, setInjectiveAddress] = useState("");
  const [connAddrBtn, setconnAddrBtn] = useState("Connect Wallet");
  const [percentage, setPercentage] = useState(0);
  const [currentSales, setCurrentSales] = useState(0);
  const [targetSale, setTargetSale] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [tokenAmount, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Check if the input is either empty, a floating point number, or a number with a trailing decimal
    if (value === '' || /^-?\d+(\.\d*)?$/.test(value)) {
      // Update the state/input field with the new value
      setInputValue(value);
    } else {
      // If it's not a valid number, handle as needed, e.g., show an error message
      alert("Please enter a valid floating point number.");
    }
  };

  useEffect(() => {
    connectWallet();
    setconnAddrBtn(injectiveAddress
      ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
      : "Connect Wallet");

    getDBDetails();
  }, [injectiveAddress]);

  const getDBDetails = async () => {
    const perRef = doc(db, "Percentage", "hNrOLob7zBdKgpIMXxBy");
    const perSnap = await getDoc(perRef);

    const targetSalesRef = doc(db, "Percentage", "XSmNQJcKeLFAnm5LHjqu");
    const targetSalesSnap = await getDoc(targetSalesRef);

    const currSalesSalesRef = doc(db, "Percentage", "BgKvr36uM8lpLjLvVYjv");
    const currSalesSalesSnap = await getDoc(currSalesSalesRef);

    const tcRef = doc(db, "Percentage", "3zhghP8JNp621r0OGdbI");
    const tcSnap = await getDoc(tcRef);

    if (perSnap.exists()) {
      const perData = perSnap.data();
      setPercentage(perData["progress__bar"]);
    } else {
      console.log("No such document!");
    }

    if (targetSalesSnap.exists()) {
      const tsData = targetSalesSnap.data();
      setTargetSale(tsData["target__sales"]);
    } else {
      console.log("No such document!");
    }

    if (currSalesSalesSnap.exists()) {
      const csData = currSalesSalesSnap.data();
      setCurrentSales(csData["current__sales"]);
    } else {
      console.log("No such document!");
    }

    if (tcSnap.exists()) {
      const tcData = tcSnap.data();
      setTotalContributors(tcData["total__contributors"]);
    } else {
      console.log("No such document!");
    }
  }

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

  // Function to connect the wallet and set addresses
  const connectWallet = async () => {
    try {
      const [address] = await getAddresses();
      const injectiveAddr = getInjectiveAddress(address);
      setInjectiveAddress(injectiveAddr);
    } catch (error) {
      console.error("Error connecting to the wallet:", error);
    }
  };

  // used to send assets from one address to another
  const buyDGNZToken = async ({
    sender,
    recipient,
    send_amt, // human readable amount
    denom
  }) => {
    let tnxHash;
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

      console.log(msg)

      tnxHash = await msgBroadcastClient.broadcast({
        injectiveAddress: sender,
        msgs: msg
      })

      console.log(tnxHash)
    } catch (error) {
      throw new Web3Exception(
        new Error(error.message)
      );
    } finally {
      setCurrentSales((prev) => prev + 10)
      const newPercentage = (currentSales / targetSale) * 100;
      setPercentage(newPercentage > 100 ? 100 : newPercentage);

      setTotalContributors((prev) => prev + 1);

      try {
        await addDoc(collection(db, "transactions"), {
          amount: tokenAmount,
          tnxhash: tnxHash["txhash"],
          address: injectiveAddress,
          time: Date.now().toLocaleString()
        });


        // Add a new document in collection "cities"
        await setDoc(doc(db, "Percentage", "hNrOLob7zBdKgpIMXxBy"), {
          "progress__bar": percentage
        });
        await setDoc(doc(db, "Percentage", "BgKvr36uM8lpLjLvVYjv"), {
          "current__sales": currentSales
        });

        await setDoc(doc(db, "Percentage", "3zhghP8JNp621r0OGdbI"), {
          "total__contributors": totalContributors
        });

        alert("Transaction successful");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  // Component JSX
  return (
    <div className="max-w-4xl w- mx-auto p-4 shadow-xl rounded-lg">
    <div id="symbol"><img src={symbol} alt="Injective Symbol"></img></div>
      <button
        onClick={connectWallet}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition duration-300 shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"
      >       {connAddrBtn}
      </button>

      <div className="p-6 m-4 border border-zinc-950 backdrop-blur rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b pb-4">
          <div className="flex items-center space-x-2 max-sm:justify-center">
            <div>
              <img className="w-11 h-11 rounded-full overflow-hidden shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black" src={logo} alt="logo" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white ">Injective Degens</h2>
            </div>
          </div>
          <Countdown date={new Date(startTime).getTime() + endTime} renderer={renderCountDown} />
        </div>

        <div className="flex justify-between items-start my-4 max-sm:block">
          <div className="mb-5">
            <p className="text-lg p-2 max-w-[500px]">$DGNZ born  for Injective degens a community based token for Injective fan bois .</p>
          </div>
          <form onSubmit={(event) => {
            event.preventDefault();
            buyDGNZToken({ sender: injectiveAddress, recipient: tokenAddr, send_amt: tokenAmount, denom: "inj" })
          }}>
            <div className="flex flex-col space-y-2">
              <input type="text" id="" className=" w-full rounded-lg bg-yellow-100 p-2 text-sm text-black focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"
                placeholder="Enter $DGNZ amount" required value={tokenAmount}
                onChange={handleInputChange} />
              <button type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded-lg shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"
              >
                Buy $DGNZ
              </button>

            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-2 text-left text-black max-md:text-center max-sm:text-center border shadow-xl rounded-xl p-2">
            <h4 className="text-lg text-center font-bold mb-2 underline">Token Details</h4>
            <p><strong>Total Supply:</strong> 21,000,000,000 $DGNZ</p>
            <p><strong>Supply in Presale:</strong> 40% </p>
            <p><strong>Soft Cap:</strong> 100 INJ </p>
            <p><strong>Hard Cap:</strong> 150 INJ </p>
          </div>

          <div className="m-2 text-left text-black max-md:text-center max-sm:text-center border shadow-xl rounded-xl p-2">
            <h4 className="text-lg underline font-bold mb-2 text-center">Purchase Details</h4>
            <p><strong>Minimum Buy:</strong> 0.27 INJ</p>
            <p><strong>Maximum Buy:</strong> 2.68 INJ</p>
            <p><strong>Total Contributors: {totalContributors} </strong></p>
          </div>
        </div>

        <ProgressBar percentage={percentage} />
        <div className="flex align-items-center justify-between m-1">
          <div className="flex-grow-1">0%</div>
          <div className="flex-grow-1 text-right">100%</div>
        </div>

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