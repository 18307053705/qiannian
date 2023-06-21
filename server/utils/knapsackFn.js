const Global = require("../global");
const mysql = require("../mysql");
const KnapsackTable = require("../table/knapsack");

module.exports = {
    getKnapsackInfo: async function (req, type, roleId) {
        // 背包
        if (type == 1 || type == 2 || type == 4 || type == 5) {
            const knapsack = Global.getknapsackGlobal(req, roleId);
            if (knapsack) {
                return knapsack;
            }
            const { results } = await mysql.asyncQuery(`select * from knapsack  where role_id="${roleId}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
        if (type == 3) {
            const { role_id } = Global.getRoleGlobal(req);
            const { results } = await mysql.asyncQuery(`select * from warehouse  where role_id="${role_id}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
    },
    // 更新背包
    updateKnapsack: async function (req, data, roleId) {
        const knapsack = Global.updateknapsackGlobal(req, data, roleId);

        if (knapsack) {
            return knapsack;
        }
        const upData = [];
        Object.keys(data).forEach(key => {
            let value = key === 'data' ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        const { results } = await mysql.asyncQuery(`update knapsack  SET ${upData.join(',')}  where  role_id="${roleId}"`);
        return results;
    },
    // 更新仓库
    updateWarehouse: async function (req, data) {
        const { role_id } = Global.getRoleGlobal(req);
        const upData = [];
        Object.keys(data).forEach(key => {
            let value = key === 'data' ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}=${value}`)
        })
        const { results } = await mysql.asyncQuery(`update warehouse  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results;
    },
    // 验证物品信息
    chekeArticle: function (req, data) {
        const { id, in_x, s, p, type } = req.body;
        if (!(id && in_x !== undefined && s >= 0 && p && type)) {
            return '参数有误'
        }
        const itme = data[in_x];
        if (itme && itme.id != id && itme.p != p && itme.s < s && s > KnapsackTable.Maxs) {
            return '物品信息有误'
        }
        return false;
    },
    // 添加物品
    addKnapsack: function (article, data) {
        if (!article) {
            return undefined;
        }
        if (data.length === KnapsackTable.size) {
            return '背包已满,请先清理背包'
        }
        const len = data.length;
        const { artReward, equipReward } = article;
        // 物品奖励
        if (artReward) {
            for (let index = 0; index < len; index++) {
                const { p, id, s } = data[index];
                // 判断物品id与物品类型是否相同
                if (artReward[id] && (artReward[id].p == p || artReward[id].type == p)) {
                    const { s: num = 1 } = artReward[id];
                    // 找到对应id,判断是否可以继续叠加
                    if (s + num <= KnapsackTable.Maxs) {
                        data[index]['s'] += num;
                        delete artReward[id];
                    } else {
                        artReward[id]['num2'] = data[index]['s'] + num - KnapsackTable.Maxs;
                        data[index]['s'] = KnapsackTable.Maxs;
                    }
                }
                // 全部处理完,结束循环
                if (JSON.stringify(artReward) === '{}') {
                    index = KnapsackTable.len;
                }
            }
            //  遍历结束还存在物品奖励，说明物品为新增
            Object.keys(artReward).forEach(key => {
                const { id, type, n, s, num2 } = artReward[key];
                data.push({ id, n, p: type, s: num2 || s });
                delete artReward[key];
            })
        }
        // 装备奖励
        if (equipReward) {
            Object.keys(equipReward).forEach(key => {
                const { id, name, n, ext = '0_0_0_0_0_0_0' } = equipReward[key];
                data.push({
                    id,
                    n: name || n,
                    ext,
                    s: 1
                });
                delete equipReward[key];
            })
        }
        if (data.length > KnapsackTable.size) {
            return '背包已满,请先清理背包'
        }
    },
    // 消耗物品
    deleteKnapsack: function (req, article) {
        const { data } = Global.getknapsackGlobal(req);
        let chengData = [];
        let message = [];
        data.forEach(({ id, p, s, ...itme }) => {
            if (article[id] && p === article[id]['p']) {
                let num = s - article[id]['s'];
                if (num > 0) {
                    delete article[id];
                    chengData.push({
                        ...itme,
                        id,
                        p,
                        s: num
                    });
                    return;
                }
            }
            chengData.push({
                id,
                p,
                s,
                ...itme
            })

        })
        if (JSON.stringify(article) !== '{}') {
            Object.keys(article).forEach((key) => {
                const { n, s } = article[key];
                message.push(`${n}数量不足`);
            })
        } else {
            Global.updateknapsackGlobal(req, { data: chengData });
        }
        return {
            message: message.join(','),
            data: chengData
        };
    }
}