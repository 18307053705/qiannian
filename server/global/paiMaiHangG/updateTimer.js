
const { PAI_MAI_HANG_Global, TIMER_CPNFIG } = require('./config');
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

        const timer = outTimer - new Date();
        TIMER_CPNFIG.index = setTimeout( async () => {
            // paiMaiEnd 函数处理拍卖结束逻辑
            const indxe = PAI_MAI_HANG_Global.findIndex(({ id_p }) => idP === id_p);
            TIMER_CPNFIG.index = undefined;
            // 删除拍卖相应拍卖品
            const data = JSON.parse(JSON.stringify(PAI_MAI_HANG_Global[indxe]));
            PAI_MAI_HANG_Global.splice(indxe, 1);
            await paiMaiEnd(req, res, data);
            // 监听下个拍卖品
            _this.updateTimer(req, res);
        }, timer < 0 ? 0 : timer);
        TIMER_CPNFIG.id_p = idP;
    }
}