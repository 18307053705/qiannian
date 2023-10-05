const moment = require('moment');
const { grandFn } = require('../../utils');

module.exports = {
    /**
     * 传送指令
     */
    tpDir: async (req, res) => {
        const { dir } = req.body;
        // 战斗战场计算
        const hour = moment().hour();
        // 战场活动时间
        if (dir.split(',')[0] === '60003' && (hour < 20 || hour > 21)) {
            res.send({
                code: 0,
                message: '上古战场活动还未开始,无法进入！'
            })
            return;
        }
        const address = grandFn.tpDir(req, res, dir);
        return grandFn.updataDir(req, res, { address });
    }
};