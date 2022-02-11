const GraphQLDecimal = require('graphql-type-decimal')

const resolvers = {

    Decimal: {GraphQLDecimal},

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
        addTransaction: (_, { transaction }, { dataSources }) => dataSources.database.addTransaction(transaction),
        addItem: (_, { item }, { dataSources }) => dataSources.database.addItem(item),
        addTransactionItem: (_, { transactionItem }, { dataSources }) => dataSources.database.addTransactionItem(transactionItem),
    }
}

module.exports = resolvers;