const { ErrorG, ChatG } = require('../../global');
module.exports = {
    /**
     * 获取消息
     * @param {*} req.type 消息类型(0:系统,1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
     */
    get: function (req, res) {
        const { type } = req.body;
        if (type === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        res.send({
            code: 0,
            data: ChatG.getChat(req, res, type, true)
        })
    }
}