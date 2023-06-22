const express = require("express");
const formFn = require("../utils/formFn");
const knapsackFn = require("../utils/knapsackFn");
const router = new express.Router();
const Global = require("../global");
const Equip = require("../table/equip");
const knapsackTable = require("../table/knapsack");
// id: string;
// in_x: number;
// kanapsackType: 1 | 2; // 背包 身上
// 改名
router.post("/rename", (req, res) => {
    const { id, in_x, kanapsackType, name } = req.body;
    if (!id && in_x === undefined && !kanapsackType && name) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    // 校验名字是否合法
    if (!formFn.checkName(name)) {
        return;
    }

    // 装备在身上
    if (kanapsackType === 2) {
        const { equip_pool } = Global.getRoleGlobal(req);
        // 对应部位装备
        const equip = equip_pool[Equip.EQUIP_ATTR[in_x]['pos']];
        if (equip) {
            const { ext } = equip;
            const [firm, forge] = ext.split('_');
            let message = '';
            let success = '';
            if (firm == 16 && forge == 50) {
                equip_pool[Equip.EQUIP_ATTR[in_x]['pos']]['name'] = name;
                Global.updateRoleGlobal(req, { equip_pool });
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
        }
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    if (data[in_x] && data[in_x]['id'] === id && data[in_x]['p'] === 3) {
        let success = '';
        let message = '';
        const { ext } = data[in_x];
        const [firm, forge] = ext.split('_');
        if (firm === 16 && forge === 50) {
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
    }


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
            rate
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
            rate
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
    if (article) {
        const { message, data: chengData } = knapsackFn.deleteKnapsack(req, article);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        Global.updateknapsackGlobal(req, { data: chengData });
    }

    if (exp) {
        const { role_exp } = Global.getRoleGlobal(req);
        const [c_exp, u_exp] = role_exp.split('/');
        if (c_exp < exp) {
            res.send({
                code: 0,
                message: '经验不足'
            })
            return;
        }
        Global.updateknapsackGlobal(req, { role_exp: `${c_exp - exp}/${u_exp}` });
    }



    let isOk = rate === 100 || Math.floor(Math.random() * (100 - 1)) + 1 > rate;
    firm = isOk ? firm + 1 : firm - 1;
    const ext = [firm, ...exts].join('_');
    // 更新强化等级
    data[in_x]['ext'] = ext;
    Global.updateknapsackGlobal(req, { data });
    res.send({
        code: 0,
        data: ext,
        success: isOk ? '强化成功' : '强化失败'
    })
});

// 锻造
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
    const { level } = Equip[id];
    // let 
    if (level)

        const [firm, forge, ...exts] = equip['ext'].split('_');

    if (firm == 16 && forge == 50 || firm != 16 && forge == 20) {
        res.send({
            code: 0,
            message: '锻造已到最大级,无法继续锻造.'
        })
        return;
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
    const { level } = Equip[id];
    // let 
    if (level)

        const [firm, forge, ...exts] = equip['ext'].split('_');

    if (firm == 16 && forge == 50 || firm != 16 && forge == 20) {
        res.send({
            code: 0,
            message: '锻造已到最大级,无法继续锻造.'
        })
        return;
    }
});

// 操作：type ：1使用 2：卸下
router.post("/active", (req, res) => {
    const { id, in_x, type } = req.body;
    if (!id && in_x === undefined && type) {
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



});




module.exports = router;

