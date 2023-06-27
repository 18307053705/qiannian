const mysql = require("../mysql");
const Attribute = require("../table/attribute");
const ArtTable = require("../table/art");
const Global = require("../global");
const ELE_MEUN = {
    1: {
        ice_atk_max: 1,
        ice_atk_min: 0.8,
        ice_dfs_max: 0.5,
        ice_dfs_min: 0.3,
    },
    2: {
        mine_atk_max: 1,
        mine_atk_min: 0.8,
        mine_dfs_max: 0.5,
        mine_dfs_min: 0.3,
    },
    3: {
        wind_atk_max: 1,
        wind_atk_min: 0.8,
        wind_dfs_max: 0.5,
        wind_dfs_min: 0.3,
    },
    4: {
        water_atk_max: 1,
        water_atk_min: 0.8,
        water_dfs_max: 0.5,
        water_dfs_min: 0.3,
    },
    5: {
        fire_atk_max: 1,
        fire_atk_min: 0.8,
        fire_dfs_max: 0.5,
        fire_dfs_min: 0.3,
    }
}

module.exports = {
    // 获取宠物星级
    getRating: function (flair_x) {
        // 1:0-29 2:30-49 3:50-69 4:70-79 5:80-89 7:90-99 10:100
        switch (parseInt(flair_x / 10)) {
            case 3:
            case 4:
                return 2;
            case 5:
            case 6:
                return 3;
            case 7:
                return 4;
            case 8:
                return 5;
            case 9:
                return 7;
            case 10:
            case 11:
                return 10 + ((flair_x - 100) * 0.5);
            case 12:
                return 25 + (flair_x - 100);
            default:
                return 1;
        }
    },
    // 获取技能描述
    getArttips: function (art) {
        const { v, id, l } = art;
        const { msg } = ArtTable[id];
        // 将自身&[v]&%属性附加给玩家
        if (id === 19) {
            return {
                ...art,
                msg: msg.replace('&[v]&', l * 10 + 10)
            }
        }
        Object.keys(v).forEach((key) => {
            art['msg'] = msg.replace('&[v]&', v[key]);
        })
        return art;
    },
    // 获取宠物技能
    getPetArt: function (flair_x, id) {
        let artId = id;
        if (!artId) {
            artId = flair_x < 60 ? 18 : Math.floor(Math.random() * (18 - 15)) + 15;
        }
        const rating = this.getRating(flair_x);
        const { v, n, effect, msg } = ArtTable[artId];
        const talentArt = {
            id,
            n,
            v: v * rating,
            msg: msg.replace('&[v]&', v * rating)
        }
        if (effect) {
            const [key, value] = effect.split('-');
            talentArt['effect'] = `${key}-${value * rating}`;
            talentArt['msg'] = msg.replace('&[v]&', v * rating).replace('&[e]&', value * rating)
        }


        const art = [talentArt];
        const artIds = [19, 8, 9, 10, 11, 12, 13, 14];
        artIds.forEach((id) => {
            const { p, n, v } = ArtTable[id];
            const itme = {
                id,
                p,
                n,
                l: -1,
                r: 0,
                v,
            }
            if (p === 4) {
                itme['v'] = {};
                Object.keys(v).forEach(key => {
                    itme['v'][key] = v[key];
                })
            }
            art.push(itme);
        });

        return art;
    },
    // 计算属性
    computeAttr: function ({ type, flair_x, flair = 0, level = 1, addition = {}, ele = 0 }, limit) {
        let attr = Attribute.petAttr[type];
        if (ELE_MEUN[ele]) {
            attr = {
                ...attr,
                ...ELE_MEUN[ele]
            }
        }
        const rating = this.getRating(flair_x);
        const initAttr = limit || Attribute.getInitAttr();
        // 宠物属性=等级*对应属性*星级加成 * (先天资质 + 后天资质)
        Object.keys(initAttr).forEach((key) => {
            if (attr[key]) {
                attr[key] *= level * rating * (flair_x + flair);
            }
            if (addition[key]) {
                attr[key] = attr[key] ? attr[key] + addition[key] : addition[key];
            }
        })
        return attr;
    },
    // 新增宠物
    setPet: async function (req, { name, flair_x, ele = 0, id = 0, type: oldType, }) {
        const { pet_pool } = Global.getRoleGlobal(req);
        if (pet_pool['l'].length >= pet_pool['x']) {
            return '宠物房已满,无法获得更多宠物。';
        }
        const type = oldType || Math.floor(Math.random() * (4 - 1)) + 1;
        const petInfo = {
            name,
            type,
            flair_x,
            flair: 0,
            level: 1,
            art: JSON.stringify(this.getPetArt(flair_x, id)),
            attr: JSON.stringify(this.computeAttr({ type, flair_x })),
            equip: '{}',
            addition: '{}',
            reborn: 0,
            state: 0,
            ele,
            exp: '0/200'
        };
        const dataKey = [];
        const dataValue = [];
        const values = [];
        Object.keys(petInfo).forEach(key => {
            dataKey.push(key);
            dataValue.push(petInfo[key]);
            values.push("?");
        })
        const petSql = `insert into pet(${dataKey.join(',')}) values(${values.join(',')})`;
        const { results } = await mysql.asyncAdd(petSql, dataValue);
        if (results) {
            let lastId = results.insertId;

            pet_pool['l'].push({
                n: name,
                id: lastId,
                s: 0
            })
            Global.updateRoleGlobal(req, { pet_pool });
            return false;
        }
        return true;

    },
    // 获取信息
    getPetInfo: async function (id) {
        const { results } = await mysql.asyncQuery(`select * from  pet where id=${id}`);
        const pet = results[0];
        if (pet) {
            const petInfo = {};
            Object.keys(pet).forEach((key) => {
                petInfo[key] = Global.PET_JSON_KEYS.includes(key) ? JSON.parse(pet[key]) : pet[key]
            })
            return petInfo;
        }
    },
    // 更新宠物信息
    updataPetInfo: async function (id, data) {
        const { results } = await mysql.asyncQuery(`update pet  SET ${data.join(',')}  where id=${id}`);
    }
}