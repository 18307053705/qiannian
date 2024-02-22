const rankTypeChange = require('./rankTypeChange');
const getRank = require('./getRank');
const setRank = require('./setRank');
const computeRank = require('./computeRank');

module.exports = {
    ...rankTypeChange,
    ...getRank,
    ...setRank,
    ...computeRank,
}