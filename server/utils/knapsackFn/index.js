const addKnapsack = require('./addKnapsack');
const deleteKnapsack = require('./deleteKnapsack');
const asyncGetKnapsack = require('./asyncGetKnapsack');
const chekeArticle = require('./chekeArticle');
const eatArticle = require('./eatArticle');
const addArticle = require('./addArticle');
const updateWarehouse = require('./updateWarehouse');
const updateKnapsack = require('./updateKnapsack');
const chekeKnapsack = require('./chekeKnapsack');

module.exports = {
    ...addKnapsack,
    ...deleteKnapsack,
    ...asyncGetKnapsack,
    ...chekeArticle,
    ...eatArticle,
    ...addArticle,
    ...updateWarehouse,
    ...updateKnapsack,
    ...chekeKnapsack
}