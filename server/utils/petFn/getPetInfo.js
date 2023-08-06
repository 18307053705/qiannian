const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} petId 宠物ID
     * @returns Promise 
     * @returns petInfo.id 
     * @returns petInfo.name 
     * @returns petInfo.flair 后天资质
     * @returns petInfo.flair_x 先天资质
     * @returns petInfo.level 等级
     * @returns petInfo.type 类型(1:攻击,2:防御,3:敏捷)
     * @returns petInfo.art 技能池
     * @returns petInfo.equip 装备池
     * @returns petInfo.addition 额外属性
     * @returns petInfo.attr 基础属性
     * @returns petInfo.state 状态(0:休息,1:出战,2:附体,3:上架)
     * @returns petInfo.reborn 重生次数
     * @returns petInfo.ele 元素类型(1:冰,2:雷,3:风,4:水,5:火)
     * @returns petInfo.exp 宠物经验
     */
    getPetInfo: async function (req, res, petId) {
        const { results } = await res.asyncQuery(`select * from  pet where id=${petId}`);
        const pet = results[0];
        if (pet) {
            const petInfo = {};
            Object.keys(pet).forEach((key) => {
                petInfo[key] = PET_JSON_KEYS.includes(key) ? JSON.parse(pet[key]) : pet[key]
            })
            return petInfo;
        }
        return {}
    }
}