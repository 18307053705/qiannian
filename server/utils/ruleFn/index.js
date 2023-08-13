const checkNameRule  = require('./checkNameRule');
const checkLoginRule  = require('./checkLoginRule');

module.exports = {
    ...checkNameRule,
    ...checkLoginRule
}