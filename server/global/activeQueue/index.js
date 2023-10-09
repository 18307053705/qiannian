const activityG = require('../activityG')

const ACTIVE_QUEUE = {
    JinYindao: false, // 金银岛
    CaiLingDong: false, // 彩灵洞
    WorldBoss: false, // 世界BOSS
    ZhanChang: false, // 上古战场
};

module.exports = {
    /**
     * 金银岛活动开启
     */
    openJinYindao: function () {
        ACTIVE_QUEUE[JinYindao] = true;
        activityG.openJinYinDao();
    },
    /**
    * 彩灵洞活动开启
    */
    openCaiLingDong: function () {
        ACTIVE_QUEUE[CaiLingDong] = true;
        activityG.openCaiLingDong();
    },
    /**
    * 世界BOSS活动开启
    */
    openWorldBoss: function () {
        ACTIVE_QUEUE[WorldBoss] = true;
        activityG.openWorldBoss();
    },
    /**
    * 上古战场活动开启
    */
    openZhanChang: function () {
        ACTIVE_QUEUE[ZhanChang] = true;
    },
     /**
     * 金银岛活动关闭
     */
     closeJinYindao: function () {
        ACTIVE_QUEUE[JinYindao] = false;
        activityG.closeJinYindao();
    },
    /**
    * 彩灵洞活动关闭
    */
    closeCaiLingDong: function () {
        ACTIVE_QUEUE[CaiLingDong] = false;
        activityG.closeCaiLingDong();
    },
    /**
    * 世界BOSS活动关闭
    */
    closeWorldBoss: function () {
        ACTIVE_QUEUE[WorldBoss] = false;
        activityG.closeWorldBoss();
    },
    /**
    * 上古战场活动关闭
    */
    closeZhanChang: function () {
        ACTIVE_QUEUE[ZhanChang] = false;
    },
    /**
     * 获得金银岛活动是否开启
     */
    getJinYindao: function () {
        return ACTIVE_QUEUE[JinYindao];
    },
    /**
    * 获得彩灵洞活动是否开启
    */
    getCaiLingDong: function () {
        return ACTIVE_QUEUE[CaiLingDong];
    },
    /**
    * 获得世界BOSS活动是否开启
    */
    getWorldBoss: function () {
        return ACTIVE_QUEUE[WorldBoss];
    },
    /**
    * 获得上古战场活动是否开启启
    */
    getZhanChang: function () {
        return ACTIVE_QUEUE[ZhanChang];
    },
};

