const { DailysG, RoleG } = require("../../global");
module.exports = {
    /**
     * 战场排名
     */
    rank: async function (req, res) {
        const dailys = DailysG.getDailysGlobalAll();
        const { role_id } = RoleG.getRoleGlobal(req, res);
        let list = [];
         Object.values(dailys).forEach(({ zhanChang }) => {
            if(zhanChang.d){
                list.push(zhanChang)
            }
         });
        list = list.sort((pre, next) => {
            if (pre.j === next.j) {
                return pre.d - next.d;
            }
            return next.j - pre.j;
        })
        res.send({
            code: 0,
            data: {
                list,
                role_id
            }
        })

    }
}
