const { ShenYuanG } = require('@/global')
module.exports = {
    getShenRank: function (req, res) {
        res.send({
            code: 0,
            data: ShenYuanG.getShenYuanRank(req, res)
        })
    }
}