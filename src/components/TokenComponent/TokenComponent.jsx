import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, addDoc, getDocs, setDoc } from "firebase/firestore";
import ProgressBar from "../ProgressBar/ProgressBar"
import logo from "../../assets/logo.jpeg";

// Injective Labs imports
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { Web3Exception } from "@injectivelabs/exceptions";

import { MsgSend } from '@injectivelabs/sdk-ts'
import { BigNumberInBase } from '@injectivelabs/utils'

import { getAddresses, msgBroadcastClient } from "../../services/wallet";

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
const db = getFirestore(app);

const TokenComponent = () => {
  const [injectiveAddress, setInjectiveAddress] = useState("");
  const [connAddrBtn, setconnAddrBtn] = useState("Connect Wallet");
  const [percentage, setPercentage] = useState(0);
  const [currentSales, setCurrentSales] = useState(0);
  const [targetSale, setTargetSale] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);

  useEffect(() => {
    connectWallet();
    setconnAddrBtn(injectiveAddress
      ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
      : "Connect Wallet");

    getDBDetails();
  }, [injectiveAddress]);

  const getDBDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

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

      tnxHash = await msgBroadcastClient.broadcast({
        injectiveAddress: sender,
        msgs: msg
      })
    } catch (error) {
      throw new Web3Exception(
        new Error(error.message)
      );
    } finally {
      setCurrentSales((prev) => prev + 10)
      const newPercentage = (currentSales / targetSale) * 100;
      setPercentage(newPercentage > 100 ? 100 : newPercentage);

      try {
        await addDoc(collection(db, "users"), {
          amount: "Ada",
          tnxhash: tnxHash,
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
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  // Component JSX
  return (
    <div className="max-w-4xl mx-auto p-4 m-6 shadow-lg rounded-lg">
      <button
        onClick={connectWallet}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition duration-300"
      >       {connAddrBtn}
      </button>

      <div className="p-6 m-4 border rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b pb-4">
          <div className="flex items-center space-x-2 max-sm:justify-center">
            <div>
              <img className="w-11 h-11 rounded-full overflow-hidden" src={logo} alt="logo" />
            </div>
            <div>
              <h2 className="text-2xl font-medium">Injective Degens</h2>
            </div>
          </div>
          <Countdown date={new Date("2023-12-29").getTime() + 86400000} renderer={renderCountDown} />
        </div>

        <div className="flex justify-between items-start my-4 max-sm:block">
          <div className="mb-5">
            <p className="p-2 max-w-[500px]">$DGNZ born  for Injective degens a community based token for Injective fan bois .</p>
          </div>
          <form>
            <div className="flex flex-col space-y-2">
              <input type="text" id="" className=" w-full rounded-lg bg-yellow-100 p-2 text-sm text-black focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter $DGNZ amount" required />
              <button type="submit"
                onClick={() => buyDGNZToken({ sender: "", recipient: "", send_amt: "", denom: "inj" })}
                className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded-lg"
              >
                Buy $DGNZ
              </button>

            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-2 text-left max-md:text-center max-sm:text-center border rounded-xl p-2">
            <h4 className="text-lg text-center font-semibold mb-2 underline">Token Details</h4>
            <p><strong>Total Supply:</strong> 21,000,000,000 $DGNZ</p>
            <p><strong>Supply in Presale:</strong> 40% </p>
            <p><strong>Soft Cap:</strong> $DGNZ </p>
            <p><strong>Hard Cap:</strong> $DGNZ </p>
          </div>

          <div className="m-2 text-left max-md:text-center max-sm:text-center border rounded-xl p-2">
            <h4 className="text-lg underline font-semibold mb-2 text-center">Purchase Details</h4>
            <p><strong>Minimum Buy:</strong> 0.27 INJ</p>
            <p><strong>Maximum Buy:</strong> 2.68 INJ</p>
            <p><strong>Total Contributors: {totalContributors} </strong></p>
          </div>
        </div>

        <ProgressBar percentage={percentage} />

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