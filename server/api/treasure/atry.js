const { KnapsackG, ChatG } = require('@/global');
const { EffectTable } = require('@/table');
module.exports = {
    /**
     * 搏一搏
     */
    atry: function (req, res) {
        const { treasure_pool, role_name } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        // 判断是否已经博过
        if (treasure_pool['fw']['g']) {
            return;
        }
        // 判断元宝是否足够
        if (yuanbao < 200) {
            res.send({ code: 0, message: '元宝不足200' });
            return;
        }
        let rate = Math.floor(Math.random() * (2001 - 0));
        if (rate === 0) {
            rate = 100000;
            ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}搏一搏，天降鸿运获得了豪华住宅【青云观】，快去试一试运气吧。`);
        }
        if (rate < 3) {
            rate = 50000;
            ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}搏一搏，天降鸿运获得了顶级住宅【绿柳庄】，快去试一试运气吧。`);
        }
        if (rate < 10) {
            rate = 10000;
            ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}搏一搏，天降鸿运获得了顶级住宅[红砖屋]，快去试一试运气吧。`);
        }

        const { message } = EffectTable.group1Fn(req, res, `fw-${rate}`);
        if(message){
            res.send({
                code: 0,
                message
            })
            return;
        }
        // EffectTable会改变全局房屋信息,所有需要拉取最新房屋信息
        const { treasure_pool: treasure } = RoleG.getRoleGlobal(req, res);
        treasure['fw']['g'] = 1;
        RoleG.updataRoleGlobal(req, res, { treasure_pool: treasure });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 200 });
        res.send({
            code: 0,
        })
    }
}