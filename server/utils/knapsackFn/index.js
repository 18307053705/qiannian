const addKnapsack = require('./addKnapsack');
const deleteKnapsack = require('./deleteKnapsack');
const getKnapsackInfo = require('./getKnapsackInfo');
const chekeArticle = require('./chekeArticle');
const eatArticle = require('./eatArticle');

module.exports = {
    ...addKnapsack,
    ...deleteKnapsack,
    ...getKnapsackInfo,
    ...chekeArticle,
    ...eatArticle
}