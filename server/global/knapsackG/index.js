const getknapsackGlobal = require('./getknapsackGlobal');
const setknapsackGlobal = require('./setknapsackGlobal');
const updateknapsackGlobal = require('./updateknapsackGlobal');
const deleteknapsackGlobal = require('./deleteknapsackGlobal');
const saveknapsackSql = require('./saveknapsackSql');
module.exports = {
   KNAPSACK_SIZE: 200,
   KNAPSACK_LIMIT: 999999,
   ...getknapsackGlobal,
   ...setknapsackGlobal,
   ...updateknapsackGlobal,
   ...deleteknapsackGlobal,
   ...saveknapsackSql,
}