const { FIGHT_INFO_Global } = require('./config');
const { getFightGlobal } = require('./getFightGlobal');


module.exports = {
    /**
     * 删除全局战斗信息池
     * @param {*} req 
     * @param {*} res
     */
    deleteFightInfoGlobal: function (req, res) {
        const { fightMap } = getFightGlobal(req, res);
        delete FIGHT_INFO_Global[fightMap.id];
    }

}