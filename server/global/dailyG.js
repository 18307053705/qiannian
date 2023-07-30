// 每日池子,例如副本次数，每日任务，珍宝免费操作次数，及后续其他每日重置的功能
module.exports = {
    /**
     * 
     */
    treasurePool: {
        // role:{fw:0,xz:0,lp:0,hb:0}
    },
    setTreasureGlobal(role_id) {
        if(!this.treasurePool[role_id]){
            this.treasurePool[role_id] = { fw: 0, xz: 0, lp: 0, hb: 0 };
        }
    },
    getTreasureGlobal(req) {
        const { role_id } = this.getRoleGlobal(req);
        return this.treasurePool[role_id] || {}
    },
    updataTreasureGlobal(req, data) {
        const { role_id } = this.getRoleGlobal(req);
        this.treasurePool[role_id] = {
            ...this.treasurePool[role_id],
            ...data
        }
    },
    initDailyGlobal(role_id){
        // 初始化珍宝免费此时
        this.setTreasureGlobal(role_id)
    },

};
