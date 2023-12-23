const {  KnapsackG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn } = require('../../utils');
const moment = require('moment');

// 技能奖励池
const artPoolMap = {
    1: [1810, 1810, 1810, 1811, 1811],
    2: [1810, 1811, 1811, 1812, 1812, 1812, 1813, 1813, 1814],
    3: [1815, 1815, 1815, 1815, 1816, 1816, 1817],
    4: [1818, 1818, 1818, 1819],
    // 风云，逍遥，天地
    5: [1820, 1820, 1820, 1820, 1821, 1821, 1822],
    // 一转-四转
    6: [1822, 1822, 1822, 1822, 1822, 1822, 1823, 1823, 1823, 1824, 1824, 1825],
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
        const { name } = knapsackTable.getArticle(id);
        const article = {
            [id]: {
                id,
                name,
                s: 1
            }
        };
        const message = knapsackFn.addKnapsack(req, res, article, { data });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        if (type === 1) {
            role_integral.world -= 199;
            success = `消耗199世界声望,获得${name}`;
        }
        if (type === 2) {
            role_integral.gang -= 199;
            success = `消耗199帮会声望,获得${name}`;
        }
        if (type === 3) {
            role_integral.intersect -= 199;
            success = `消耗199结义声望,获得${name}`;
        }
        if (type === 4) {
            success = `消耗49元宝,获得${name}`;
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
