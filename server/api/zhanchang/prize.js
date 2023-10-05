const moment = require('moment');
const { DailysG, RoleG, KnapsackG } = require("../../global");
const { TitleTable } = require('../../table');
function getPrze(index) {
    // 排名第一
    if (index === 1) {
        return {
            titleId: 2,
            exploit: 1000,
            yuanbao: 500,
            tael: 500000,
        }
    }
    // 排名2 3
    if (index < 4) {
        return {
            titleId: 3,
            exploit: 700,
            yuanbao: 300,
            tael: 300000,
        }
    }
    // 排名前10
    if (index < 11) {
        return {
            titleId: 4,
            exploit: 500,
            yuanbao: 200,
            tael: 200000,
        }
    }
    return {
        exploit: 200,
        yuanbao: 100,
        tael: 10000,
    }
}

module.exports = {
    /**
     * 战场排名奖励
     */
    prize: async function (req, res) {
        // const hour = moment().hour();
        if (moment().hour() < 21) {
            res.send({
                code: 0,
                message: '上古战场暂未结束'
            })
            return;
        }
        const dailys = DailysG.getDailysGlobalAll();
        const { role_id } = RoleG.getRoleGlobal(req, res);
        let list = [];
        Object.values(dailys).forEach(({ zhanChang }) => {
            if (zhanChang.d) {
                list.push(zhanChang)
            }
        });
        list = list.sort((pre, next) => {
            if (pre.j === next.j) {
                return pre.d - next.d;
            }
            return next.j - pre.j;
        })
        const index = list.findIndex(({ id }) => role_id === id);
        if (index === -1) {
            res.send({
                code: 0,
                message: '暂无排名,无法领取奖励'
            })
            return;
        }
        const { zhanChang } = list[index]
        if (zhanChang.prize) {
            res.send({
                code: 0,
                message: '无法重复领取奖励'
            })
            return;
        }

        const { title_list, role_integral } = RoleG.getRoleGlobal(req, res);
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        const data = getPrze(index + 1);
        role_integral.exploit += data.exploit;
        if (data.titleId) {
            const title = TitleTable.getTitle(data.titleId);
            title_list.push(data.titleId);
            RoleG.updataRoleGlobal(req, res, { title_list, role_integral });
            data.title = title.name;
        } else {
            RoleG.updataRoleGlobal(req, res, { role_integral });
        }
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + data.yuanbao, tael: tael + data.tael });
        // 更新为已领取奖励
        DailysG.updataDailysGlobal(req, res, { isPrize: true });
        res.send({
            code: 0,
            data
        })

    }
}
