const { ArtTable } = require("../../table");
const { RoleG } = require("../../global");
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
    list: function (req, res) {
        const { skill_pool, role_career, role_level } = RoleG.getRoleGlobal(req, res);
        let { art } = skill_pool;
        if (!art || JSON.stringify(art) === '{}') {
            art = {};
            const artIds = ArtTable.getCareerArts(role_career);
            artIds.forEach((id) => {
                const { p, n, t, v, d } = ArtTable.getArt(id);
                const itme = {
                    id,
                    p,
                    n,
                    l: -1,
                    r: 0,
                    v,
                    d,
                    t
                }
                if (p === 2 || p === 3) {
                    itme['t'] = t;
                }
                art[id] = itme;
            });
            RoleG.updataRoleGlobal(req, res, {
                skill_pool: {
                    ...skill_pool,
                    art: JSON.parse(JSON.stringify(art))
                }
            });
        }

        // 计算描述信息
        Object.keys(art).forEach(key => {
            art[key]['msg'] = ArtTable.getArtMsg(art[key]);
            const { condition } = ArtTable.getArt(art[key].id);
            art[key]['condition'] = condition;
        })


        res.send({
            code: 0,
            data: {
                art,
                role_level
            }
        })
    }
};