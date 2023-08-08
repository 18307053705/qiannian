const { PetG, ErrorG } = require("../../global");
const { knapsackFn } = require("../../utils");
module.exports = {
    /**
     * 学习技能
     * @param artId 
     */
    petReborn: function (req, res) {
        const { artId } = req.body;
        if (!artId) {
            ErrorG.paramsError(res);
            return;
        }
        const { id, art, level } = PetG.getPetGlobal(req, res) || {};
        if (!id) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }

        const artInfo = art.find(({ id }) => id === artId);
        if(!artInfo){
            res.send({
                code: 0,
                message: '技能信息有误宠物参战。'
            })
            return;
        }
        const { l } = artInfo;
        if (artId === 19 && l === 9) {
            res.send({
                code: 0,
                message: '附体技能已经达到最大等级。'
            })
            return;
        }
        const artInfo = ArtTable[artId];
        let artRes = {
            message: '',
            up_art: '',
        }
        // 领悟技能
        if (l === -1) {
            if (artInfo.condition > level) {
                artRes.message = '等级不足，无法领悟该技能';
            } else {
                // 消耗宠物技能卷
                artRes.up_art = artFn.artLevelCompute({ l: 0, r: 0 });
                const article = KnapsackTable[158];
                const { message } = knapsackFn.deleteKnapsack(req, { [158]: { ...article, p: article['type'], s: 1 } });
                artRes.message = message;
            }
        } else {
            artRes = artFn.getMaterial(req, art[in_x + 1]);
        }
        const { up_art, message } = artRes;
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }

        const data = artFn.petArtUpAttrfunction(req, art[in_x + 1], { l: up_art.l, r: up_art.r });
        art[in_x + 1] = petFn.getArttips(data.art);
        const updata = {
            art,
        }

        if (data.addition) {
            updata['addition'] = data.addition;
        }
        Global.updatePetGlobal(req, updata);
        res.send({
            code: 0,
            data: 'ok',
        })
    },
}