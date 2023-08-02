const { FightG } = require('../../global');
const setPet = require('../petFn/setPet');
const { getFightResults } = require('./getFightResults');
module.exports = {
    /**
     * 捉宠物
     * @param {*} req 
     * @param {*} res 
     * @returns message 失败信息,无返回捕捉成功
     */
    catchPet: async function (req, res) {
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { name, type, ext } = fightMap.rivalMold;
        const { pet, level } = ext;
        if (!pet) {
            return '无法捕捉';
        }
        // 计算捕获宠物概率
        let rate = 90;
        if (level > 10) {
            rate = 70;
        }
        if (level > 20) {
            rate = 50;
        }
        if (level > 30) {
            rate = 30;
        }
        if (level > 40) {
            rate = 20;
        }
        const num = Math.floor(Math.random() * 100);
        if (num > rate) {
            return '捕捉失败！';
        }
        let { rivals } = fightInfo;
        rivals = rivals.map(({ name, attr }) => ({ attr: { ...attr, life: 0 }, name }));
        fightMap.player.state = 1;
        // 获取宠物
        const message = await setPet.setPet(req, res, { flair_x: level, name, type });
        // 更新战斗池信息
        FightG.updataFightInfoGlobal(req, res, { rivals });
        FightG.updataFightMapGlobal(req, res, { player:fightMap.player });
        getFightResults(req, res, { petMsg: message || `捕获宠物[${name}]` })
    },

};
