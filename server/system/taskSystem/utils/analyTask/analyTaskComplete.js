const { ElementTable, knapsackTable } = require('@/table');
module.exports = {
    /**
     * 任务完成条件解析
     * @param {*} complete
     * @param {*} grand
     * @returns complete
     */
    analyTaskComplete: function (complete, grand) {
        const { article, freak } = complete || {};
        const { freak: grandFreak = [] } = grand || {};
        const completes = {};
        if (article) {
            completes['article'] = {};
            article.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { id, name } = knapsackTable.getArticle(ids);
                completes['article'][id] = {
                    id,
                    name,
                    s: s - 0
                }
            })
        }


        if (grandFreak.length) {
            completes['freak'] = {};
            grandFreak.forEach(({ id, s = 1 }) => {
                const { name } = ElementTable.getElement(id);
                completes['freak'][id] = {
                    id,
                    n: name,
                    s,
                    c: 0
                }
            });
        }
        if (freak) {
            completes['freak'] || (completes['freak'] = {});
            freak.split(',').forEach((itme) => {
                const [id, s = 1] = itme.split('-');
                const { name } = ElementTable.getElement(id);
                completes['freak'][id] = {
                    id,
                    n: name,
                    s: s - 0,
                    c: 0
                }
            })


        }
        return JSON.stringify(completes) === '{}' ? undefined : completes;
    }
}

