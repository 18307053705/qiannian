const addKnapsack = require('./addKnapsack');
const deleteKnapsack = require('./deleteKnapsack');
const asyncGetKnapsack = require('./asyncGetKnapsack');
const eatArticle = require('./eatArticle');
const addArticle = require('./addArticle');
const updateWarehouse = require('./updateWarehouse');
const updateKnapsack = require('./updateKnapsack');
const chekeKnapsack = require('./chekeKnapsack');

module.exports = {
    ...addKnapsack,
    ...deleteKnapsack,
    ...asyncGetKnapsack,
    ...eatArticle,
    ...addArticle,
    ...updateWarehouse,
    ...updateKnapsack,
    ...chekeKnapsack
}