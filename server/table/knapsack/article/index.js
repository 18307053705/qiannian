// group 1 直接改变某属性（例如恢复药，声望卷轴,元宝卡,银票，勋章宝石一类)
// group 2 buff类型 如双倍经验卡，临时提升属性的丹药
const reply = require('./10_reply');
const buff = require('./11_buff');
const reel = require('./12_reel');
const equip = require('./13_equip');
const material = require('./14_material');
const seed = require('./15_seed');
const sundries = require('./16_sundries');
const gemstone = require('./17_gemstone');
const equipMaterial = require('./18_equipMaterial');
const treasure = require('./19_treasure');
const dongTian = require('./20_dongTian');
const taskMaterial = require('./21_taskMaterial');

module.exports = {
    /**
     * 获取全部商城物品
     */
    getArticleList: function () {
        return [
            ...reply.getArticleList(),
            ...buff.getArticleList(),
            ...reel.getArticleList(),
            ...equip.getArticleList(),
            ...material.getArticleList(),
            ...seed.getArticleList(),
            ...sundries.getArticleList(),
            ...gemstone.getArticleList(),
            ...equipMaterial.getArticleList(),
        ]
    },
    /**
     * 获取物品
     * @param {*} id 物品id
     * @returns {*} article || undefined
     * @returns {*} article.id
     * @returns {*} article.n
     * @returns {*} article.type 
     * @returns {*} article.group1 || group2
     */
    getArticle: function (id) {
        const eleType = (id + "").slice(0, 2);
        const idNum = Number(id);
        switch (eleType) {
            case '10':
                return reply.getArticle(idNum);
            case '11':
                return buff.getArticle(idNum);
            case '12':
                return reel.getArticle(idNum);
            case '13':
                return equip.getArticle(idNum);
            case '14':
                return material.getArticle(idNum);
            case '15':
                return seed.getArticle(idNum);
            case '16':
                return sundries.getArticle(idNum);
            case '17':
                return gemstone.getArticle(idNum);
            case '18':
                return equipMaterial.getArticle(idNum);
            case '19':
                return treasure.getArticle(idNum);
            case '20':
                return dongTian.getArticle(idNum);
            case '21':
                return taskMaterial.getArticle(idNum);
            default:
                console.log('未找到物品:::', idNum);
                return undefined;
        }

    },
    /**
     * 判断物品是否为装备
     */
    isEquip: function (id) {
        return (id + "").slice(0, 2) === '13';
    },
    /**
    * 判断物品是否为宝石
    */
    isGemstone: function (id) {
        return (id + "").slice(0, 2) === '17';
    },
    /**
    * 判断物品是否为元素材料
    */
    isEleMaterial: function (id) {
        return (id + "").slice(0, 2) === '19';
    },
    /**
    * 判断物品是否为恢复药品
    */
    isReply: function (id) {
        return (id + "").slice(0, 2) === '1';
    },
    /**
     * 获取全部装备
     */
    getAllEquipList: equip.getArticleList,
    /**
    * 获取全部聚宝材料
    */
    geAllTreasureMap: treasure.getArticleMap,
    /**
     * 获取对应等级的天材地宝
     */
    getLevelIds: dongTian.getLevelIds
}