const { WORLD_BOSS } = require('./config');

module.exports = {
    /**
     * 关闭世界boss
     */
    closeWorldBoss: function () {
        if (!WORLD_BOSS.create) {
            return;
        }
        WORLD_BOSS.create = false;
        // 判断boss是否死亡，是则等级+1
        if (WORLD_BOSS.boss.life <= 0) {
            WORLD_BOSS.level += 1;
        }
    }
}