const { ErrorG, ChatG } = require('../../global');

module.exports = {
    /**
     * 发送信息
     * @param {*} req.type 消息类型(0:系统,1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
     * @param {*} req.text 消息内容
     * @param {*} req.t_role 私聊使用
     */
    send: function (req, res) {
        const { type, t_role, text } = req.body;
        if (type == 0 || (type === 1 && !t_role) || !text) {
            ErrorG.paramsError(res);
            return;
        }
        const chat = ChatG.sendChat(req, res, type, text, { t_role });
        res.send({
            code: 0,
            data: chat,
            text: '发送成功！'
        })
    }
}
