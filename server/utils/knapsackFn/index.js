const addKnapsack = require('./addKnapsack');
const deleteKnapsack = require('./deleteKnapsack');
const getKnapsackInfo = require('./getKnapsackInfo');
const chekeArticle = require('./chekeArticle');
const eatArticle = require('./eatArticle');
const addArticle = require('./addArticle');
const updateWarehouse = require('./updateWarehouse');

module.exports = {
    ...addKnapsack,
    ...deleteKnapsack,
    ...getKnapsackInfo,
    ...chekeArticle,
    ...eatArticle,
    ...addArticle,
    ...updateWarehouse
}