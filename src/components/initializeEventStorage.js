const ContractEvent = require('../models/ContractEvent');
const { ethers } = require('ethers');


async function initializeEventStorage(contractAddress, contractABI) {
    console.log(`Initializing event storage for contract at address: ${contractAddress}`);

    const events = {};
    const contractInterface = new ethers.utils.Interface(contractABI);

    contractInterface.fragments.forEach(fragment => {
        if (fragment.type === 'event') {
            events[fragment.name] = []; // Initialize empty array for each event
        }
    });

    // Create the new contract event storage entity in MongoDB
    const newContractEvent = new ContractEvent({ _id: contractAddress, abi: contractABI, events });
    await newContractEvent.save();

    console.log(`Event storage initialized for contract: ${contractAddress}`);
}

module.exports = initializeEventStorage;
