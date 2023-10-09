const openCaiLingDong = require('./openCaiLingDong');
const openJinYinDao = require('./openJinYinDao');
const openWorldBoss = require('./openWorldBoss');
const updateCaiLingDong = require('./updateCaiLingDong');
const updateJinYinDao = require('./updateJinYinDao');
const updateWorldBoss = require('./updateWorldBoss');
const getWorldBoss = require('./getWorldBoss');
const getCaiLingDong = require('./getCaiLingDong');
const getJinYinDao = require('./getJinYinDao');
const listenCaiLingDong = require('./listenCaiLingDong');
const listenJinYinDao = require('./listenJinYinDao');
const closeCaiLingDong = require('./closeCaiLingDong');
const closeJinYindao = require('./closeJinYindao');
const closeWorldBoss = require('./closeWorldBoss');

module.exports = {
    ...openWorldBoss,
    ...openJinYinDao,
    ...openCaiLingDong,
    ...updateWorldBoss,
    ...updateJinYinDao,
    ...updateCaiLingDong,
    ...getWorldBoss,
    ...getCaiLingDong,
    ...getJinYinDao,
    ...listenCaiLingDong,
    ...listenJinYinDao,
    ...closeCaiLingDong,
    ...closeJinYindao,
    ...closeWorldBoss,
}