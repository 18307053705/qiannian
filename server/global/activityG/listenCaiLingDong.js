const { getFreak } = require('../../table/element/ELEMENT_2');
const { updateCaiLingDong } = require('./updateCaiLingDong');

module.exports = {
    /**
     * 监听彩灵洞击杀
     */
    listenCaiLingDong: function (req, res, freakId) {
        const { socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { ranks } = socialize_pool;
        if (ranks && [20611, 20612, 20613, 20614].includes(freakId)) {
            // 击杀彩灵的积分
            const { integral, name } = getFreak(freakId);
            res.listText.push(`击杀${name},队伍积分+${integral}`);
            updateCaiLingDong(req, res, { integral });
            return;
        }
    }
}