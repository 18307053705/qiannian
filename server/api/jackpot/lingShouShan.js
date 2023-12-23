const { knapsackTable, PetTable } = require("../../table");
const { petFn, knapsackFn } = require('../../utils');
const moment = require('moment');

// 灵兽山奖{励池
const petPoolMap = {
    // 宠物技能卷,宠物进化卷,宠物转生卷,宠物扩房卷,宠物转化卷,彩灵蛋,水灵蛋,火灵蛋,风灵蛋,雷灵蛋,冰灵蛋
    1: [180, 181, 182, 183, 18103, 184, 185, 186, 187, 188, 189],
    // 二级奖励池60资质宠物
    2: [601, 602, 603, 604, 605, 606, 607, 608, 609, 6010, 6011, 6011],
    // 三级奖励池千年系列宠物70资质
    3: [701, 702, 703, 704, 705, 706, 707, 708],
    // 四级奖励池包 80资质元素宠物
    4: [801, 802, 803],
    // 五级奖池 85资质元素宠物
    5: [851, 852],
    // 六级奖池 90资质元素宠物
    6: [901, 902, 903, 904, 905],
    // 六级奖池 95资质元素宠物
    7: [951, 952],
    // 八级奖池 100资质元素宠物
    8: [1001, 1002, 1003]
}

module.exports = {
    /**
     * 灵兽山砸宠
     * @param {*} req
     */
    lingShouShan: async function (req, res) {
        const { pet_pool, jackpot, role_level } = RoleG.getRoleGlobal(req, res);
        let { data, yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        if (pet_pool['l'].length >= pet_pool['x']) {
            res.send({
                code: 0,
                message: '宠物房已满,无法获得更多宠物。'
            })
            return;
        }
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }
        if (yuanbao < 200) {
            res.send({
                code: 0,
                message: '元宝不足200,无法继续砸宠！'
            })
            return;
        }
        // 0 - 100000;
        let rate = Math.floor(Math.random() * 100001);
        let rowid = 1;
        // 八级奖池:十万分之1
        if (rate === 100000) {
            rowid = 8;
        }
        // 七级奖池:十万分之10
        if (rate < 100000 && rate >= 99990) {
            rowid = 7;
        }
        // 六级奖池:十万分之20
        if (rate < 99990 && rate >= 99970) {
            rowid = 6;
        }
        // 五级奖池:十万分之30
        if (rate < 99970 && rate >= 99940) {
            rowid = 5;
        }
        // 四级奖池:十万分之100
        if (rate < 99840 && rate >= 99740) {
            rowid = 4;
        }
        // 三级奖池:十万分之1000
        if (rate < 99740 && rate >= 98740) {
            rowid = 3;
        }
        // 二级奖池:十万分之40000
        if (rate < 98740 && rate >= 58740) {
            rowid = 2;
        }
        // 根据等级限制最大奖励池
        if (role_level < 50 && rowid > 3) {
            rowid = 3;
        }
        if (role_level < 80 && rowid > 5) {
            rowid = 5;
        }
        let success = '';
        const petPool = petPoolMap[rowid];
        // 随机对应奖励池中的id
        const indxe = Math.floor(Math.random() * petPool.length);
        const id = petPool[indxe];
        if (rowid === 1) {
            const { name } = knapsackTable.getArticle(id);
            knapsackFn.addKnapsack(req, res, { [id]: { name, s: 1, id } });
            success = `消耗200元宝,在灵兽山获得${name}x1`;
        } else {
            const pet = PetTable.createPet(id);
            await petFn.setPet(req, res, pet);
            success = `消耗200元宝,在灵兽山获得${pet.name}`;
           
        }
        let isActivity = false;
        // 周六，周日开启活动
        if ([0, 6].includes(moment().days())) {
            isActivity = true;
            jackpot.pet += 1;
            if (jackpot.pet === 10) {
                jackpot.pet = 0;
                const yb = Math.floor(Math.random() * 1000) + 100;
                yuanbao += yb;
                success += `,天降鸿运恭喜额外获得${yb}元宝！！！`
            }
            RoleG.updataRoleGlobal(req, res, { jackpot })
        }

        // 更新背包信息
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 200 });

        res.send({
            code: 0,
            data: {
                num: jackpot.pet,
                isActivity,
                day: moment().days()
            },
            success,
        })
    }
}
