
const { PAI_MAI_HANG_Global, TIMER_CPNFIG } = require('./config');
const { getPaimaiHang } = require('./getPaimaiHang');
const { paiMaiEnd } = require('../../utils/paimaiFn/paiMaiEnd');
module.exports = {
    /**
     * 更新延时器
     * @param {*} req 
     * @param {*} res 
     * @param {*} id_p
     * @returns message 错误信息
     */
    updateTimer: function (req, res, id_p) {
        const _this = module.exports;
        if (TIMER_CPNFIG.index && id_p !== TIMER_CPNFIG.id_p) {
            return;
        }
        // 判断是否存在延时是，是则清除
        if (TIMER_CPNFIG.index) {
            clearTimeout(TIMER_CPNFIG.index);
        }
        if (!PAI_MAI_HANG_Global.length) {
            return;
        }
        let { id_p: idP, out_timer: outTimer } = PAI_MAI_HANG_Global[0];
        // 找到最快结束的拍卖品
        PAI_MAI_HANG_Global.forEach(({ id_p, out_timer }) => {
            if (out_timer < outTimer) {
                outTimer = out_timer;
                idP = id_p;
            }
        })
        TIMER_CPNFIG.index = setTimeout(() => {
            getPaimaiHang(req, res, idP);
            paiMaiEnd(req, res, getPaimaiHang(req, res, idP), () => {
                TIMER_CPNFIG.index = undefined;
                const indxe = PAI_MAI_HANG_Global.findIndex(({ id_p }) => idP === id_p);
                // 删除拍卖相应拍卖品
                PAI_MAI_HANG_Global.splice(indxe, 1);
                // 监听下个拍卖品
                _this.updateTimer(req, res);

            })
        }, outTimer - new Date());
        TIMER_CPNFIG.id_p = idP;
    }
}