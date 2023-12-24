const { ArtSystem } = require("@/system");
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
            const artIds = ArtSystem.getCareerArts(role_career);
            artIds.forEach((id) => {
                const { p, n, t, v, d } = ArtSystem.getArt(id);
                art[id] = {
                    id,
                    p,
                    n,
                    l: 0,
                    r: 0,
                    v,
                    d,
                    t
                };
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
            const { condition, msg } = ArtSystem.getArt(art[key].id);
            art[key]['condition'] = condition;
            art[key]['msg'] = ArtSystem.getArtMsg({ ...art[key], msg });
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