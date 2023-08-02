const { SOCIALIZE_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 释放全局势力信息
     * @param {*} req
     * @param {*} res
     */
    releaseSocializeGlobal: function (req, res) {
        const { socialize_pool } = roleG.getRoleGlobal(req, res);
        Object.keys(socialize_pool).forEach(key => {
            let keyName = `${socialize_pool[key].id}_${key}`;
            const socialize = SOCIALIZE_Global[keyName];
            if (socialize) {
                socialize['num'] -= 1;
                // 判断是否成员在线
                if(socialize['num']){
                    delete socialize['line'][role_id];
                    SOCIALIZE_Global[keyName] = socialize;
                }else{
                    // 无成员则释放整个势力
                    delete SOCIALIZE_Global[keyName];
                }
               
            }
        })
    }

}