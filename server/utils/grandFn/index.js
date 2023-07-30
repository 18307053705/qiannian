const getGrandInfo = require('./getGrandInfo');
const enterDir = require('./enterDir');
const moveDir = require('./moveDir');
const panelDir = require('./panelDir');
const tpDir = require('./tpDir');
const updataDir = require('./updataDir');

module.exports = {
  ...getGrandInfo,
  ...enterDir,
  ...moveDir,
  ...panelDir,
  ...tpDir,
  ...updataDir,
}