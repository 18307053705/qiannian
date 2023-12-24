const { ruleFn, knapsackFn } = require('@/utils');
const { SocializeSql } = require('@/mysql');
const { knapsackTable } = require('@/table');

const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}
// 令牌ID
const TOKEN_ID_MEUN = {
    1: 146, // 帮会创建令
    2: 147, // 庄园创建令
}
module.exports = {
    /**
     * 创建势力
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {*} req.name 势力名称
     * @param {*} req.text 描述,可选
     */
    create: async function (req, res) {
        const { type, name, text } = req.body;
        if (!type || !name) {
            ErrorG.paramsError(res);
            return;
        }
        if (!ruleFn.checkNameRule(res, name)) {
            return;
        }
        const { role_id, role_name, socialize_pool } = RoleG.getRoleGlobal(req, res);
        const sociKey = TYPE_MEUN_NAME[type];
        if (socialize_pool[sociKey]) {
            res.send({
                code: 0,
                message: `你已经加入了${TYPE_MEUN[type]}`
            })
            return;
        }
        const results = await SocializeSql.asyncGetNameSocialize(name, type);
        if (results) {
            res.send({
                code: 0,
                message: `已存在${TYPE_MEUN[type]}名称：${name}`
            })
            return;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        // 获取对应创建令ID
        const tokenId = TOKEN_ID_MEUN[type];
        let token = 0;
        // 队伍不需要创建令
        if (tokenId) {
            const { name } = knapsackTable.getArticle(tokenId);
            const { message } = knapsackFn.deleteKnapsack(req, res, {
                [tokenId]: {
                    id: tokenId,
                    name,
                    s: 1
                }
            })
            if (!message) {
                token = 1;
            }
        }
        // 创建银两 队伍100000 其他5000000
        const sumeTael = type === 3 ? 100000 : 5000000;
        // 令牌不足，使用银两创建
        if (!token && tael < sumeTael) {
            res.send({
                code: 0,
                message: `银两不足${sumeTael}`
            })
            return;
        }
        const compose = [{ id: role_id, name: role_name, level: 1 }];
        // 势力id
        const soci_id = `${new Date().getTime()}_${RegionG.getRegionNum(req)}`;
        const data = {
            name,
            level: 1,
            compose: JSON.stringify(compose),
            text: text || '',
            type,
            soci_id,
            apply: '[]',
            exp: '0/10000'
        }
        await SocializeSql.asyncCreateSocialize(data)
        // 没有令牌消耗银两，反之消耗令牌
        if (!token) {
            KnapsackG.updateknapsackGlobal(req, res, {
                tael: tael - sumeTael
            })
        }
        RoleG.updataRoleGlobal(req, res, {
            socialize_pool: {
                ...socialize_pool,
                [TYPE_MEUN_NAME[type]]: {
                    id: soci_id,
                    name
                }
            }
        })
        res.send({
            code: 0,
            data: '创建成功'
        })
    }
}


