const express = require("express");
const roleFn = require("../utils/roleFn");
const knapsackFn = require("../utils/knapsackFn");
const KnapsackTable = require("../table/knapsack");
const Equip = require("../table/equip");
const router = new express.Router();

router.post("/getKnapsack", async (req, res) => {
    const result = await roleFn.getKnapsack(req);
    res.send({
        code: 0,
        data: {
            list: JSON.parse(result.data),
            tael: result.tael,
            yuanbao: result.yuanbao
        }
    })
});

router.post("/operate", async (req, res) => {
    const { id, in_x, s, p, type, } = req.body;
    if (!id || in_x === undefined || !s || !p || !type) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const role = await roleFn.getRoleInfo(req, res);
    const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    // 验证物品信息
    if (!knapsackFn.chekeArticle(req, data)) {
        res.send({
            code: 100005,
            message: '使用物品有误'
        })
        return;
    }
    // 使用
    if (type === 1) {
        // 恢复品
        if (p === 1) {
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
        // buff
        if (p === 2) {

        }
        // 装备
        if (p === 3) {
            const { ext, n } = data[in_x];
            const equipInfo = Equip.computeAttr(Equip[id], ext);
            const equipPool = JSON.parse(role.equip_pool);
            const addition = JSON.parse(role.addition_pool);
            const addAttr = equipInfo.attr;
            if (equipPool[equipInfo.posName]) {
                const oldEquip = equipPool[equipInfo.posName];
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
            //    
            equipPool[equipInfo.posName] = {
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
    }

    res.send({
        code: 0,
        data: {
            list: data,
            tael: tael,
            yuanbao: yuanbao
        }
    })
});

module.exports = router;
