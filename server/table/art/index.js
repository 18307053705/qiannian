const  artList = require('./artList');
const getCareerArts = require('./getCareerArts');

module.exports = {
    ...artList,
    ...getCareerArts
}