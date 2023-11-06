// events in smart contract and ethers.js
/*
    `contract.on` 
    * is used to set up an event listener that listens for specific events emitted by a smart contract and triggers a callback function when the event is detected.
    * You can use contract.on to listen for events in real-time, making it suitable for applications where you need to respond to events as they happen.
    
    `contract.queryFilter`
    * used to query for past events that have already been emitted by a smart contract. It allows you to retrieve historical event data.
    * You specify the event you want to query, as well as optional filters such as the block range or the address of the sender or receiver. 
*/

const ethers = require('ethers');
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_INFURA);
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //DAI coin contract address
// DAI coin ABI below
const ABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const myAddress = "0x00000000219ab540356cbb839cbe05303d7705fa"; 
// sample account address that gives some output in ranges for 'queryFilter'
const main = async ()=>{
    const contract = new ethers.Contract(address,ABI,provider);
    /*
        Filters can include event names and indexed parameters only.
        Define the event filter :- 
        const filter = contract.filters.YourEventName("Add filter parameters here");
        For example :  
            filterFrom = contract.filters.Transfer(myAddress, null);
            filterTo = contract.filters.Transfer(null, myAddress);
        You can use 'null' as a wildcard for parameters that you want to ignore.
        Also read :- https://docs.ethers.org/v5/concepts/events/
    */
    // * Filter by simple Event Name
    // const transferEvents = await contract.queryFilter(<eventName>,<from Block No>,<to Block No>);
    const printFrom = (from, to, amount, event) => {
        console.log(`I sent ${ ethers.utils.formatEther(amount) } to ${ to }`);
    };
    const printTo = (from, to, amount, event) => {
        console.log(`${ from } sent ${ ethers.utils.formatEther(amount) } to me`,);
    };
    const printLogs = (from, to, amount, event) => {
        console.log(`${ from } sent ${ ethers.utils.formatEther(amount) } to ${ to }`);
    };

    contract.on("Transfer", printTo);
    const eventListener2 = await contract.queryFilter("Transfer", 9843470, 9843480); 

    // * Filter by complex Event Name
    // const transferEvents = await contract.queryFilter(<filterName>,<from Block No>,<to Block No>);
    const filterNone = contract.filters.Transfer(null,null); // List all token transfers
    contract.on(filterNone, printLogs);

    const filterFrom = contract.filters.Transfer(myAddress, null); // List all token transfers *from* myAddress
    const eventListener4 = await contract.queryFilter(filterFrom, 9843470, 9843480);  

    // List all transfers sent in the last 100 blocks
    const last100Transfers = await contract.queryFilter(filterFrom, -100);

    // To stop the event listeners
    setTimeout(() => {
        contract.off(filterNone, printLogs);
        console.log('Unsubscribed from the second event after a delay');
    }, 60000);
    setTimeout(() => {
        contract.off("Transfer",printTo);
        console.log('Unsubscribed from the first event after a delay first');
    }, 6000);
};
main();