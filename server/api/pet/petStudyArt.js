const { PetG, ErrorG } = require("../../global");
const { knapsackFn, artFn } = require("../../utils");
const { ArtTable, knapsackTable } = require("../../table");
module.exports = {
    /**
     * 学习技能
     * @param artId 
     */
    petStudyArt: function (req, res) {
        const { id } = req.body;
        if (!id) {
            ErrorG.paramsError(res);
            return;
        }
        const { id: petId, art, level, addition: petAddition } = PetG.getPetGlobal(req, res) || {};
        if (!petId) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }

        const index = art.findIndex(({ id: artId }) => artId === id);
        if (index === -1) {
            res.send({
                code: 0,
                message: '技能信息有误。'
            })
            return;
        }
        const { l, r } = art[index];
        if (id === 19 && l === 9) {
            res.send({
                code: 0,
                message: '附体技能已经达到最大等级。'
            })
            return;
        }

        const artBase = ArtTable.getArt(id);

        // const artInfo = ArtTable[artId];
        let up_art = undefined;
        let old_art = { l, r, id };
        // 领悟技能
        if (l === -1) {
            if (artBase.condition > level) {
                res.send({
                    code: 0,
                    message: '宠物等级不足，无法领悟该技能'
                })
                return;
            }
            // 消耗宠物技能卷
            const { type, n } = knapsackTable.getArticle(158);
            const article = {
                [158]: {
                    p: type,
                    n,
                    s: artBase.condition
                }
            }
            const { message } = knapsackFn.deleteKnapsack(req, res, { article });
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            up_art = { l: 1, r: 0, id };
            old_art = { l: 0, r: 0, id };
        }
        // 判断是否为领悟
        if (!up_art) {
            const result = artFn.getUpArtMaterial(req, res, old_art);
            if (result.message) {
                res.send({
                    code: 0,
                    message: result.message
                })
                return;
            }
            up_art = { ...result.up_art, id };
        }
        // 技能升级后属性
        const { addition, artInfo } = artFn.artUpLevel(old_art, up_art, petAddition);
        // 更新技能
        art[index] = { ...art[index], ...artInfo, ...up_art };
        // 更新宠物信息
        PetG.updataPetGlobal(req, res, {
            art,
            addition: addition
        })
        res.send({
            code: 0,
            data: 'ok',
        })
    },
}