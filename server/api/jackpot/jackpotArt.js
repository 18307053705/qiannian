const { RoleG, KnapsackG, ErrorG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn } = require('../../utils');
const moment = require('moment');

// 技能奖励池
const artPoolMap = {
    1: [67, 67, 68],
    2: [67, 67, 67, 70, 70, 71],
    3: [72, 72, 72, 73, 73, 74],
    4: [75, 75, 76],
    // 风云，逍遥，天地
    5: [77, 77, 77, 78, 78, 79],
    // 一转-四转
    6: [80, 80, 80, 80, 81, 81, 81, 82, 82, 83],
}

module.exports = {
    /**
     * 技能抽奖
     * @param type 1:世界声望 2:帮会声望 3:结义声望 4:元宝
     */
    jackpotArt: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const { gang, world, intersect } = role_integral;
        if (type === 1 && world < 199) {
            res.send({
                code: 0,
                message: '世界声望不足199'
            })
            return;
        }
        if (type === 2 && gang < 199) {
            res.send({
                code: 0,
                message: '帮会声望不足199'
            })
            return;
        }
        if (type === 3 && intersect < 199) {
            res.send({
                code: 0,
                message: '结义声望不足199'
            })
            return;
        }
        const { data, yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        if (type === 4 && yuanbao < 49) {
            res.send({
                code: 0,
                message: '元宝不足49'
            })
            return;
        }

        let rate = Math.floor(Math.random() * 10001);
        // let rate = Math.floor(Math.random() * 100001);
        let rowid = 1;
        // 六级奖池:万分之1
        if (rate === 10000) {
            rowid = [0, 6].includes(moment().days()) ? 6 : 5;
        }
        // 五级奖池:千分之1
        if (rate < 10000 && rate >= 9990) {
            rowid = 5;
        }
        // 四级奖池:十千分之5
        if (rate < 9990 && rate >= 9940) {
            rowid = 4;
        }
        // 三级奖池:百分之1
        if (rate < 9940 && rate >= 9840) {
            rowid = 3;
        }
        // 二级奖池:百分之5
        if (rate < 9840 && rate >= 9340) {
            rowid = 2;
        }
        let success = '';
        const artPool = artPoolMap[rowid];
        // 随机对应奖励池中的id
        const indxe = Math.floor(Math.random() * artPool.length);
        const id = artPool[indxe];
        const { type:p, n } = knapsackTable.getArticle(id);
        const artReward = {
            [id]: {
                id,
                n,
                p,
                s: 1
            }
        };
        knapsackFn.addKnapsack(req, res, { article: { artReward }, data, force: true });
        if (type === 1) {
            role_integral.world -= 199;
            success = `消耗199世界声望,获得${n}`;
        }
        if (type === 2) {
            role_integral.gang -= 199;
            success = `消耗199帮会声望,获得${n}`;
        }
        if (type === 3) {
            role_integral.intersect -= 199;
            success = `消耗199结义声望,获得${n}`;
        }
        if (type === 4) {
            success = `消耗49元宝,获得${n}`;
            KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 49 });
        } else {
            RoleG.updataRoleGlobal(req, res, { role_integral });
        }

        res.send({
            code: 0,
            success
        })
    }
}
