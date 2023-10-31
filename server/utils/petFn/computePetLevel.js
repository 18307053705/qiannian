const { PetG } = require("../../global");
const { computeUpExp } = require("../roleFn/computeUpExp");
module.exports = {
    /**
     * 计算人物等级
     * @param {*} req 
     * @param {*} res 
     * @param {*} exp 增加的经验
     * @param {*} callback 回调函数(isLevel:是否升级,updata:需要更新的对象,name:宠物名称)=>{}
     * @returns {*} roleInfo |undefined
     * 
     */
    computePetLevel: function (req, res, addExp, callback) {
        let { exp, level, name } = PetG.getPetGlobal(req, res)
        let [oldExp, upExp] = exp.split('/');
        let current = Number(oldExp) + addExp;
        let isLevel = false;
        // 当前经验大于升级经验,处理升级逻辑
        if (current >= upExp && level < 100) {
            isLevel = true;
            current -= upExp;
            // 角色升级
            level++;
            // 计算下级所需经验
            upExp = Math.floor(computeUpExp(level) * 0.7);
        }
        const update = {
            exp: `${current}/${upExp}`,
            level
        }
        callback && callback(isLevel, update, name);
        return PetG.updataPetGlobal(req, res, update);

    }
};
