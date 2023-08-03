const express = require("express");
const mysql = require("../mysql");
const Global = require("../global/index2");
const { RoleG } = require("../global");
const roleFn = require("../utils/roleFn");
const socializeFn = require("../utils/socializeFn");
const knapsackTable = require("../table/knapsack");
const router = new express.Router();

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

// 创建势力
router.post("/create", async (req, res) => {
    const { type, name, text } = req.body;
    if (!type || !name) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { results } = await mysql.asyncQuery(`select * from socialize  where name="${name}" and type=${type} `);
    if (results[0]) {
        res.send({
            code: 0,
            message: `已经存在该${TYPE_MEUN[type]}`
        })
        return;
    }
    let { tael, data } = Global.getknapsackGlobal(req);
    let tokenId = type === 1 ? 59 : 60;
    let token = 0;
    const chengData = [];
    if (type !== 3) {
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

    const { role_id, role_name, socialize_pool } = Global.getRoleGlobal(req);
    const compose = [{ id: role_id, name: role_name, level: 1 }];
    const petSql = "insert into socialize(name,level,compose,text,type,soci_id,apply,exp) values(?,?,?,?,?,?,?,?)";
    const petData = [name, 1, JSON.stringify(compose), text || '', type, role_id, '[]', '0/10000'];
    await mysql.asyncAdd(petSql, petData);
    // 没有令牌消耗银两，反之消耗令牌
    if (!token) {
        Global.updateknapsackGlobal(req, res, {
            tael: tael - sumeTael
        })
    } else {
        Global.updateknapsackGlobal(req, {
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
});

// 获取势力列表
router.post("/list", async (req, res) => {
    const { type } = req.body;
    const { results } = await mysql.asyncQuery(`select * from socialize  where type="${type}"`);
    res.send({
        code: 0,
        data: results
    })
});

// 获取势力详情
router.post("/detail", async (req, res) => {
    let { type } = req.body;
    if (!type) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { socialize_pool, role_id } = Global.getRoleGlobal(req);
    const keyName = TYPE_MEUN_NAME[type];
    const itme = socialize_pool[keyName];
    if (!itme) {
        res.send({
            code: 0,
            data: ''
        })
        return;
    }
    const id = socialize_pool[keyName].id
    // 获取帮会信息
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        let { compose } = socialize;
        const { line = {} } = Global.getSocializeGlobal(req, res, "ranks", keyName) || {};
        compose = compose.map(itme => {
            return {
                ...itme,
                line: line[itme.id],
                isRole: itme.id === role_id
            }
        })
        const soci = compose.find((itme) => itme.id === role_id);
        socialize_pool[TYPE_MEUN_NAME[type]]['level'] = soci.level;
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
    if (id) {
        delete socialize_pool[TYPE_MEUN_NAME[type]];
        Global.updateRoleGlobal(req, {
            socialize_pool
        })
        res.send({
            code: 0,
            data: ''
        });
    }

});

// 加入势力
router.post("/apply", async (req, res) => {
    const { id, type } = req.body;
    if (!(id && type)) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { role_name, role_id } = Global.getRoleGlobal(req);
    // 获取帮会信息
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        const role_c = socialize.compose.find(({ id }) => id === role_id);
        const role_a = socialize.apply.find(({ id }) => id === role_id);
        if (role_c || role_a) {
            res.send({
                code: 0,
                message: `已申请过该${TYPE_MEUN[type]},无法重复申请。`
            })
            return;
        }
        socialize.apply.push({ id: role_id, name: role_name });
        await socializeFn.updataSocialize(id, type, { apply: socialize.apply })
        res.send({
            code: 0,
            data: '申请成功'
        })
    }
});

// 加入势力处理
router.post("/active", async (req, res) => {
    const { role_id, type, state } = req.body;
    if (!(role_id && type)) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }

    const { socialize_pool: mySocialize } = Global.getRoleGlobal(req);
    const { level, id } = mySocialize[TYPE_MEUN_NAME[type]];
    if ((type === 1 && level > 3) || (type === 2 && level > 2) || (type === 3 && level > 1)) {
        res.send({
            code: 0,
            message: '你没有此权限。'
        })
        return;
    }

    // 获取帮会信息
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        const { socialize_pool: targSocialize, role_name } = await roleFn.getRoleInfo(req, role_id);
        const { apply, compose } = socialize;
        const role_a = apply.filter(({ id }) => id !== role_id);
        // 判断是否加入了其他势力
        if (targSocialize[TYPE_MEUN_NAME[type]]) {
            await socializeFn.updataSocialize(id, type, { apply: role_a })
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
            targSocialize[TYPE_MEUN_NAME[type]] = {
                id: socialize['soci_id'],
                name: socialize['name'],
                level: 5
            }
            // 更新角色信息
            roleFn.updateRoleInfo(req, {
                socialize_pool: targSocialize
            }, role_id)
        }
        // 更新帮会信息
        await socializeFn.updataSocialize(id, type, { apply: role_a, compose });
        res.send({
            code: 0,
            data: role_a
        })

    }

});

// 人员处理 chengLevel:-1踢
router.post("/adjust", async (req, res) => {
    const { role_id, type, chengLevel } = req.body;
    if (!(role_id && type && chengLevel)) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }

    const { socialize_pool: mySocialize, role_id: roleId } = Global.getRoleGlobal(req);
    const keyName = TYPE_MEUN_NAME[type];
    const { level, id } = mySocialize[keyName];
    if ((type === 1 && level > 3) || (type === 2 && level > 2) || (type === 3 && level > 1) || (level !== 1 && level < chengLevel)) {
        res.send({
            code: 0,
            message: '你没有此权限。'
        })
        return;
    }

    // 获取帮会信息
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        const { socialize_pool: targSocialize } = await roleFn.getRoleInfo(req, role_id);
        let { compose } = socialize;
        // 踢人操作
        if (chengLevel === -1) {
            if (role_id === roleId) {
                res.send({
                    code: 0,
                    message: '你没有此权限。'
                })
                return;
            }
            compose = compose.filter(({ id }) => id !== role_id);
            // 删除角色势力信息
            delete targSocialize[keyName];
            // 更新角色信息
            roleFn.updateRoleInfo(req, {
                socialize_pool: targSocialize
            }, role_id)
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
        await socializeFn.updataSocialize(id, type, { compose });
        const { line = {} } = Global.getSocializeGlobal(req, res, socialize.soci_id, keyName) || {};
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

});

// 退出势力
router.post("/exit", async (req, res) => {
    const { type } = req.body;
    if (!type) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { socialize_pool, role_id } = Global.getRoleGlobal(req);
    const typeName = TYPE_MEUN_NAME[type];
    const { id, level } = socialize_pool[typeName];
    // 获取帮会信息
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        delete socialize_pool[typeName];
        Global.updateRoleGlobal(req, { socialize_pool });
        // 等级1操作即为解散操作
        if (level === 1) {
            await mysql.asyncQuery(`delete from socialize  where soci_id="${id}" and type=${type}`);
            res.send({
                code: 0,
                data: '成功退出！'
            })
            return;
        }
        // 其他则自身退出即可
        const compose = socialize.compose.filter(({ id }) => id !== role_id);
        await socializeFn.updataSocialize(id, type, { compose });
        res.send({
            code: 0,
            data: '成功退出！'
        })
    }
});

const MATERIAL_MEUN = {
    1: [53, 54, 55, 56, 57, 58, 59]
}

// 捐赠材料
router.post("/material", async (req, res) => {
    const { type, materialId, materialNum } = req.body;
    const materialIdList = MATERIAL_MEUN[type] || [];
    if (!(
        (type === 1)
        && (materialIdList.includes(materialId) || materialId === 'all' || materialId === -1)
        && materialNum >= 0)) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }

    // 开始捐赠计算
    let { data, tael } = Global.getknapsackGlobal(req);
    // 获取全局角色信息
    const { reputation_pool, socialize_pool } = Global.getRoleGlobal(req);
    // 计算帮会贡献
    const typeText = type === 1 ? '帮会' : '结义';
    // 贡献点
    let proffer = 0;
    // 错误信息
    let message = '';
    // 结果信息
    const text = [];
    // materialId -1 捐献银两
    if (materialId === -1) {
        if (tael < materialNum) {
            message = `银两不足${materialNum}`;
        } else {
            tael -= materialNum;
            // 每100000银两可获得1点贡献与声望
            proffer = parseInt(materialNum / 100000);
            text.push(`捐献${materialNum}银两，获得${typeText}贡献${proffer * 10}点,个人${typeText}声望${proffer}点`);
        }
    }
    // 剩余材料
    const material = {};
    // 消耗材料列表
    const materialList = [];
    // 消耗材料后的背包
    if (materialId === 'all') {
        data = data.filter(({ id, p, s, n }) => {
            if (materialIdList.includes(id) && p === 5) {
                materialList.push({ id, s, n })
                return false;
            }
            return true;
        })
    }

    if (materialIdList.includes(materialId)) {
        let chengData = [];
        data.forEach(({ id, p, s, ...itme }) => {
            if (materialIdList.includes(id) && p === 5) {
                material[id] = s;
                // 判断是否为当前捐赠材料
                if (id === materialId) {
                    // 判断背包是否有足够的捐赠材料,并记录材料
                    if (s >= materialNum) {
                        chengData.push({
                            id,
                            p,
                            s: s - materialNum,
                            ...itme
                        })
                        materialList.push({ id, s: materialNum, n: itme.n });
                        material[id] = s - materialNum;
                        return;
                    } else {
                        message = `捐赠失败,${itme.n}不足${materialNum}。`
                    }
                }
            }
            chengData.push({
                id,
                p,
                s,
                ...itme
            })

        })
        data = chengData;
    }
    // 判断是否存在错误信息
    if (message) {
        res.send({
            code: 0,
            message: message
        });
        return;
    }
    // 更新全局背包信息
    Global.updateknapsackGlobal(req, { data, tael });
    materialList.forEach(({ id, s, n }) => {
        const { value } = knapsackTable[id];
        proffer += value * s;
        text.push(`捐献${s}个${n}，获得${typeText}贡献${value * s * 10}点,个人${typeText}声望${value * s}点`);
    })

    // 获取帮会信息
    const { id } = socialize_pool[TYPE_MEUN_NAME[type]];
    const socialize = await socializeFn.getSocialize(id, type);
    if (socialize) {
        // 更新全局角色信息
        reputation_pool[TYPE_MEUN_NAME[type]] += proffer;
        Global.updateRoleGlobal(req, { reputation_pool });
        let { exp, level } = socialize;
        let [c_exp, up_exp] = exp.split('/');
        c_exp = Number(c_exp) + (proffer * 10);
        const updata = {};
        if (c_exp >= up_exp) {
            level++;
            c_exp -= up_exp;
            up_exp = 1000 * 10 ** level;
            updata = {
                level
            }
        }
        updata['exp'] = `${c_exp}/${up_exp}`;
        // 更新帮会信息
        await socializeFn.updataSocialize(id, type, updata);
    }
    res.send({
        code: 0,
        data: {
            list: material,
            text: text.join(',') + '。'
        }
    })



});

// 获取可捐赠材料
router.post("/getMaterial", async (req, res) => {
    const { type } = req.body;
    if (!type) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    if (type === 1) {
        const material = {};
        data.forEach(({ id, p, s }) => {
            MATERIAL_MEUN[1].includes(id) && p === 5 && (material[id] = s)
        })
        res.send({
            code: 0,
            data: material
        })
    }
});


module.exports = router;
