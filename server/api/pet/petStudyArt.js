const { ArtSystem } = require("@/system");
const { PetG } = require("@/global");
const { knapsackFn, artFn } = require("@/utils");
const { ArtTable, knapsackTable } = require("@/table");
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
        const { id: petId, art: arts, level, addition } = PetG.getPetGlobal(req, res) || {};
        if (!petId) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }

        const index = arts.findIndex(({ id: artId }) => artId === id);
        if (index === -1) {
            res.send({
                code: 0,
                message: '技能信息有误。'
            })
            return;
        }
        const art = arts[index];
        const { condition, maxL } = ArtSystem.getArt(id);

        if (art.l >= maxL) {
            res.send({
                code: 0,
                message: '该技能已经达到最大等级。'
            })
            return;
        }
        let successText;
        const up_art = ArtSystem.artLevelCompute(art.l, art.r);
        // 领悟技能
        if (art.l === 0) {
            if (condition > level) {
                res.send({
                    code: 0,
                    message: '宠物等级不足，无法领悟该技能'
                })
                return;
            }
            // 消耗宠物技能卷
            const name = knapsackTable.getDataName(180);
            const article = {
                180: {
                    id: 180,
                    name,
                    s: condition
                }
            }
            const { message, success } = knapsackFn.deleteKnapsack(req, res, article);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            successText = success;
        } else {
            let result = artFn.getUpArtMaterial(req, res, up_art);
            if (result.message) {
                res.send({
                    code: 0,
                    message: result.message
                })
                return;
            }
            successText = result.success;
        }
        // 技能升级后属性
        const { artInfo, attr } = ArtSystem.artUpLevel({ ...up_art, id });
        if (attr) {
            const { attr: oldAttr } = ArtSystem.artUpLevel({ ...art, id });
            Object.keys(attr).forEach((key) => {
                addition[key] += attr[key] - oldAttr[key];
            })
        }
        // 更新技能
        arts[index] = { ...art, ...artInfo };
        // 更新宠物信息
        PetG.updataPetGlobal(req, res, {
            art: arts,
            addition: addition
        })
        res.send({
            code: 0,
            data: 'ok',
            success: successText
        })
    },
}