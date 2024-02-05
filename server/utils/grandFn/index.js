const getGrandInfo = require('./getGrandInfo');
const enterDir = require('./enterDir');
const moveDir = require('./moveDir');
const panelDir = require('./panelDir');
const tpDir = require('./tpDir');
const tpDirUpdate = require('./tpDirUpdate');
const updataDir = require('./updataDir');
const backGrand = require('./backGrand');

module.exports = {
  ...getGrandInfo,
  ...enterDir,
  ...moveDir,
  ...panelDir,
  ...tpDir,
  ...tpDirUpdate,
  ...updataDir,
  ...backGrand
}