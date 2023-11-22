const { KNAPSACK_LIMIT, KNAPSACK_SIZE, EQUIP_INIT_EXT } = require('./config');
const getknapsackGlobal = require('./getknapsackGlobal');
const setknapsackGlobal = require('./setknapsackGlobal');
const updateknapsackGlobal = require('./updateknapsackGlobal');
const deleteknapsackGlobal = require('./deleteknapsackGlobal');
const saveknapsackSql = require('./saveknapsackSql');
module.exports = {
   KNAPSACK_LIMIT,
   KNAPSACK_SIZE,
   EQUIP_INIT_EXT,
   ...getknapsackGlobal,
   ...setknapsackGlobal,
   ...updateknapsackGlobal,
   ...deleteknapsackGlobal,
   ...saveknapsackSql,
}