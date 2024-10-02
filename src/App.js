import "./App.css";
import { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import NFT from "./abi/horoscopeNFT.json"; // Import ABI for the smart contract

const NFT_CONTRACT_ADDRESS = "0x5c512A1eaF19a7A55909F6749345152f58B46d17"; // Replace with your contract address

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false); // Check if Metamask is installed
  const [date, setDate] = useState("1992-08-31"); // Default date for Zodiac sign calculation
  const [zodiacSign, setZodiacSign] = useState(null); // State to store Zodiac sign
  const [isMinting, setIsMinting] = useState(false); // State for minting status
  const [NFTContract, setNFTContract] = useState(null); // Smart contract instance
  const [account, setAccount] = useState(null); // Connected Metamask account

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true); // Check if Metamask is installed
    }
  }, []);

  function handleDateInput({ target }) {
    setDate(target.value); // Set the date when the user selects a new one
  }

  // Function to connect wallet using Metamask
  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]); // Set connected account
    } catch (error) {
      alert("Something went wrong while connecting to the wallet.");
    }
  }

  // Calculate Zodiac sign based on the date
  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);

  function calculateZodiacSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    
    // Determine Zodiac sign based on the month and day
    if (month === 0) setZodiacSign(day >= 20 ? "Aquarius" : "Capricorn");
    else if (month === 1) setZodiacSign(day >= 19 ? "Pisces" : "Aquarius");
    else if (month === 2) setZodiacSign(day >= 21 ? "Aries" : "Pisces");
    else if (month === 3) setZodiacSign(day >= 20 ? "Taurus" : "Aries");
    else if (month === 4) setZodiacSign(day >= 21 ? "Gemini" : "Taurus");
    else if (month === 5) setZodiacSign(day >= 21 ? "Cancer" : "Gemini");
    else if (month === 6) setZodiacSign(day >= 23 ? "Leo" : "Cancer");
    else if (month === 7) setZodiacSign(day >= 23 ? "Virgo" : "Leo");
    else if (month === 8) setZodiacSign(day >= 23 ? "Libra" : "Virgo");
    else if (month === 9) setZodiacSign(day >= 23 ? "Scorpio" : "Libra");
    else if (month === 10) setZodiacSign(day >= 22 ? "Sagittarius" : "Scorpio");
    else if (month === 11) setZodiacSign(day >= 22 ? "Capricorn" : "Sagittarius");
  }

  // Initialize the NFT contract when account changes
  useEffect(() => {
    if (account) {
      const provider = new BrowserProvider(window.ethereum);
      provider
        .getSigner()
        .then((signer) => {
          setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer)); // Set contract instance
        })
        .catch((error) => {
          console.error("Error initializing contract:", error);
        });
    }
  }, [account]);

  // Function to mint an NFT
  async function mintNFT() {
    setIsMinting(true); // Disable the button while minting
    try {
      const transaction = await NFTContract.mintNFT(account, zodiacSign); // Call mintNFT function from the contract
      await transaction.wait(); // Wait for the transaction to be confirmed
      alert("Minting Successful");
    } catch (e) {
      console.error("Error during minting:", e);
    } finally {
      setIsMinting(false); // Re-enable the mint button
    }
  }

  if (!account) {
    return (
      <div className="App">
        <br />
        {isWalletInstalled ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Please install the Metamask wallet to use this app.</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Horoscope NFT Minting Dapp</h1>
      <p>Connected as: {account}</p>

      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <br />
      <br />
      {zodiacSign && (
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
      )}

      <br />
      <br />
      <button disabled={isMinting} onClick={mintNFT}>
        {isMinting ? "Minting..." : "Mint"}
      </button>
    </div>
  );
}

export default App;
