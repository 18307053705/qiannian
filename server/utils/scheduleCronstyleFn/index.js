const schedule = require('node-schedule');
const mysql = require("@/mysql");
const { ActiveQueueG } = require("@/global");
const roleFn = require("../roleFn");
// 十分钟时间戳
// const time = 6000000;

// const time = 5000;
// 定时清除长时间不访问的角色全局空间
// setInterval(() => {
//     const roles = RoleG.ROLE_Global;
//     Object.keys(roles).forEach(user => {
//         const role = roles[user];
//         // 超过十分钟不访问的角色,释放对应全局空间
//         if (new Date() * 1 - role.time > time) {
//             roleFn.roleExit({ cookies: { q_uid: user } }, { asyncQuery: mysql.asyncQuery }, user);
//         }
//     })

// }, time)

// 每分钟的第30秒触发： '30 * * * * *'

// 每小时的1分30秒触发 ：'30 1 * * * *'

// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

const scheduleCronstyle = () => {
    // ActiveQueueG.openZhanChang();
    // ActiveQueueG.openWorldBoss();
    // ActiveQueueG.openCaiLingDong();
    // ActiveQueueG.openJinYindao();
    // 每天19点 开启上古战场
    schedule.scheduleJob('0 0 19 * * *', () => {
        ActiveQueueG.openZhanChang();
    })
    // 每天12点 16点 20点 开启世界BOSS
    schedule.scheduleJob('0 0 12,16,20 * * *', () => {
        ActiveQueueG.openWorldBoss();
    })
    // 每日21点 开启彩灵洞活动
    schedule.scheduleJob('0 0 21 * * *', () => {
        ActiveQueueG.openCaiLingDong();
    })
    // 周六,周日22点 开启金银岛活动
    schedule.scheduleJob('0 0 22 * * 0,6', () => {
        ActiveQueueG.openJinYindao();
    })
}

// scheduleCronstyle();
module.exports = {
    /**
     * 定时任务队列
     */
    scheduleCronstyle,
    ACTIVE_QUEUE: ActiveQueueG.ACTIVE_QUEUE
}