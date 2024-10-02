import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { Contract, providers } from "ethers";

function App() {
  // State variables
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  const [date, setDate] = useState("1992-08-31");
  const [zodiacSign, setZodiacSign] = useState(null);

  // Effect to check if Metamask is installed
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  // Function to handle date input
  function handleDateInput({ target }) {
    setDate(target.value);
  }

  // Function to calculate the zodiac sign based on the input date
  function calculateZodiacSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();

    // Zodiac sign calculation
    if (month === 0) {
      setZodiacSign(day >= 20 ? "Aquarius" : "Capricorn");
    } else if (month === 1) {
      setZodiacSign(day >= 19 ? "Pisces" : "Aquarius");
    } else if (month === 2) {
      setZodiacSign(day >= 21 ? "Aries" : "Pisces");
    } else if (month === 3) {
      setZodiacSign(day >= 20 ? "Taurus" : "Aries");
    } else if (month === 4) {
      setZodiacSign(day >= 21 ? "Gemini" : "Taurus");
    } else if (month === 5) {
      setZodiacSign(day >= 21 ? "Cancer" : "Gemini");
    } else if (month === 6) {
      setZodiacSign(day >= 23 ? "Leo" : "Cancer");
    } else if (month === 7) {
      setZodiacSign(day >= 23 ? "Virgo" : "Leo");
    } else if (month === 8) {
      setZodiacSign(day >= 23 ? "Libra" : "Virgo");
    } else if (month === 9) {
      setZodiacSign(day >= 23 ? "Scorpio" : "Libra");
    } else if (month === 10) {
      setZodiacSign(day >= 22 ? "Sagittarius" : "Scorpio");
    } else if (month === 11) {
      setZodiacSign(day >= 22 ? "Capricorn" : "Sagittarius");
    }
  }

  // Update zodiac sign when the date changes
  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);

  // Function to connect the wallet
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  // Placeholder function for NFT minting (to be implemented later)
  function mintNFT() {
    setIsMinting(true);
    // NFT minting logic here
    setTimeout(() => {
      setIsMinting(false);
      alert("NFT minted!");
    }, 2000);
  }

  // Render function
  return (
    <div className="App">
      <h1>Horoscope NFT Minting Dapp</h1>

      {account ? (
        <>
          <p>Connected as: {account}</p>
          <input onChange={handleDateInput} value={date} type="date" id="dob" />
          <br />
          <br />
          {zodiacSign ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
              viewBox="0 0 300 300"
              width="400px"
              height="400px"
            >
              <style>{`.base { fill: white; font-family: serif; font-size: 24px; }`}</style>
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="50%"
                className="base"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {zodiacSign}
              </text>
            </svg>
          ) : null}

          <br />
          <br />
          <button disabled={isMinting} onClick={mintNFT}>
            {isMinting ? "Minting..." : "Mint"}
          </button>
        </>
      ) : (
        <>
          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
