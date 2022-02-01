const { SQLDataSource } = require("datasource-sql");

class DataBase extends SQLDataSource {
    getAllTransactions() {
        return this.knex
            .select('*')
            .from('Transactions')
    }
    getAllItems() {
        return this.knex
            .select('*')
            .from('Items')
    }
    getTransaction(uid) {
        return this.knex
            .select('*')
            .from('Transactions')
            .where({ UID: uid })
    }
    getItem(uid) {
        return this.knex
            .select('*')
            .from('Items')
            .where({ UID: uid })
    }
    async addTransaction(transaction) {
        await this.knex('Transactions')
            .insert(transaction)
        return {
            success: true,
            message: "Transaction added",
            transaction: transaction
        }
    }
    async addItem(item) {
        await this.knex('Items')
            .insert(item)
        return {
            success: true,
            message: "Item added",
            transaction: item
        }
    }
}

module.exports = DataBase;