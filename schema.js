const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # database objects for getters

    scalar Decimal

    type Transaction {
        Name: String!
        Shipping_Address: String!
        Billing_Street: String!
        Billing_City: String!
        Billing_State: String!
        Billing_Zip: String!
        Total_Cost: Decimal!
        Discounts: Decimal!
        Phone_Numb: String!
        Email: String!
        
    }
    type Item {
        Name: String!
        Cost: Decimal!
    }

    type TransactionItem {
        TransactionID: Int!
        ItemID: Int!
    }

    # database objects for setters
    input TransactionInput {
        Name: String!
        Shipping_Address: String!
        Billing_Street: String!
        Billing_City: String!
        Billing_State: String!
        Billing_Zip: String!
        Total_Cost: Decimal!
        Discounts: Decimal!
        Phone_Numb: String!
        Email: String!
    }
    input ItemInput {
        Name: String!
        Cost: Decimal!
    }
    input TransactionItemInput {
        TransactionID: Int!
        ItemID: Int!
    }

    # mutation responses
    type TransactionMutationResponse {
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
        getTransaction(uid: Int!): Transaction
        getItem(uid: Int!): Item
        getItemWithName(name: String!): [Item]
        getLastTransaction: Transaction
    }
    type Mutation {
        addTransaction(transaction: TransactionInput!, nonce: String!): TransactionMutationResponse!
        addItem(item: ItemInput!): ItemMutationResponse!
        addTransactionItem(transactionItem: TransactionItemInput!): TransactionItemMutationResponse!
    }
`;

module.exports = typeDefs;