const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # database objects for getters
    type Transaction {
        Shipping_Address: String!
        Billing_Address: String!
        Payment_Info: String!
        Total_Cost: String!
        Discounts: String!
        UID: String!
    }
    type Item {
        Name: String!
        UID: String!
    }

    # database objects for setters
    input TransactionInput {
        Shipping_Address: String!
        Billing_Address: String!
        Payment_Info: String!
        Total_Cost: String!
        Discounts: String!
        UID: String!
    }
    input ItemInput {
        Name: String!
        UID: String!
    }

    # mutation responses
    type TranscationMutationResponse {
        success: Boolean!
        message: String!
        transaction: Transaction!
    }
    type ItemMutationResponse {
        success: Boolean!
        message: String!
        item: Item!
    }

    # root types
    type Query {
        getAllTransactions: [Transaction]!
        getAllItems: [Item]!
        getTransaction(uid: String!): Transaction
        getItem(uid: String!): Item
        getItemWithName(name: String!): [Item]
        getLastTransaction: Transaction
    }
    type Mutation {
        addTransaction(transaction: TransactionInput!): TranscationMutationResponse!
        addItem(item: ItemInput!): ItemMutationResponse!
    }
`;

module.exports = typeDefs;