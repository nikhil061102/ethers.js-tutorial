// transactions in already deployed smart contract 
// and in ongoing deployment contracts
const ethers = require('ethers');
require("dotenv").config();

const PROJECT_ID = process.env.INFURA_ID;
const mnemonic = process.env.MNEMONIC;
const privatekey = process.env.PRIVATEKEY;

const ABI = require('./abi_contract');
const bytecode = require('./bytecode_contract');

const provider = new ethers.providers.JsonRpcProvider(PROJECT_ID);

const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
const address = "0x1463f349edC66F803C2B7fc646549c46dB1f23a8"; // Already existing and running contract
const contract = new ethers.Contract(address, ABI, provider);

// Existing already-deployed contract
const main = async () => {
    console.log(`Contract already deployed at address: ${address}`);
    const tx = await wallet.sendTransaction({
        to: "0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",
        value: ethers.utils.parseEther("0.01")
    });
    await tx.wait();
    console.log(tx);
}
main();

// New Contract to be deployed 
const myContract = new ethers.ContractFactory(ABI, bytecode, wallet);
const deploy = async () => {
    console.log(`Attempting to deploy from account: ${wallet.address}`);
  
    const contract = await myContract.deploy([]); // add your values for your contructor 
    console.log(`Contract deployed at address: ${contract.address}`);
    
    console.log("Before Transaction :-");
    const senderbefore = await provider.getBalance(wallet.address);
    const receiverbefore = await provider.getBalance("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93");
    console.log("Sender : ", ethers.utils.formatEther(senderbefore) , "Receiver : ",  ethers.utils.formatEther(receiverbefore));
    
    const tx = await wallet.sendTransaction({
        to: "0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",
        value: ethers.utils.parseEther("0.01")
    });
    await tx.wait();
    // console.log(tx);

    console.log("After Transaction :-");
    const senderafter = await provider.getBalance(wallet.address);
    const receiverafter = await provider.getBalance("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93");
    console.log("Sender : ", ethers.utils.formatEther(senderafter) , "Receiver : ",  ethers.utils.formatEther(receiverafter));  
};
deploy();