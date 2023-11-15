async function main() {
    // Grab the contract factory
    const MyToken = await ethers.getContractFactory("MyToken");
 
    // Start deployment, returning a promise that resolves to a contract object
    const tokenAddress="0xd7A43c5b7fb296134B43B41d09cA86b338a96C46";
    const myToken = await MyToken.deploy(tokenAddress); // Instance of the contract
    console.log("Contract deployed to address:", myToken.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });