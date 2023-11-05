// how to work with already deployed smart contract using ether.js

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

const deploy = async () => {
    console.log(`Contract already deployed at address: ${address}`);
    const contractWithWallet = contract.connect(wallet);

    const val = await contractWithWallet.getValue();
    console.log("uint num = ",val.toString());

    const tx = await contractWithWallet.setValue(10);
    await tx.wait();
    // console.log(tx);

    const val2 = await contractWithWallet.getValue();
    console.log("uint num = ",val2.toString());

    const contractBalWei = await contractWithWallet.contractBalance();
    const contractBalEth = ethers.utils.formatEther(contractBalWei,"ether");
    console.log("Total Eth in Contract Acc : ",contractBalEth);
    
    const tx3 = await contractWithWallet.sendEthUser("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",{value:ethers.utils.parseEther("0.1")})
    await tx3.wait();
    // console.log(tx3);

    const tx2 = await contractWithWallet.sendEthContract({value:ethers.utils.parseEther("0.1")});
    await tx2.wait();
    // console.log(tx2);

    const accountBalWei = await contractWithWallet.accountBalance("0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93");
    const accountBalEth = ethers.utils.formatEther(accountBalWei,"ether");
    console.log("Total Eth in Given Acc : ",accountBalEth);
};
  
deploy();