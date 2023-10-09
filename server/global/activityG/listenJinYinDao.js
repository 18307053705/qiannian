const { updateJinYinDao } = require('./updateJinYinDao');

module.exports = {
    /**
     * 监听金银岛
     */
    listenJinYinDao: function (req, res, currentDir) {
        const { jyd, name } = currentDir;
        if (jyd) {
            res.listText.push(`获得${name},帮会积分+${jyd}`);
            updateJinYinDao(req, res, { integral: jyd });
            return;
        }
    }
}