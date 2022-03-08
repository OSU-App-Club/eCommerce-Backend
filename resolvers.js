const GraphQLDecimal = require('graphql-type-decimal')
const processPayment = require('./braintree-api')

async function processAddTransaction(transaction, nonce, dataSources) {
    let paymentResult = await processPayment(transaction, nonce)
    if (!paymentResult.success) {
        return {
            success: false,
            message: "Payment failed",
            transaction: transaction
        }
    }
    let result = await dataSources.database.addTransaction(transaction);
    if (result.success) {
        result.message = "Payment succeeded and transaction added to DB"
    }
    return result
}

const resolvers = {

    Decimal: { GraphQLDecimal },

    Query: {
        getAllTransactions: (_, __, { dataSources }) => dataSources.database.getAllTransactions(),
        getAllItems: (_, __, { dataSources }) => dataSources.database.getAllItems(),
        getTransaction: (_, { uid }, { dataSources }) => dataSources.database.getTransaction(uid),
        getItem: (_, { uid }, { dataSources }) => dataSources.database.getItem(uid),
        getAllTransactionsItems: (_, __, { dataSources }) => dataSources.database.getAllTransactionsItems(),
        getItemWithName: (_, { name }, { dataSources }) => dataSources.database.getItemWithName(name),
        getLastTransaction: (_, __, { dataSources }) => dataSources.database.getLastTransaction(),
    },
    Mutation: {
        addTransaction: (_, { transaction, nonce }, { dataSources }) => processAddTransaction(transaction, nonce, dataSources),
        addItem: (_, { item }, { dataSources }) => dataSources.database.addItem(item),
        addTransactionItem: (_, { transactionItem }, { dataSources }) => dataSources.database.addTransactionItem(transactionItem),

    }
}

module.exports = resolvers;