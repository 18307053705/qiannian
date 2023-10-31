const { knapsackTable } = require('../../../table');
const ATTR_NAME_MEUN = {
    exp: '经验',
    world: '世界声望',
    gang: '帮会声望',
    intersect: '结义声望',
    exploit: '功勋',
}
module.exports = {
    /**
     * 获取物品奖励
     * @param {*} rewards 未解析的任务奖励
     * @returns reward 奖励信息 || undefined
     * @returns reward.article{artReward,equipReward}
     * @returns reward.role {exp:100,world:100,gang:100,intersect:100,exploit:100}
     * @returns reward.tael
     * @returns reward.text 奖励文案[]
     */
    getReward: function (rewards) {
        if (!rewards) {
            return undefined;
        }
        const { article, equip, tael, attr, yuanbao } = rewards;
        const text = [];
        const reward = {};
        const articles = {};
        // 属性奖励
        if (attr) {
            const role = {};
            attr.split(',').forEach((itme) => {
                const [key, s] = itme.split('-');
                role[key] = (s - 0);
                text.push(`${ATTR_NAME_MEUN[key]}x${s}`);
            })
            reward['role'] = role;
        }
        if (tael) {
            reward['tael'] = tael;
            text.push(`银两x${tael}`);
        }
        if (yuanbao) {
            reward['yuanbao'] = yuanbao;
            text.push(`元宝x${yuanbao}`);
        }
        if (article) {
            const artReward = {};
            article.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { id, n, type } = knapsackTable.getArticle(ids);
                artReward[id] = {
                    id,
                    n,
                    p: type,
                    s: s - 0
                }
                text.push(`${n}x${s}`);
            })
            articles['artReward'] = artReward;
        }
        if (equip) {
            const equipReward = {};
            equip.split(',').forEach((itme) => {
                const [ids, s = 1] = itme.split('-');
                const { id, name } = knapsackTable.getEquip(ids);
                equipReward[id] = {
                    id,
                    n: name,
                    P: 3,
                    s: s - 0
                }
                text.push(`${name}x${s}`);
            })
            articles['equipReward'] = equipReward;
        }
        reward.text = text;
        JSON.stringify(articles) !== '{}' && (reward['article'] = articles);
        return reward
    }
}

