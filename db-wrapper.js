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
    getItem(uid) {
        return this.knex
            .select('*')
            .from('Items')
            .where({ UID: uid })
    }

    getItemWithName(name) {
        return
    }

    getAllItems() {
        return this.knex
            .select('*')
            .from('Items')
    }

    // database transaction getters
    getTransaction(uid) {
        return this.knex
            .select('*')
            .from('Transactions')
            .where({ UID: uid })
    }

    getLastTransaction() {
        return
    }

    getTransactionBetween(initDate, endDate) {
        return
    }

    getAllTransactions() {
        return this.knex
            .select('*')
            .from('Transactions')
    }

    // database transaction setters
    async addTransaction(transaction) {
        await this.knex('Transactions')
            .insert(transaction)
        return {
            success: true,
            message: "Transaction added",
            transaction: transaction
        }
    }

    // database item setters
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

module.exports = MyDatabase;