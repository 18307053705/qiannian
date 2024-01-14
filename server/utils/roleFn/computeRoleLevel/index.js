const { getPetGlobal } = require("@/global/petG/getPetGlobal");
const { computeUpExp } = require("../computeUpExp");
const { pushTask } = require("./pushTask");
const AttrSystem = require('@/system/AttrSystem');
module.exports = {
    /**
     * 计算人物等级
     * @param {*} req 
     * @param {*} res 
     * @param {*} exp 增加的经验
     * @param {*} callback 回调函数(isLevel:是否升级,updata:需要更新的对象)=>{}
     * @returns {*} roleInfo |undefined
     * 
     */
    computeRoleLevel: function (req, res, exp, callback) {
        const roleInfo = RoleG.getRoleGlobal(req, res);
        let { role_level, role_exp } = roleInfo;
        let [oldExp, upExp] = role_exp.split('/');
        let current = Number(oldExp) + exp;
        let islevel = false;
        // 当前经验大于升级经验,处理升级逻辑
        if (current >= upExp && role_level < 240) {
            while (current >= upExp && role_level < 240) {
                // 扣除升级经验
                current -= upExp;
                // 角色升级
                role_level++;
                // 计算下级所需经验
                upExp = computeUpExp(role_level);
                // 推送任务
                pushTask(req, res, role_level);
            }
            res.customSuccess = `恭喜玩家升到${role_level}级。`
            islevel = true;

        }
        const update = {
            role_exp: `${current}/${upExp}`,
            role_level
        }

        if (islevel) {
            const pet = getPetGlobal(req, res, roleInfo.role_id);
            const { attr } = AttrSystem.computeRoleAttr({ ...roleInfo, role_level }, { pet, keys: ['life_max', 'mana_max'] });
            update['life'] = attr.life_max;
            update['mana'] = attr.mana_max; 
        }
        callback && callback(islevel, update);
        return RoleG.updataRoleGlobal(req, res, update);

    }
};


