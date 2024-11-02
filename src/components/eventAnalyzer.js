const { ethers } = require('ethers');

// Function to analyze and log contract events and their parameters using ethers.js
function analyzeContractEvents(contractAddress, contractABI) {
    console.log(`Analyzing contract at address: ${contractAddress}`);

    // Initialize a Contract object with ethers.js (No provider needed for ABI parsing)
    const contractInterface = new ethers.utils.Interface(contractABI);

    const events = [];

    // Iterate over each event in the ABI
    contractInterface.fragments.forEach(fragment => {
        if (fragment.type === 'event') {
            const eventDetails = {
                eventName: fragment.name,
                parameters: fragment.inputs.map((input, index) => ({
                    name: input.name,
                    type: input.type,
                    indexed: input.indexed
                }))
            };
            events.push(eventDetails);

            // Log the event details
            console.log(`\nEvent: ${fragment.name}`);
            fragment.inputs.forEach((input, index) => {
                console.log(` - Parameter ${index + 1}: ${input.name}, Type: ${input.type}, Indexed: ${input.indexed}`);
            });
        }
    });

    console.log('Event analysis completed.');

    return events; // Return the array of event details for further use
}

module.exports = analyzeContractEvents;
