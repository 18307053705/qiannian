module.exports = {
    /**
     * 势力列表
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     */
    list: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { results } = await res.asyncQuery(`select * from socialize  where type="${type}"`);
        res.send({
            code: 0,
            data: results
        })
    }
}