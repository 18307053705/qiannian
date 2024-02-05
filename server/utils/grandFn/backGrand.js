module.exports = {
    /**
     * 返回地图
     * @param {*} req 
     * @param {*} res 
     */
    backGrand: function (req, res) {
        res.send({
            code: 0,
            path: '/grand'
        })
    },

};
