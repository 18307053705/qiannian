const JSON_KEYS = [
    'equip_pool',
    'socialize_pool',
    'skill_pool',
    'base_pool',
    'addition_pool',
    'buff_pool',
    'reputation_pool',
    'task_pool',
    'can_task_pool'
];


// key  gang intersect ranks
module.exports = {
    JSON_KEYS,
    socializeGlobal: {
        // key：soci_id_key { type:1,line:{role_id:level},buff:{text,value},num:1] }
    },
    // 设置势力全局信息
    setSocializeGlobal: function (req) {
        const { role_id, role_level, socialize_pool } = this.getRoleGlobal(req);
        Object.keys(socialize_pool).forEach(key => {
            let keyName = `${socialize_pool[key].id}_${key}`;
            const socialize = this.socializeGlobal[keyName];
            if (socialize) {
                socialize['line'][role_id] = role_level;
            } else {
                this.socializeGlobal[keyName] = {
                    line: {
                        [role_id]: role_level
                    },
                    buff: { text: 'buff', value: 0 }
                }
            }
        })
    },
    // 获取势力全局信息
    getSocializeGlobal: function (soci_id, key) {
        let keyName = `${soci_id}_${key}`
        const socialize = this.socializeGlobal[keyName];
        return socialize;
    },
    // 释放所在势力信息
    releaseSocializeGlobal: function (role_id, socialize_pool) {
        Object.keys(socialize_pool).forEach(key => {
            let keyName = `${socialize_pool[key].id}_${key}`;
            const socialize = this.socializeGlobal[keyName];
            if (socialize) {
                delete socialize['line'][role_id];
                this.socializeGlobal[keyName] = socialize;
            }
        })
    }

}
