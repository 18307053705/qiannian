module.exports = {
    dir: {
        // role_id: { 
        //   moveDir: [], 地图移动指令
        //   eleDir: {}, 地图元素指令
        //   extDir:{} 元素扩展信息，比如怪物元素：怪物id，npc元素：剧情ID，建筑元素：活动ID，背包ID，仓库ID等..
        //   dirDisable:false
        // }
    },
    setDir: function (req, dir) {
        const { role_id } = this.getRoleGlobal(req);
        this["dir"][role_id] = dir;
    },
    getDir: function (req) {
        const { role_id } = this.getRoleGlobal(req);
        return this["dir"][role_id];

    }
};

