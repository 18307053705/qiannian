const { socializeFn, roleFn } = require('../../utils');

const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}
const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
module.exports = {
    /**
     * 申请处理
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {*} req.role_id 申请玩家id
     * @param {*} req.state 可选,1:同意 未传:拒绝
     */
    active: async function (req, res) {
        const { role_id, type, state } = req.body;
        if (!type || !role_id) {
            ErrorG.paramsError(res);
            return;
        }
        const { socialize_pool: mySocialize } = RoleG.getRoleGlobal(req, res);
        const sociKey = TYPE_MEUN_NAME[type];
        const { level, id } = mySocialize[sociKey];
        if ((type === 1 && level > 3) || (type === 2 && level > 2) || (type === 3 && level > 1)) {
            res.send({
                code: 0,
                message: '你没有此权限。'
            })
            return;
        }

        // 获取帮会信息
        const socialize = await socializeFn.getSocialize(req, res, id, type);
        if (socialize) {
            const { socialize_pool: targSocialize, role_name } = await roleFn.getRoleInfo(req, res, { role_id });
            const { apply, compose } = socialize;
            const role_a = apply.filter(({ id }) => id !== role_id);
            // 判断是否加入了其他势力
            if (targSocialize[sociKey]) {
                await socializeFn.updataSocialize(req, res, id, type, { apply: role_a })
                res.send({
                    code: 0,
                    message: `玩家已加入其他${TYPE_MEUN[type]}`,
                    data: role_a
                })
                return;
            }
            if (state) {
                // 添加帮会成员
                compose.push({
                    id: role_id,
                    name: role_name,
                    level: 5
                });
                // 加入帮会信息
                targSocialize[sociKey] = {
                    id: socialize['soci_id'],
                    name: socialize['name'],
                    level: 5
                }
                // 更新角色信息
                roleFn.updataRoleInfo(req, res, { socialize_pool: targSocialize }, role_id);
            }
            // 更新帮会信息
            await socializeFn.updataSocialize(req, res, id, type, { apply: role_a, compose });
            res.send({
                code: 0,
                data: role_a
            })

        }
    }
}