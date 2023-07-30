const getknapsackGlobal = require('./getknapsackGlobal');
const setknapsackGlobal = require('./setknapsackGlobal');
const updateknapsackGlobal= require('./updateknapsackGlobal');
const saveknapsackSql = require('./saveknapsackSql');
module.exports = {
   ...getknapsackGlobal,
   ...setknapsackGlobal,
   ...updateknapsackGlobal,
   ...saveknapsackSql
}