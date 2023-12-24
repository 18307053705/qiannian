const { ART_TYPE } = require('../0library/enum');
module.exports = {
    /**
     * 获取技能描述
     * @param {*} art
     * @returns msg 描述
     */
    getArtMsg: function (art) {
        const { v, p, t, e = '', msg } = art;
        if (p === ART_TYPE.simple) {
            const [_, value] = e.split('-');
            return msg.replace('{v}', v).replace('{e}', value || 10);
        }
        if (p === ART_TYPE.aoe) {
            return msg.replace('{t}', t).replace('{v}', v);
        }
        if (p === ART_TYPE.buff) {
            let str = msg;
            v?.split(',').forEach(effct => {
                const [_, value] = effct.split('-');
                str = str.replace('{v}', value);
            })
            str = str.replace('{t}', t);
            return str;
        }
        if (p === ART_TYPE.passive) {
            let str = msg;
            v?.split(',').forEach(effct => {
                const [_, value] = effct.split('-');
                str = str.replace('{v}', value);
            })
            return str;
        }
        if (p === ART_TYPE.fuTi) {
            return msg.replace('{v}', v);
        }
    }
}