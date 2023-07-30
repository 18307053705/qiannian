const express = require("express");
const formFn = require("../utils/formFn");
const knapsackFn = require("../utils/knapsackFn");
const router = new express.Router();
const Global = require("../global/index2");
const Equip = require("../table/equip");
const knapsackTable = require("../table/knapsack");
// id: string;
// in_x: number;
// kanapsackType: 1 | 2; // 背包 身上
// 改名
router.post("/rename", (req, res) => {
    const { id, in_x } = req.body;
    if (!id && in_x === undefined) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const equip = data[in_x] || {};

    if (!(equip['id'] === id && equip['p'] === 3)) {
        return;
    }
    // 校验名字是否合法
    if (!formFn.checkName(name, res)) {
        return;
    }

    const { ext } = equip;
    const [firm, forge] = ext.split('_');
    let message = '';
    let success = '';
    if (firm == 16 && forge == 50) {
        data[in_x]['n'] = name;
        Global.updateknapsackGlobal(req, { data });
        success = '装备改名成功.';
    } else {
        message = '不满足改名条件。'
    }
    res.send({
        code: 0,
        data: name,
        message,
        success
    })


});


const materialIdMap = {
    // 强化卡初始id 90-105 1-16
    1: function (firm) {
        const id = 90 + firm;
        return {
            article: {
                [id]: {
                    ...knapsackTable[90 + firm],
                    s: 1
                }
            },
            rate: 100

        }
    },
    2: function (firm) {
        const s = 2 ** firm;
        return {
            article: {
                [157]: {
                    ...knapsackTable[157],
                    s
                }
            },
            rate: 100
        }
    },
    3: function (firm) {
        const s = firm < 11 ? 2 ** firm : 512 * firm;
        const upFirm = firm + 1;
        let rate = 100 - upFirm * 10;
        if (upFirm > 7) {
            rate -= (upFirm - 5) * 5;
        }
        if (upFirm > 12) {
            rate = 5 - (upFirm - 12)
        }
        return {
            article: {
                [156]: {
                    ...knapsackTable[156],
                    s
                }
            },
            rate: upFirm == 1 ? 100 : rate
        }
    },
    4: function (firm) {
        const exp = 75000000 + 75000000 * firm / 2;
        const upFirm = firm + 1;
        let rate = 100 - upFirm * 10;
        if (upFirm > 7) {
            rate -= (upFirm - 5) * 5;
        }
        if (upFirm > 12) {
            rate = 5 - (upFirm - 12)
        }
        return {
            exp,
            rate: upFirm == 1 ? 100 : rate
        }
    },

}

// 强化 materialtype: 1 | 2 | 3 | 4; // 强化卡 月光石 强化石 经验
router.post("/firm", (req, res) => {
    const { id, in_x, materialtype } = req.body;
    if (!id && in_x === undefined && materialtype) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const equip = data[in_x] || {};

    if (!(equip['id'] === id && equip['p'] === 3)) {
        return;
    }
    const [firm_s, ...exts] = equip['ext'].split('_');

    if (firm_s == 16) {
        res.send({
            code: 0,
            message: '强化已到最大级,无法继续强化.'
        })
        return;
    }
    let firm = Number(firm_s);
    const { exp, article, rate } = materialIdMap[materialtype](firm);
    let isFirm = false;
    let result = {
        data,
        delInx: []
    };
    if (article) {
        isFirm = true;
        const { message, data: chengData, delInx } = knapsackFn.deleteKnapsack(req, article);
        if (message) {
            res.send({
                code: 0,
                message: message
            })
            return;
        }
        result = {
            data: chengData,
            delInx
        }
    }

    if (exp) {
        isFirm = true;
        const { role_exp } = Global.getRoleGlobal(req);
        const [c_exp, u_exp] = role_exp.split('/');
        if (c_exp < exp) {
            res.send({
                code: 0,
                message: '经验不足'
            })
            return;
        }
        Global.updateRoleGlobal(req, { role_exp: `${c_exp - exp}/${u_exp}` });
    }

    if (isFirm) {
        let num = Math.floor(Math.random() * (100 - 0)) + 1;
        let isOk = rate === 100 || rate >= num;
        firm = isOk ? firm + 1 : firm - 1;
        const ext = [firm, ...exts].join('_');
        const { delInx, data: newData } = result;
        let index = in_x;
        // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
        index -= delInx.filter((del_x) => del_x < in_x).length
        // 更新强化等级
        newData[index]['ext'] = ext;
        Global.updateknapsackGlobal(req, { data: newData });
        res.send({
            code: 0,
            data: index,
            text: isOk ? '强化成功' : '强化失败',
        })
    }


});

// 锻造
// materialtype 1 石头 2 元宝
router.post("/forge", (req, res) => {
    const { id, in_x, materialtype } = req.body;
    if (!id && in_x === undefined && materialtype) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const equip = data[in_x] || {};

    if (!(equip['id'] === id && equip['p'] === 3)) {
        return;
    }
    const [firm, forge, ...exts] = equip['ext'].split('_');
    if (firm == 16 && forge == 50 || firm != 16 && forge == 20) {
        res.send({
            code: 0,
            message: '锻造已到最大级,无法继续锻造.'
        })
        return;
    }
    let isForge = false;
    const { level, career } = Equip[id];
    let materialId = [106, 106, 110, 114][career];
    let y_b = 20;
    if (level > 35) {
        materialId = [107, 107, 111, 115][career];
        y_b = 50;
    }
    if (level > 69) {
        materialId = [108, 108, 112, 116][career];
        y_b = 100;
    }
    if (level > 74) {
        materialId = [109, 109, 113, 117][career];
        y_b = 200;
    }
    let result = {
        data,
        delInx: []
    };
    if (materialtype === 1) {
        isForge = true;
        const { message, data: chengData, delInx } = knapsackFn.deleteKnapsack(req, {
            [materialId]: {
                ...knapsackTable[materialId],
                s: 1
            }
        });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        result = {
            data: chengData,
            delInx
        }
    }
    if (materialtype === 2) {
        isForge = true;
        const { yuanbao } = Global.getknapsackGlobal(req);
        if (y_b > yuanbao) {
            res.send({
                code: 0,
                message: '元宝不足'
            })
            return;
        }
        Global.updateknapsackGlobal(req, { yuanbao: yuanbao - y_b });
    }

    if (isForge) {
        const ext = [firm, Number(forge) + 1, ...exts].join('_');
        const { delInx, data: newData } = result;
        let index = in_x;
        // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
        index -= delInx.filter((del_x) => del_x < in_x).length
        // 更新锻造等级
        newData[index]['ext'] = ext;
        Global.updateknapsackGlobal(req, { data: newData });
        res.send({
            code: 0,
            data: index,
            text: '锻造成功'
        })
    }
});


// 附魔
router.post("/sigil", (req, res) => {
    const { id, in_x } = req.body;
    if (!id && in_x === undefined) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const equip = data[in_x] || {};

    if (!(equip['id'] === id && equip['p'] === 3)) {
        return;
    }
    const [firm, forge, sigilStr, ...exts] = equip['ext'].split('_');
    const sigil = Number(sigilStr);
    if (sigil == 9) {
        res.send({
            code: 0,
            message: '附魔已到最大级,无法继续附魔.'
        })
        return;
    }

    let materialId = 147 + sigil;
    const { message, data: newData, delInx } = knapsackFn.deleteKnapsack(req, {
        [materialId]: {
            ...knapsackTable[materialId],
            s: 1
        }
    });
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    const ext = [firm, forge, sigil + 1, ...exts].join('_');
    let index = in_x;
    // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
    index -= delInx.filter((del_x) => del_x < in_x).length
    // 更新锻造等级
    newData[index]['ext'] = ext;
    Global.updateknapsackGlobal(req, { data: newData });
    res.send({
        code: 0,
        data: index,
        text: '附魔成功'
    })

});

//卸下
router.post("/active", (req, res) => {
    const { id, in_x } = req.body;
    if (!id && !in_x) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { equip_pool, role_attr } = Global.getRoleGlobal(req);
    const { data } = Global.getknapsackGlobal(req);
    // 对应部位装备
    const equip = equip_pool[Equip.EQUIP_ATTR[in_x]['pos']];
    let message = '未找到装备';
    if (equip) {
        delete equip_pool[Equip.EQUIP_ATTR[in_x]['pos']];
        const { id, ext } = equip;
        // 背包增加物品
        message = knapsackFn.addKnapsack({
            equipReward: {
                [id]: equip
            }
        }, data)
        if (message) {
            res.send({
                code: 0,
                data: '',
                message
            })
            return;
        }
        // 计算属性
        const equipInfo = Equip.computeAttr(Equip[id], ext);
        const dleAttr = equipInfo.attr;
        const { addition } = role_attr;
        Object.keys(dleAttr).forEach(key => {
            addition[key] -= dleAttr[key];
        })
        Global.updateRoleGlobal(req, { equip_pool, role_attr });
        Global.updateknapsackGlobal(req, { data });
    }
    res.send({
        code: 0,
        data: '',
        message
    })
});




module.exports = router;

