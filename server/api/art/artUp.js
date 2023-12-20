const ArtSystem = require("@/system/ArtSystem");
const { RoleG, ErrorG } = require("../../global");
const { artFn } = require("../../utils");
module.exports = {
    /**
     * 计算技能属性
     * @param {*} art 技能信息
     * @returns attr 存在,代表计算被动
     * @returns artInfo.d 消耗
     * @returns artInfo.t 目标
     * @returns artInfo.v 伤害
     * @returns artInfo.e 效果
     */
    artUp: function (req, res) {
        const { id } = req.body;
        if (!id) {
            ErrorG.paramsError(res);
            return;
        }

        const { skill_pool, role_level, addition } = RoleG.getRoleGlobal(req, res);
        const { art: arts } = skill_pool;
        const art = arts[id];
        if (!art) {
            res.send({
                code: 0,
                message: '技能信息异常'
            })
            return;
        }
        // 领悟技能检验
        if (l === 0) {
            const { condition } = ArtSystem.getArt(id);
            if (condition > role_level) {
                res.send({
                    code: 0,
                    message: '等级不足，无法领悟该技能'
                })
                return;
            }
        }
        const up_art = ArtSystem.artLevelCompute(art.l, art.r);
        if (!up_art) {
            res.send({
                code: 0,
                message: '技能已达到最高级。'
            })
            return;
        }
        // 升级需要计算升级材料
        if (l !== 0) {
            const message = artFn.getUpArtMaterial(req, res, up_art);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
        }
        const { artInfo, attr } = ArtSystem.artUpLevel({ ...up_art, id });
        if (attr) {
            const { attr: oldAttr } = ArtSystem.artUpLevel({ ...art, id });
            Object.keys(attr).forEach((key) => {
                addition[key] += attr[key] - oldAttr[key];
            })
        }
        // 更新技能
        skill_pool.art[id] = { ...art, ...artInfo };
        // 人物信息
        RoleG.updataRoleGlobal(req, res, {
            skill_pool,
            addition
        })
        res.send({
            code: 0,
            data: '',
            art,
            success
        })
    }
};