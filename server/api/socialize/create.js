const { ruleFn } = require('../../utils');

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
    1: 59, // 帮会创建令
    2: 60, // 庄园创建令
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
        if(socialize_pool[sociKey]){
            res.send({
                code: 0,
                message: `你已经加入了${TYPE_MEUN[type]}`
            })
            return;
        }
        const { results } = await res.asyncQuery(`select * from socialize  where name="${name}" and type=${type} `);
        if (results[0]) {
            res.send({
                code: 0,
                message: `已经存在该${TYPE_MEUN[type]}`
            })
            return;
        }
        
       

        let { tael, data } = KnapsackG.getknapsackGlobal(req, res);
        // 获取对应创建令ID
        const tokenId = TOKEN_ID_MEUN[type];
        let token = 0;
        const chengData = [];
        // 队伍不需要创建令
        if (tokenId) {
            data.forEach((itme) => {
                if (itme.id === tokenId && itme.p === 5) {
                    itme.s -= 1;
                    token = 1;
                    if (!itme.s) {
                        return;
                    }
                }
                chengData.push(itme);
            })
        }
        // 创建银两 队伍100000 其他5000000
        const sumeTael = type === 3 ? 100000 : 5000000;
        // 没有令牌则扣除银两
        if (!token) {
            if (tael < sumeTael) {
                res.send({
                    code: 0,
                    message: `银两不足${sumeTael}`
                })
                return;
            }
        }

      
        const compose = [{ id: role_id, name: role_name, level: 1 }];
        const sqlStr = "insert into socialize(name,level,compose,text,type,soci_id,apply,exp) values(?,?,?,?,?,?,?,?)";
        const sqlData = [name, 1, JSON.stringify(compose), text || '', type, role_id, '[]', '0/10000'];
        await res.asyncAdd(sqlStr, sqlData)
        // 没有令牌消耗银两，反之消耗令牌
        if (!token) {
            KnapsackG.updateknapsackGlobal(req, res, {
                tael: tael - sumeTael
            })
        } else {
            KnapsackG.updateknapsackGlobal(req, res, {
                data: chengData
            })
        }
        RoleG.updataRoleGlobal(req, res, {
            socialize_pool: {
                ...socialize_pool,
                [TYPE_MEUN_NAME[type]]: {
                    id: role_id,
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


