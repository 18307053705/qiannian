const { ErrorG, RoleG } = require('../../global');
const { socializeFn } = require('../../utils');
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
     * 申请势力
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {*} req.id 势力id
     */
    apply: async function (req, res) {
        const { id, type } = req.body;
        if (!type || !id) {
            ErrorG.paramsError(res);
            return;
        }
        const { socialize_pool, role_id,role_name } = RoleG.getRoleGlobal(req, res);
        const sociKey = TYPE_MEUN_NAME[type];
        if (socialize_pool[sociKey]) {
            res.send({
                code: 0,
                message: `你已经加入了${TYPE_MEUN[type]}`
            })
            return;
        }
        // 获取帮会信息
        const socialize = await socializeFn.getSocialize(req, res, id, type);
        if (socialize) {
            const role_c = socialize.compose.find(({ id }) => id === role_id);
            const role_a = socialize.apply.find(({ id }) => id === role_id);
            if (role_c || role_a) {
                res.send({
                    code: 0,
                    message: role_c ? `已经加入该${TYPE_MEUN[type]}。` : `已申请过该${TYPE_MEUN[type]},无法重复申请。`,
                })
                return;
            }
            socialize.apply.push({ id: role_id, name: role_name });
            await socializeFn.updataSocialize(req, res, id, type, { apply: socialize.apply })
            res.send({
                code: 0,
                data: '申请成功',
                success: `申请成功,请耐心等待${TYPE_MEUN[type]}管理处理`,
            })
        }
    }
}