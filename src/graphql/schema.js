const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const ContractEvent = require('../models/ContractEvent');

const EventInstanceType = new GraphQLObjectType({
    name: 'EventInstance',
    fields: {
        timestamp: { type: GraphQLString },
        data: { 
            type: new GraphQLList(GraphQLString), // Change data type to GraphQLList
            resolve: (parent) => {
                // Parse data if it's a string, assuming it's a JSON string representing an array
                if (typeof parent.data === 'string') {
                    try {
                        const parsedData = JSON.parse(parent.data);
                        if (Array.isArray(parsedData)) {
                            return parsedData;
                        } else if (typeof parsedData === 'object') {
                            // Convert object to an array of key-value pairs
                            return Object.entries(parsedData).map(([key, value]) => `${key}: ${value}`);
                        }
                    } catch (error) {
                        return [parent.data]; // Return as a single-item list if parsing fails
                    }
                }

                // If data is already an array, return it directly
                if (Array.isArray(parent.data)) {
                    return parent.data;
                }

                // If data is an object, convert it to an array of key-value pairs
                if (typeof parent.data === 'object') {
                    return Object.entries(parent.data).map(([key, value]) => `${key}: ${value}`);
                }

                return [String(parent.data)]; // Default to returning data as a single-item list
            }
        }
    }
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        eventName: { type: GraphQLString },
        instances: { type: new GraphQLList(EventInstanceType) }
    }
});

const ContractType = new GraphQLObjectType({
    name: 'Contract',
    fields: {
        _id: { type: GraphQLString },
        events: { type: new GraphQLList(EventType) }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        contract: {
            type: ContractType,
            args: { 
                eventName: { type: GraphQLString }
            },
            resolve: async (parent, args, context) => {
                const contractAddress = context.contractAddress;
                //console.log(`Contract Address from context: ${contractAddress}`);

                // Fetch the contract from the database
                const contract = await ContractEvent.findById(contractAddress);
                //console.log(`Contract fetched: ${JSON.stringify(contract, null, 2)}`);

                if (!contract) {
                    console.log('No contract found, returning null.');
                    return null;
                }

                const events = [];

                if (args.eventName) {
                    const instances = contract.events.get(args.eventName);
                    if (Array.isArray(instances)) {
                        events.push({
                            eventName: args.eventName,
                            instances: instances.map(instance => ({
                                timestamp: instance.timestamp,
                                data: JSON.stringify(instance.data, null, 2)
                            }))
                        });
                    }
                } else {
                    contract.events.forEach((instances, eventName) => {
                        if (Array.isArray(instances)) {
                            events.push({
                                eventName,
                                instances: instances.map(instance => ({
                                    timestamp: instance.timestamp,
                                    data: JSON.stringify(instance.data, null, 2)
                                }))
                            });
                        }
                    });
                }

                //console.log(`Events to be returned: ${JSON.stringify(events, null, 2)}`);
                return { _id: contract._id, events };
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});