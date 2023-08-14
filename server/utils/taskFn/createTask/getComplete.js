const { ElementTable, knapsackTable } = require('../../../table');
module.exports = {
    /**
     * 任务完成条件解析
     * @param {*} complete
     * @returns complete
     */
    getComplete: function (complete) {
        const { article, equip, freak } = complete;
        complete['article'] = {};
        if (article) {
            article.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { id, n, type } = knapsackTable.getArticle(ids);
                complete['article'][id] = {
                    id,
                    n,
                    p: type,
                    s: s - 0
                }
            })
        }
        if (equip) {
            equip.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { id, name } = knapsackTable.getEquip(ids);
                complete['article'][id] = {
                    id,
                    n: name,
                    p: 3,
                    s: s - 0
                }
            })
        }

        if (freak) {
            complete['freak'] = {};
            freak.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { name, id } = ElementTable.getElement(ids);
                complete['freak'][id] = {
                    id,
                    n: name,
                    s: s - 0,
                    c: 0
                }
            })
        }
        return {
            freak: complete['freak'] || undefined,
            article: JSON.stringify(complete['article']) === '{}' ? undefined : complete['article'],
        };
    }
}

