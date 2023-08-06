
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 计算宝石的属性
     * @param {*} gems 宝石列表
     * @returns {*} attr 装备属性
     */
    getGemAttr: function (gems) {
        const gemsAttr = {};
        gems.forEach(gem => {
            if (gem == 0) return;
            const gemInfo = knapsackTable.getKeyBackArticle('gem', gem);
            const [attrKey, value] = gemInfo.value.split('-');
            const attrValue = Number(value);
            if (attrKey === 'atk' || attrKey === 'dfs') {
                const maxKey = `${attrKey}_max`;
                const minKey = `${attrKey}_min`;
                gemsAttr[maxKey] || (gemsAttr[maxKey] = 0);
                gemsAttr[minKey] || (gemsAttr[minKey] = 0);
                gemsAttr[maxKey] += attrValue;
                gemsAttr[minKey] += attrValue;
                return;
            }
            gemsAttr[attrKey] || (gemsAttr[attrKey] = 0);
            gemsAttr[attrKey] += attrValue;
        })
        return gemsAttr;
    }
}