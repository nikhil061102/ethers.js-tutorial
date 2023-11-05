// deploy your smart contract using ether.js

const ethers = require('ethers');
require("dotenv").config();

const PROJECT_ID = process.env.INFURA_ID;
const mnemonic = process.env.MNEMONIC;
const privatekey = process.env.PRIVATEKEY;

const ABI = require('./abi_contract');
const bytecode = require('./bytecode_contract');

const provider = new ethers.providers.JsonRpcProvider(PROJECT_ID);

const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
// console.log('Private Key : ',wallet.privateKey);
// console.log('Public Key : ', wallet.publicKey);
// console.log('Address : ', wallet.address);
// OR
// const wallet = new ethers.Wallet(privatekey, provider);
// Note: A wallet created with a private key does not have a mnemonic
// console.log('Public Key : ', wallet.publicKey);
// console.log('Address : ', wallet.address);

const myContract = new ethers.ContractFactory(ABI, bytecode, wallet);

const deploy = async () => {
    console.log(`Attempting to deploy from account: ${wallet.address}`);
  
    const contract = await myContract.deploy([]); // add your values for your contructor 
    console.log(`Contract deployed at address: ${contract.address}`);

    const nameFromContract = await contract.name();
    console.log("string public name = ", nameFromContract);

    const val = await contract.getValue();
    console.log("uint num = ",val.toString());

    const tx = await contract.sendEthContract({value:ethers.utils.parseEther("0.1")});
    await tx.wait();
    // console.log(tx);

    const contractBalWei1 = await contract.contractBalance();
    const contractBalEth1 = ethers.utils.formatEther(contractBalWei1,"ether");
    console.log("Total Eth in Contract Acc : ",contractBalEth1);

    const tx2 = await contract.sendEthUser("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",{value:ethers.utils.parseEther("0.1")});
    await tx2.wait();
    // console.log(tx2);

    const contractBalWei = await contract.contractBalance();
    const contractBalEth = ethers.utils.formatEther(contractBalWei,"ether");
    console.log("Total Eth in Contract Acc : ",contractBalEth);

    const accountBalWei = await contract.accountBalance("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93");
    const accountBalEth = ethers.utils.formatEther(accountBalWei,"ether");
    console.log("Total Eth in Given Acc : ",accountBalEth);
};
  
deploy();