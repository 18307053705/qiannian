
const { PaiMaiHangG } = require('../../global')

module.exports = {
    getList: function (req, rse) {
        rse.send({
            code: 0,
            data: PaiMaiHangG.getPaimaiAll()
        })
    }
}