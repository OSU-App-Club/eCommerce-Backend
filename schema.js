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

    type TransactionItem {
        TransactionID: String!
        ItemID: String!
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
    input TransactionItemInput {
        TransactionID: String!
        ItemID: String!
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
    type TransactionItemMutationResponse {
        success: Boolean!
        message: String!
    }

    # root types
    type Query {
        getAllTransactions: [Transaction]!
        getAllItems: [Item]!
        getAllTransactionsItems: [TransactionItem]!
        getTransaction(uid: String!): Transaction
        getItem(uid: String!): Item
        getItemWithName(name: String!): [Item]
        getLastTransaction: Transaction
    }
    type Mutation {
        addTransaction(transaction: TransactionInput!): TranscationMutationResponse!
        addItem(item: ItemInput!): ItemMutationResponse!
        addTransactionItem(transactionItem: TransactionItemInput!): TransactionItemMutationResponse!
    }
`;

module.exports = typeDefs;