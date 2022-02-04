const { SQLDataSource } = require("datasource-sql");

class MyDatabase extends SQLDataSource {
    // getFruits() {
    //   this.knex
    //     .select("*")
    //     .from("fruit")
    //     .where({ id: 1 })
    //     .then((ret) => {
    //       console.log(ret);
    //     });
    // }

    // item getters
    async getItem(uid) {
        let items = await this.knex
            .select('*')
            .from('Items')
            .where({ UID: uid })
        return items[0]
    }

    async getItemWithName(name) {
        const item = await this.knex
            .select('*')
            .from('Items')
            .where({ Name: name })
        return item;
    }

    async getAllItems() {
        let items = this.knex
            .select('*')
            .from('Items')
        return items
    }

    // database transaction getters
    async getTransaction(uid) {
        let transactions = await this.knex
            .select('*')
            .from('Transactions')
            .where({ UID: uid })
        return transactions[0]
    }

    getLastTransaction() {
        return
    }

    getTransactionBetween(initDate, endDate) {
        return
    }

    async getAllTransactions() {
        let transactions = await this.knex
            .select('*')
            .from('Transactions')
        return transactions
    }

    // database transaction setters
    async addTransaction(transaction) {
        try {
            await this.knex
                .insert(transaction)
                .into('Transactions')
            return {
                success: true,
                message: "Transaction added",
                transaction: transaction
            }
        } catch (error) {
            return {
                success: false,
                message: error.toString(),
                transaction: transaction
            }
        }
    }

    // database item setters
    async addItem(item) {
        try {
            await this.knex
                .insert(item)
                .into('Items')
            return {
                success: true,
                message: "Item added",
                item: item
            }
        } catch (error) {
            return {
                success: false,
                message: error.toString(),
                item: item
            }
        }
    }
}

module.exports = MyDatabase;