const { TaskSystem } = require('@/system');
module.exports = {
    /**
     * 获取副本列表
     */
    getCopyTaskList: function (req, res) {
        const taskAll = TaskSystem.getCopyTackAll();
        const list = Object.keys(taskAll).map((key) => {
            const { title, level } = taskAll[key];
            return { title, level, id: Number(key) };
        })
        res.send({
            code: 0,
            data: list,
        })
    }
}
