const { grandFn } = require('../../utils');
const { GrandG } = require('../../global');

module.exports = {
    /**
     * 传送指令
     */
    tpDir: async (req, res) => {
        const { dir } = req.body;
        const address = grandFn.tpDir(req, res, dir);
        return grandFn.updataDir(req, res, { address });
    }
};