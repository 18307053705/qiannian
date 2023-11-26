const pellet = require('./10_pellet');
const dongTian = require('./11_dongTian');
const material = require('./12_material');

module.exports = {
    getSynthesisList: function () {
        return [
            ...pellet.getAllPellet(),
            ...dongTian.getAllDongTian(),
            ...material.getAllMaterialMap(),
        ]
    },
    getSynthesis: function (uid) {
        switch ((uid + "").slice(0, 2)) {
            case '10':
                return pellet.getPellet(uid);
            case '11':
                return dongTian.getDongTian(uid);
            case '12':
                return material.getMaterial(uid);
            default:
                console.log('合成物品异常::', uid)
                return undefined;
        }
    }
}
