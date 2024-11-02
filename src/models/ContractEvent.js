const mongoose = require('mongoose');

const EventInstanceSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
});

const ContractEventSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    abi: {
        type: Array, // This field will store the ABI array
        required: true,
    },
    events: {
        type: Map,
        of: [EventInstanceSchema],
        default: {},
    },
});

module.exports = mongoose.model('ContractEvent', ContractEventSchema);