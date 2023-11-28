require("dotenv").config();
const API_URL = process.env.API_URL;


const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}`;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyToken.sol/MyToken.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0x2082e0f5898cdd80883176EE37792dEc27d7C080";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.safeMint(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
  "https://salmon-rear-gazelle-549.mypinata.cloud/ipfs/QmSpf1shtysZJ8Lg7oGFzgHGdVxFMcH86RBgV1mSZWPV5u?_gl=1*r10c2p*_ga*MjAwODczNDg0Ni4xNzAxMTczMjIx*_ga_5RMPXG14TE*MTcwMTE3NTQ0Ny4yLjEuMTcwMTE3NjgwMi42MC4wLjA."
);

// 0xa881c965c7762725d0c4c853744e274975253e3fd1bfdfc5a99db6f8c96ddcc8