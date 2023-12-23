const { SocializeG } = require('../../global');
const { socializeFn, roleFn } = require('../../utils');

const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
module.exports = {
    /**
     * 成员管理
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {*} req.role_id 管理成员id
     * @param {*} req.chengLevel 成员调整的职位等级,-1:踢人
     */
    adjust: async function (req, res) {
        const { role_id, type, chengLevel } = req.body;
        if (!type || !role_id) {
            ErrorG.paramsError(res);
            return;
        }


        const { socialize_pool: mySocialize, role_id: roleId } = RoleG.getRoleGlobal(req, res);
        const sociKey = TYPE_MEUN_NAME[type];
        const { level, id } = mySocialize[sociKey];
        if ((type === 1 && level > 3) || (type === 2 && level > 2) || (type === 3 && level > 1) || (level !== 1 && level < chengLevel)) {
            res.send({
                code: 0,
                message: '你没有此权限。'
            })
            return;
        }

        // 获取帮会信息
        const socialize = await socializeFn.getSocialize(req, res, id, type);
        if (socialize) {
            const { socialize_pool: targSocialize } = await roleFn.getRoleInfo(req, res, { role_id });
            let { compose } = socialize;
            // 踢人操作
            if (chengLevel === -1) {
                if (role_id === roleId) {
                    res.send({
                        code: 0,
                        message: '无法踢自己。'
                    })
                    return;
                }
                const index = compose.findIndex(({ id }) => id === role_id);
                const { level: tLevel } = compose[index];

                if (level >= tLevel) {
                    res.send({
                        code: 0,
                        message: '权限不足！'
                    })
                    return;
                }
                compose.splice(index, 1);
                // 删除角色势力信息
                delete targSocialize[sociKey];
                // 更新角色信息
                roleFn.updataRoleInfo(req, res, { socialize_pool: targSocialize }, role_id);
            } else {
                let num = 0;
                compose.forEach(({ level }) => level === chengLevel && (num += 1))
                // 帮会操作
                if (type === 1) {
                    if (chengLevel === 2 && num >= 1) {
                        res.send({
                            code: 0,
                            message: '副帮主只能任命1名玩家。'
                        })
                        return;
                    }

                    if (chengLevel === 3 && num >= 3) {
                        res.send({
                            code: 0,
                            message: '长老只能任命3名玩家。'
                        })
                        return;
                    }
                    if (chengLevel === 4 && num >= 15) {
                        res.send({
                            code: 0,
                            message: '精英只能任命15名玩家。'
                        })
                        return;
                    }
                }
                if (type === 2) {
                    if (chengLevel === 2 && num >= 1) {
                        res.send({
                            code: 0,
                            message: '副庄主只能任命1名玩家。'
                        })
                        return;
                    }
                    if (chengLevel === 4 && num >= 9) {
                        res.send({
                            code: 0,
                            message: '精英只能任命9名玩家。'
                        })
                        return;
                    }
                }

                compose = compose.map((itme) => ({
                    ...itme,
                    level: itme.id === role_id ? chengLevel : itme.level
                }))
            }

            // 更新帮会信息
            await socializeFn.updataSocialize(req, res, id, type, { compose });
            const { line = {} } = SocializeG.getSocializeGlobal(req, res, sociKey) || {};
            res.send({
                code: 0,
                data: compose.map(itme => {
                    return {
                        ...itme,
                        line: line[itme.id]
                    }
                })
            })

        }
    }
}