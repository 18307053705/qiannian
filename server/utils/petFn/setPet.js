const { AttributeTable } = require('../../table');
const { getPetArt } = require('./getPetArt');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} pet.name 宠物名
     * @param {*} pet.flair_x 先天资质
     * @param {*} pet.ele  可选,元素类型(0:无,1:冰,2:雷,3:风,4:水,5:火) 
     * @param {*} pet.artId 可选,宠物天赋技能id
     * @param {*} pet.type 可选,宠物类型1攻击2防御3敏捷
     * @returns  message 错误信息
     */
    setPet: async function (req, res, { name, flair_x, ele = 0, artId = 0, type: oldType, }) {
        const { pet_pool } = RoleG.getRoleGlobal(req, res);
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
            art: JSON.stringify(getPetArt(flair_x, artId)),
            attr: JSON.stringify(AttributeTable.getPetBaseAttr(type)),
            equip: '{}',
            addition: JSON.stringify(AttributeTable.getInitAttr()),
            reborn: 0,
            state: 0,
            ele,
            exp: '0/100'
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
        const { results } = await res.asyncAdd(petSql, dataValue);
        if (results) {
            const lastId = results.insertId;
            pet_pool['l'].push({
                n: name,
                id: lastId,
                s: 0
            })
            RoleG.updataRoleGlobal(req, res, { pet_pool });
        }
    }
}