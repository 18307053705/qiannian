const pellet = require('./10_pellet');
const dongTian = require('./11_dongTian');

module.exports = {
    getSynthesisList: function () {
        return [
            ...pellet.getAllPellet(),
            ...dongTian.getAllDongTian()
        ]
    },
    getSynthesis: function (uid) {
        switch ((uid + "").slice(0, 2)) {
            case '10':
                return pellet.getPellet(uid);
            case '11':
                return dongTian.getDongTian(uid);
            default:
                console.log('合成物品异常::', uid)
                return undefined;
        }
    }
}
