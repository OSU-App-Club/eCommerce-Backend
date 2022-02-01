const resolvers = {
    Query: {
        getAllTransactions: (_, __, { dataSources }) => dataSources.database.getAllTransactions(),
        getAllItems: (_, __, { dataSources }) => dataSources.database.getAllItems(),
        getTransaction: (_, { uid }, { dataSources }) => dataSources.database.getTransaction(uid),
        getItem: (_, { uid }, { dataSources }) => dataSources.database.getItem(uid)
    },
    Mutation: {
        addTransaction: (_, { transaction }, { dataSources }) => dataSources.database.addTransaction(transaction),
        addItem: (_, { item }, { dataSources }) => dataSources.database.addItem(item)
    }
}

module.exports = resolvers;