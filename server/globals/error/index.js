const loginError = require('./loginError');
const paramsError = require('./paramsError');
const roleError = require('./roleError');
const unknownError = require('./unknownError');

global.ErrorG = {
    ...loginError,
    ...paramsError,
    ...roleError,
    ...unknownError,
}
