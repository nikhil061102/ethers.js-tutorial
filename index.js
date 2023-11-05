const { ethers } = require("ethers");
require("dotenv").config();

const PROJECT_ID = process.env.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
// OR 
// const provider = new ethers.providers.JsonRpcProvider(PROJECT_ID);

const querryBlockchain = async () => {
    const accounts = await provider.listAccounts();

    const currblocknumber = await provider.getBlockNumber();
    console.log("Current Block Number:", currblocknumber);

    const balance = await provider.getBalance(accounts[0]);
    // OR
    // const balance = await provider.getBalance("0xf1247a634753b1a2BddEF94C47271bEEBE1C6AEd");
    console.log("Account Balance In BN:", balance);

    const balanceEther = ethers.utils.formatEther(balance,"ether");
    console.log("Account Balance In Ether:", balanceEther);

    const balanceWei = ethers.utils.parseEther(balanceEther);
    console.log("Account Balance In BN after reconversion to BN:", balanceWei);

    // Here initially it runs for Ganache GUI but second statements can be used for real test-networks
};
querryBlockchain();