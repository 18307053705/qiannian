const express = require("express");
const Global = require("../global");
const roleFn = require("../utils/roleFn");
const knapsackFn = require("../utils/knapsackFn");
const KnapsackTable = require("../table/knapsack");
const effect1Table = require("../table/effect1");
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
        const { equip_pool: equipPool } = Global.getRoleGlobal(req);
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
    const { data } = Global.getknapsackGlobal(req);
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

// 物品操作：type 1使用，2出库，3入库，4出售, 5购买{考虑是否实现},  
router.post("/operate", async (req, res) => {
    const { id, in_x, s, p, type, posKey } = req.body;
    const role = Global.getRoleGlobal(req);
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
        // 消耗对应物品
        if ([1, 2, 4].includes(p)) {
            data[in_x]['s'] -= s;
            if (!data[in_x]['s']) {
                data.splice(in_x, 1);
            }
            Global.updateknapsackGlobal(req, {
                data,
            })
        } else {
            message = '该物品无法直接使用。';
        }

        // 恢复品与卷轴声望积分等
        if (p === 1 || p === 4) {
            const { life, mana, role_integral } = role;
            const update = {
                1: { life, mana },
                4: { ...role_integral }
            }
            const { effect1 } = KnapsackTable[id];
            const [key, type, value] = effect1.split('-');
            effect1Table.effect1Add([key, type, value * s].join('-'), update[p]);
            Global.updateRoleGlobal(req, p === 1 ? update[1] : { role_integral: update[4] });
        }
        // buff物品
        if (p === 2) {
            message = ''
            let { attr, vip } = role.role_buff;
            const { effect1, vip: vipKey } = KnapsackTable[id];
            if (effect1) {
                let add = true;
                attr = attr.map((itme) => {
                    if (itme.e === effect1) {
                        itme.d = itme.d + DateTitme * s;
                        add = false;
                    }
                    return itme;
                })
                if (add) {
                    attr.push(({
                        e: effect1,
                        d: DateTitme * s + new Date() * 1
                    }))
                }

            }
            if (vipKey) {
                if (vip[vipKey]) {
                    vip[vipKey]['d'] + DateTitme * s
                } else {
                    vip[vipKey] = {
                        d: DateTitme * s + new Date() * 1
                    }
                }
            }
            Global.updateRoleGlobal(req, {
                role_buff: {
                    attr,
                    vip
                }
            });
        }
        // 装备
        if (p === 3) {
            message = ''
            const { ext, n } = data[in_x];
            const { equip_pool: equipPool, role_attr, role_level } = role;
            const { level } = Equip[id];
            if (role_level < level) {
                res.send({
                    code: 0,
                    data: {
                        list: data,
                        tael: tael,
                        yuanbao: yuanbao
                    },
                    message: `等级不足,无法该佩戴${n}`
                })
                return;
            }
            const { addition } = role_attr;
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

            Global.updateknapsackGlobal(req, { data });
            Global.updateRoleGlobal(req, {
                role_attr,
                equip_pool: equipPool
            });
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
                        if (addNum + itme.s > KnapsackTable.Maxs) {
                            itme.s = KnapsackTable.Maxs;
                            addNum = addNum + itme.s - KnapsackTable.Maxs;
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
            Global.updateknapsackGlobal(req, { data });
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
                        if (addNum + itme.s > KnapsackTable.Maxs) {
                            itme.s = KnapsackTable.Maxs;
                            addNum = addNum + itme.s - KnapsackTable.Maxs;
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
            message = '背包已满,无法继续取出物品';
        }
        if (!message) {
            Global.updateknapsackGlobal(req, { data: knaData });
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
    // 购买
    if (type === 5) {
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
