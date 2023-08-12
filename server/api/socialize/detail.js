const { ErrorG, RoleG, SocializeG } = require('../../global');
const { socializeFn } = require('../../utils');
const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
module.exports = {
    /**
     * 势力详情
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     */
    detail: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { socialize_pool, role_id } = RoleG.getRoleGlobal(req, res);
        const sociKey = TYPE_MEUN_NAME[type];
        // 势力信息
        const sociInfo = socialize_pool[sociKey];
        if (!sociInfo) {
            res.send({
                code: 0,
                data: ''
            })
            return;
        }
        const { id: soci_id } = sociInfo;
        // 获取帮会信息
        const socialize = await socializeFn.getSocialize(req, res, soci_id, type);
        if (socialize) {
            let { compose } = socialize;
            const { line = {} } = SocializeG.getSocializeGlobal(req, res, sociKey) || {};
            compose = compose.map(itme => {
                return {
                    ...itme,
                    line: line[itme.id],
                    isRole: itme.id === role_id
                }
            })
            const soci = compose.find((itme) => itme.id === role_id);
            socialize_pool[sociKey]['level'] = soci.level;
            RoleG.updataRoleGlobal(req, res, {
                socialize_pool
            })
            res.send({
                code: 0,
                data: {
                    ...socialize,
                    compose,
                    role_level: soci.level
                }
            });
            return;
        }
        // id存在却未找到对应势力，代表势力已经解散
        if (soci_id) {
            delete socialize_pool[sociKey];
            RoleG.updateRoleGlobal(req, {
                socialize_pool
            })
            res.send({
                code: 0,
                data: ''
            });
        }
    }
}