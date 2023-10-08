const setCaiLingDong = require('./setCaiLingDong');
const setJinYinDao = require('./setJinYinDao');
const setWorldBoss = require('./setWorldBoss');
const updateCaiLingDong = require('./updateCaiLingDong');
const updateJinYinDao = require('./updateJinYinDao');
const updateWorldBoss = require('./updateWorldBoss');
const getWorldBoss = require('./getWorldBoss');
const getCaiLingDong = require('./getCaiLingDong');
const getJinYinDao = require('./getJinYinDao');
module.exports = {
    ...setWorldBoss,
    ...setJinYinDao,
    ...setCaiLingDong,
    ...updateWorldBoss,
    ...updateJinYinDao,
    ...updateCaiLingDong,
    ...getWorldBoss,
    ...getCaiLingDong,
    ...getJinYinDao
}