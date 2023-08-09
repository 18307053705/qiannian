const artList = require('./artList');
module.exports = {
    /**
     * 获取技能描述
     * @param {*} art
     * @returns msg 描述
     */
    getArtMsg: function ({ v, p, t, e={}, id, r }) {
        const { msg } = artList[id];
        if (p === 1) {
            let str = msg.replace('&[v]&', v).replace('&[e]&', e['atk'] || e['suck'] || e['ignore'] || 10);
            if (r > 3) {
                str = str.replace('四转可领悟', '并');
            }
            return str;
        }
        if (p === 2) {
            let str = msg.replace('&[t]&', t).replace('&[v]&', v);
            if (r > 3) {
                str = str.replace('四转后可增加攻击目标', `额外增加${r - 3}个攻击目标`);
            }
            return str;
        }
        if (p === 3) {
            let str = msg;
            
            v.split(',').forEach(effct => {
                const [_, value] = effct.split('-');
                str = str.replace('&[v]&', value);
            })
            str = str.replace('&[t]&', t);
            return str;
        }
        if (p === 4) {
            let str = msg;
            v.split(',').forEach(effct => {
                const [_, value] = effct.split('-');
                str = str.replace('&[v]&', value);
            })
            return str;
        }
    }
}