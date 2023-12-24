const { socializeFn } = require('@/utils');
const { SocializeSql } = require('@/mysql');
const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
module.exports = {
    /**
     * 退出势力
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     */
    exit: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { socialize_pool, role_id } = RoleG.getRoleGlobal(req, res);
        const typeName = TYPE_MEUN_NAME[type];
        const { id, level } = socialize_pool[typeName];
        // 获取帮会信息
        const socialize = await socializeFn.getSocialize(req, res, id, type);
        if (socialize) {
            delete socialize_pool[typeName];
            RoleG.updataRoleGlobal(req, res, { socialize_pool });
            // 等级1操作即为帮主解散操作
            if (level === 1) {
                await SocializeSql.asyncDeleteSocialize(id, type);
                res.send({
                    code: 0,
                    data: '成功退出！'
                })
                return;
            }
            // 其他则自身退出即可
            const compose = socialize.compose.filter(({ id }) => id !== role_id);
            await socializeFn.updataSocialize(req, res, id, type, { compose });
            res.send({
                code: 0,
                data: '成功退出！'
            })
        }
    }
}