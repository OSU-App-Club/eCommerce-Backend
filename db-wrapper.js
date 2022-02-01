const knex = require('knex');

class MyDatabase {
  constructor(knexConfig) {
    this.knex = knex(knexConfig);
  }

  // getFruits() {
  //   this.knex
  //     .select("*")
  //     .from("fruit")
  //     .where({ id: 1 })
  //     .then((ret) => {
  //       console.log(ret);
  //     });
  // }

  getLastTransaction() {

  }

  getTransactionBetween(initDate, endDate) {

  }

  addTransaction(transaction) {

  }

  addItem(item) {

  }

  getItemWithName(name) {

  }
}

module.exports = MyDatabase;