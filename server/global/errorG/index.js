const loginError = require('./loginError');
const paramsError = require('./paramsError');
const roleError = require('./roleError');
const unknownError = require('./unknownError');

module.exports = {
    ...loginError,
    ...paramsError,
    ...roleError,
    ...unknownError,
}
