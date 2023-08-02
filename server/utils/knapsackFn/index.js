const addKnapsack = require('./addKnapsack');
const deleteKnapsack = require('./deleteKnapsack');
const getKnapsackInfo = require('./getKnapsackInfo');

module.exports = {
    ...addKnapsack,
    ...deleteKnapsack,
    ...getKnapsackInfo
}