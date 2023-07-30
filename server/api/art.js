const express = require("express");
const router = new express.Router();
const Global = require("../global/index2");
const ArtTable = require("../table/art");
const KnapsackTable = require("../table/knapsack");
const artFn = require("../utils/artFn");
const knapsackFn = require("../utils/knapsackFn");

// const 
router.post("/list", (req, res) => {
    const { skill_pool, role_career, role_level } = Global.getRoleGlobal(req);
    let { art } = skill_pool;
    if (!art || JSON.stringify(art) === '{}') {
        art = {};
        const artIds = ArtTable.getCareerArts(role_career);
        artIds.forEach((id) => {
            const { p, n, t, v, d } = ArtTable[id];
            const itme = {
                id,
                p,
                n,
                l: -1,
                r: 0,
                v,
                d
            }
            if (p === 2 || p === 3) {
                itme['t'] = t;
            }
            if (p === 3 || p === 4) {
                itme['v'] = {};
                Object.keys(v).forEach(key => {
                    itme['v'][key] = v[key];
                })

            }
            art[id] = itme;
        });
        Global.updateRoleGlobal(req, {
            skill_pool: {
                ...skill_pool,
                art
            }
        });
    }

    res.send({
        code: 0,
        data: {
            art,
            role_level
        }
    })
});

router.post("/detail", (req, res) => {
    const { id } = req.body;
    const { skill_pool } = Global.getRoleGlobal(req);
    const { art } = skill_pool;
    if (!art[id]) {
        res.send({
            code: 100007,
            data: '参数有误'
        })
        return false;
    }
    const { r, p, e = {}, v, t } = art[id];
    const { msg } = ArtTable[id];
    let str = '';
    if (p === 1) {

        str = msg.replace('&[v]&', v).replace('&[e]&', e['atk'] || e['suck'] || e['ignore'] || 10);
        if (r > 3) {
            str = str.replace('四转可领悟', '并');
        }
    }
    if (p === 2) {
        // msg: '对&[t]&个目标目标造成&[v]&%伤害。'
        str = msg.replace('&[t]&', t).replace('&[v]&', v);
        if (r > 3) {
            str = str.replace('四转后可增加攻击目标', `额外增加${t - 2}个攻击目标`);
        }
    }

    if (p === 3) {
        // '本次战斗提升&[v]&攻击与&[v]&暴击,持续&[t]&回合。'
        str = msg;
        Object.keys(v).forEach((key) => {
            str = str.replace('&[v]&', v[key]);
        })
        str = str.replace('&[t]&', t);
    }
    if (p === 4) {
        // msg: '永久提升&[v]&暴击上限。'
        str = msg;
        Object.keys(v).forEach((key) => {
            str = str.replace('&[v]&', v[key]);
        })
    }

    res.send({
        code: 0,
        data: {
            ...art[id],
            msg: str
        }
    })
});

router.post("/up", (req, res) => {
    const { id } = req.body;
    const { skill_pool, role_level } = Global.getRoleGlobal(req);
    const { art } = skill_pool;
    if (!art[id]) {
        res.send({
            code: 100007,
            data: '参数有误'
        })
        return false;
    }

    const { l } = art[id];
    const artInfo = ArtTable[id];
    // 领悟技能
    if (l === -1) {
        if (artInfo.condition > role_level) {
            res.send({
                code: 0,
                data: '',
                message: '等级不足，无法领悟该技能'
            })
            return false;
        }
        const data = artFn.artUpComputeAttr(req, art[id], { l: 0, r: 0 });
        res.send({
            code: 0,
            data,
        })
        return;
    }
    const { up_art, message } = artFn.getMaterial(req,art[id]);
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    const art_list = artFn.artUpComputeAttr(req, art[id], { l: up_art.l, r: up_art.r });
    res.send({
        code: 0,
        data: art_list
    })
});

module.exports = router;
