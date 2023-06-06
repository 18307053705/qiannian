const Global = require("../global");
const mysql = require("../mysql");
const Equip = require("../table/equip");
const roleFn = require("./roleFn");
module.exports = {
    getKnapsackInfo: async function (req, type) {
        const { role, user } = Global.getUserRole(req);
        // 背包
        if (type == 1) {
            const { results } = await mysql.asyncQuery(`select * from knapsack  where user_id="${user}" and role_id="${role.id}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
    },
    // 更新背包
    updateKnapsack: async function (req, data) {
        const { role, user } = Global.getUserRole(req);
        const upData = [];
        Object.keys(data).forEach(key => {
            upData.push(`${key}='${data[key]}'`)
        })
        const { results } = await mysql.asyncQuery(`update knapsack  SET ${upData.join(',')}  where user_id="${user}" and role_id="${role.id}"`);
        return results;
    },
    // 验证物品信息
    chekeArticle: function (req, data) {
        const { id, in_x, s, p } = req.body;
        const itme = data[in_x];
        return itme && itme.id == id && itme.p == p && itme.s >= s;
    },
    // 佩戴装备
    wearEquip: function (id, ext, role) {
        const { name, career, level, pos, attr, group } = Equip[id];
        let isConput = false;
        
        switch (career) {
            case 0:
                isConput = true;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        if (career !== 0 && (career == 3 && role.career % 3 == 0) && (role.career % 3 == career)) {

        }
        console.log(ext)
        console.log(Equip[id])



    },
}