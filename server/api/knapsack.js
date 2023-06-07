const express = require("express");
const roleFn = require("../utils/roleFn");
const knapsackFn = require("../utils/knapsackFn");
const KnapsackTable = require("../table/knapsack");
const Equip = require("../table/equip");
const router = new express.Router();
// 两小时时间戳
const DateTitme = 1000 * 60 * 120;

// 获取背包信息
router.post("/getKnapsack", async (req, res) => {
    const { type } = req.body;
    const { data = [], tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    res.send({
        code: 0,
        data: {
            list: data,
            tael: tael,
            yuanbao: yuanbao
        }
    })
});
// 获取物品信息
router.post("/getDetail", async (req, res) => {
    const { id, in_x, p, posKey, type } = req.body;
    if (!id && !p && !(posKey || (type && in_x !== undefined))) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    // posKey
    // 人物装备详情
    if (posKey) {
        const role = await roleFn.getRoleInfo(req, res);
        const equipPool = JSON.parse(role.equip_pool);
        const { id, ext } = equipPool[posKey];
        const equip = Equip.getEquipTip(Equip[id], ext);
        res.send({
            code: 0,
            data: {
                equip: {
                    ...equip,
                    ...equipPool[posKey],
                    tips: Equip[id]['tips'],
                    n: equipPool[posKey]['name']
                }
            }
        })
        return;
    }
    const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    // 验证物品信息
    if (!knapsackFn.chekeArticle(req, { ...data, s: 1 })) {
        res.send({
            code: 100005,
            message: '物品有误信息'
        })
        return;
    }
    const { ext, s } = data[in_x];
    // 物品为装备
    if (p === 3) {
        const equip = Equip.getEquipTip(Equip[id], ext);
        res.send({
            code: 0,
            data: {
                equip: {
                    ...equip,
                    ...data[in_x],
                    tips: Equip[id]['tips']
                }
            }
        })
        return;
    }
    const article = {
        ...KnapsackTable[id],
        ...data[in_x],
    };
    res.send({
        code: 0,
        data: { article }
    })
});

// 获取装备列表
router.post("/equipList", async (req, res) => {
    const result = await roleFn.getKnapsack(req);
    const data = JSON.parse(result.data);
    const list = [];
    data.forEach(((itme, index) => {
        if (itme.p === 3 && Equip[itme.id]) {
            list.push({
                ...itme,
                in_x: index,
                pos: Equip[itme.id]['pos']
            })
        }
    }))
    res.send({
        code: 0,
        data: list
    })
});
// 物品操作：type 1使用，2出库，3入库，4出售,5购买{考虑是否实现},
router.post("/operate", async (req, res) => {
    const { id, in_x, s, p, type, posKey } = req.body;
    const role = await roleFn.getRoleInfo(req, res);
    const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    const msg = knapsackFn.chekeArticle(req, data);
    // 验证物品信息
    if (msg) {
        res.send({
            code: 100005,
            message: msg
        })
        return;
    }
    let message = '';
    // 使用
    if (type === 1) {
        message = '无法使用，请前往相应功能界面';
        // 恢复品
        if (p === 1) {
            message = ''
            const attr = {
                life: 0,
                mana: 0
            }
            const effect = KnapsackTable[id]['effect'];
            Object.keys(effect).forEach(key => {
                attr[key] += effect[key] * s;
            });
            data[in_x]['s'] -= s;

            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data) });
            await roleFn.updateRoleInfo(req, {
                life: role.life + attr.life,
                mana: role.mana + attr.mana,
            })
        }
        // buff丹药
        if (p === 2) {
            message = ''
            const buffPool = JSON.parse(role.buff_pool)
            const { pellet = {}, vip = {}, } = buffPool;
            const effect = KnapsackTable[id]['effect'];
            Object.keys(effect).forEach(key => {
                const { end, value } = pellet[key] || {};
                let residue = new Date() * 1;
                if (value === effect[key]) {
                    residue = end;
                }
                pellet[key] = {
                    end: residue + (s * DateTitme),
                    value: effect[key]
                };
            });
            data[in_x]['s'] -= s;
            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data) });
            await roleFn.updateRoleInfo(req, {
                buff_pool: JSON.stringify({
                    pellet,
                    vip
                })
            })
        }
        // 装备
        if (p === 3) {
            message = ''
            const { ext, n } = data[in_x];
            const equipPool = JSON.parse(role.equip_pool);
            const addition = JSON.parse(role.addition_pool);
            const equipInfo = Equip.computeAttr(Equip[id], ext);
            const addAttr = equipInfo.attr;
            const posName = posKey || equipInfo.posName;
            if (equipPool[posName]) {
                const oldEquip = equipPool[posName];
                const { attr: oldAttr } = Equip.computeAttr(Equip[oldEquip.id], oldEquip.ext);
                Object.keys(oldAttr).forEach(key => {
                    if (addAttr[key]) {
                        addAttr[key] -= oldAttr[key];
                    } else {
                        addAttr[key] = oldAttr[key] * -1
                    }
                })
                // 替换信息
                data[in_x]['id'] = oldEquip['id'];
                data[in_x]['n'] = oldEquip['name'];
                data[in_x]['ext'] = oldEquip['ext'];
            } else {
                data.splice(in_x, 1);
            }
            Object.keys(addAttr).forEach(key => {
                if (addition[key]) {
                    addition[key] += addAttr[key];
                } else {
                    addition[key] = addAttr[key];
                }
            })

            equipPool[posName] = {
                id,
                name: n,
                ext
            }
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data) });
            await roleFn.updateRoleInfo(req, {
                addition_pool: JSON.stringify(addition),
                equip_pool: JSON.stringify(equipPool)
            });
        }
        // 卷轴
        if (p === 4) {
            message = ''
            const buffPool = JSON.parse(role.buff_pool)
            const reputationPool = JSON.parse(role.reputation_pool)
            const { pellet = {}, vip = {}, } = buffPool;
            const { effect, reputation } = KnapsackTable[id];
            if (effect) {
                Object.keys(effect).forEach(key => {
                    const { end } = vip[key] || {};
                    let residue = new Date() * 1;
                    if (end) {
                        residue = end;
                    }
                    vip[key] = {
                        end: residue + (s * DateTitme)
                    };
                });
            }
            if (reputation) {
                Object.keys(reputation).forEach(key => {
                    let value = reputationPool[key] || 0;
                    reputationPool[key] = value + (reputation[key] * s)
                });
            }
            data[in_x]['s'] -= s;
            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data) });
            await roleFn.updateRoleInfo(req, {
                buff_pool: JSON.stringify({
                    pellet,
                    vip
                }),
                reputation_pool: JSON.stringify(reputationPool)
            })
        }

    }
    // 入库
    if (type === 2) {
        const { data: wareData } = await knapsackFn.getKnapsackInfo(req, 3);
        if (wareData.length < 200) {
            let addNum = s;
            let isAdd = true;
            if (p !== 3) {
                wareData.forEach((itme) => {
                    if (itme.id === id && itme.p === p) {
                        if (addNum + itme.s > 999999) {
                            itme.s = 999999;
                            addNum = addNum + itme.s - 999999;
                        } else {
                            itme.s += addNum;
                            isAdd = false;
                        }
                    }
                })
            }
            if (isAdd) {
                wareData.push({
                    ...data[in_x],
                    s: addNum
                })
            }
            data[in_x]['s'] -= s;

            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
        } else {
            message = '仓库已满,无法继续存入物品';
        }
        if (!message) {
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data) });
            await knapsackFn.updateWarehouse(req, { data: JSON.stringify(wareData) });
        }
    }
    // 出库
    if (type === 3) {
        const { data: knaData } = await knapsackFn.getKnapsackInfo(req, 1);
        if (knaData.length < 200) {
            let addNum = s;
            let isAdd = true;
            if (p !== 3) {
                knaData.forEach((itme) => {
                    if (itme.id === id && itme.p === p) {
                        if (addNum + itme.s > 999999) {
                            itme.s = 999999;
                            addNum = addNum + itme.s - 999999;
                        } else {
                            itme.s += addNum;
                            isAdd = false;
                        }
                    }
                })
            }
            if (isAdd) {
                knaData.push({
                    ...data[in_x],
                    s: addNum
                })
            }
            data[in_x]['s'] -= s;

            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
        } else {
            message = '仓库已满,无法继续存入物品';
        }
        if (!message) {
            await knapsackFn.updateKnapsack(req, { data: JSON.stringify(knaData) });
            await knapsackFn.updateWarehouse(req, { data: JSON.stringify(data) });
        }
    }
    // 出售
    if (type === 4) {
        const { sell } = KnapsackTable[id];
        if (sell && p !== 3) {
            data[in_x]['s'] -= s;
            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
            await knapsackFn.updateKnapsack(req, { tael: tael + (sell * s), data: JSON.stringify(data) });
        } else {
            message = '该物品无法出售';
        }
    }

    res.send({
        code: 0,
        message,
        data: {
            list: data,
            tael: tael,
            yuanbao: yuanbao
        }
    })
});




module.exports = router;
