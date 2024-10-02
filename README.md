# Horoscope NFT Minting Dapp

This is a simple decentralized application (DApp) that allows users to mint NFTs based on their zodiac sign. The DApp uses the user's date of birth to calculate their zodiac sign and mints a corresponding NFT to their connected wallet. The application is powered by `ethers.js` for blockchain interaction and utilizes Metamask for wallet connectivity.

## Features
- **Zodiac Sign Calculation:** Enter a date of birth to automatically determine the zodiac sign.
- **Metamask Wallet Connection:** Users can connect their Metamask wallet to mint NFTs.
- **Minting Functionality:** Users can mint an NFT corresponding to their zodiac sign directly from the DApp.
- **Blockchain Interaction:** Uses `ethers.js` to interact with an Ethereum smart contract for minting NFTs.

## Prerequisites

To run this project, ensure you have the following installed on your machine:

- **Node.js** (v12 or later)
- **Metamask Wallet Extension** (Browser extension)
- **Ethereum Test Network** (for local or testnet deployment)

## Setup

Follow these steps to get the DApp running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/snehavarmak/HoroScopeNFT.git
cd HoroScopeNFT
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Add the Smart Contract ABI

1. After compiling and deploying your smart contract (e.g., `horoscopeNFT.sol`), locate the generated `ABI` file.
2. Create an `abi/` directory inside the `src/` folder.
3. Add the ABI file (`horoscopeNFT.json`) to the `src/abi/` directory.

### 4. Update the Smart Contract Address

In the `App.js` file, update the `NFT_CONTRACT_ADDRESS` with your deployed contract address:

```javascript
const NFT_CONTRACT_ADDRESS = "your_deployed_contract_address"; // Replace with your contract address
```

### 5. Run the DApp

To start the DApp, run the following command:

```bash
npm start
```

This will launch the app locally. You can open it in your browser at `http://localhost:3000/`.

## Usage

1. **Connect Metamask Wallet:** Click on the "Connect Wallet" button to connect your Metamask wallet.
2. **Enter Date of Birth:** Select your date of birth using the input field. The app will automatically calculate your zodiac sign.
3. **Mint an NFT:** Once your zodiac sign is calculated, click on the "Mint" button to mint an NFT corresponding to your zodiac sign.

## Project Structure

```
horoscope-nft-minting-dapp/
│
├── src/
│   ├── abi/
│   │   └── horoscopeNFT.json  # ABI for the deployed contract
│   ├── App.js                 # Main DApp logic
│   ├── App.css                # Styling for the DApp
│   └── index.js               # React entry point
│
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## Smart Contract

The DApp interacts with an Ethereum smart contract for NFT minting. The contract handles the logic for minting NFTs based on the zodiac sign and ensures proper token ownership. You can deploy your own contract using a development framework like Hardhat or Remix.

### Solidity Contract:

```solidity
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract horoscopeNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    string baseSvg = "<svg xmlns='<http://www.w3.org/2000/svg>' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("Horoscope", "HSCP") {}

    function mintNFT(address recipient, string memory zodiacSign)
        public
        returns (uint256)
    {
        _tokenIds += 1;
        

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, zodiacSign, "</text></svg>")
        );

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',zodiacSign,
                        // We set the title of our NFT as the generated word.
                        '", "description": "On-chain Zodiac Sign NFTs", "attributes": [{"trait_type": "Zodiac Sign", "value": "',
                        zodiacSign,
                        '"}], "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        uint256 newItemId = _tokenIds;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        return newItemId;
    }
}

```

## Dependencies

The DApp relies on the following key dependencies:

- **ethers.js:** For blockchain interaction and connecting to the Ethereum network.
- **React.js:** For building the user interface.
- **Metamask:** For wallet integration and interaction with the blockchain.
  
Install these dependencies with:

```bash
npm install ethers react metamask
```
