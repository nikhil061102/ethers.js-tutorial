// get transaction and block details 
const ethers = require('ethers');
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_INFURA);
const main = async ()=>{
    // const block = await provider.getBlockNumber();
    const block = 18500000;
    console.log(block);
    const blockInfo = await provider.getBlock(block);
    console.log(blockInfo);

    const someTxDetails = await provider.getTransactionReceipt("0x122f25a52c76682fb0e6b904b3b666e6a9bf5008af0d4c3b474d4e3010c4d5f9");
    console.log(someTxDetails);
    const someTx = await provider.getTransaction("0x122f25a52c76682fb0e6b904b3b666e6a9bf5008af0d4c3b474d4e3010c4d5f9");
    console.log(someTx);
};
main();