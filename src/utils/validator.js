const validateBlitzData = (data) => {
    const { contractAddress, contractABI, protocolName } = data;
    if (!contractAddress || !contractABI || !protocolName) {
      throw new Error('Missing required fields: contractAddress, contractABI, protocolName');
    }
  };
  
  module.exports = { validateBlitzData };
  