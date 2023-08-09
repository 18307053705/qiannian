const { ArtTable } = require("../../table");
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
        const { skill_pool, role_level, role_attr } = RoleG.getRoleGlobal(req, res);
        const { art } = skill_pool;
        if (!art[id]) {
            ErrorG.paramsError(res);
            return;
        }
        const { l, r } = art[id];
        const artBase = ArtTable.getArt(id);
        let old_art = { l, r, id };
        // 领悟技能
        if (l === -1) {
            if (artBase.condition > role_level) {
                res.send({
                    code: 0,
                    message: '等级不足，无法领悟该技能'
                })
                return;
            }
            old_art = { l: 0, r: 0, id };
        }

        const { message, up_art } = artFn.getUpArtMaterial(req, res, old_art);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        // 技能升级后属性
        const { addition, artInfo } = artFn.artUpLevel(old_art, { ...up_art, id }, role_attr.addition);
        // 更新技能
        art[id] = { ...art[id], ...artInfo, ...up_art };
        role_attr.addition = addition;
        // 人物信息
        RoleG.updataRoleGlobal(req, res, {
            role_attr,
            skill_pool
        })
        res.send({
            code: 0,
            data: '',
            addition
        })
    }
};