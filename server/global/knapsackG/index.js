const getknapsackGlobal = require('./getknapsackGlobal');
const setknapsackGlobal = require('./setknapsackGlobal');
const updateknapsackGlobal = require('./updateknapsackGlobal');
const saveknapsackSql = require('./saveknapsackSql');
module.exports = {
   KNAPSACK_SIZE: 200,
   
   ...getknapsackGlobal,
   ...setknapsackGlobal,
   ...updateknapsackGlobal,
   ...saveknapsackSql,
}