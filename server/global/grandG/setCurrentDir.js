const { getDirGlobal } = require('./getDirGlobal');
module.exports = {
    /**
     * 获取全局指令信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} currentDir
     */
    setCurrentDir: function (req, res, currentDir) {
        const dir = getDirGlobal(req, res);
        dir.currentDir = currentDir;
    }

}