const { ErrorG, RoleG, PetG } = require("../../global");
const { petFn } = require('../../utils');
module.exports = {
    /**
     * 切换宠物状态
     * @param {*} req.state 状态(0:休息,1:出战,2:附体,3:挂售)
     * @param {*} req.petId
     */
    petStatu: async function (req, res) {
        const { petId, state } = req.body;
        if (!petId || state === undefined) {
            ErrorG.paramsError(res);
            return;
        }

        const { pet_pool, role_id } = RoleG.getRoleGlobal(req, res);
        const { l: petList } = pet_pool;
        const in_x = petList.findIndex(({ id }) => petId === id);
        if (in_x === -1) {
            res.send({
                code: 0,
                message: '宠物信息有误'
            })
            return;
        }
        const pet = PetG.getPetGlobal(req, res) || { art: [] };
        const { l, v } = pet['art'][1] || {};
        let message = '';
        // 休息验证
        if (state === 0 && pet.id !== petId) {
            message = '宠物已经处于休息状态,无法重复操作。'
        }
        // 出战验证
        if (state === 1 && pet.id === petId) {
            message = '宠物已经处于出战状态,无法重复操作。'
        }
        // 出战验证
        if (state === 1 && pet.id) {
            message = '只能出战一只宠物,无法继续出战。'
        }
        // 附体验证
        if (state === 2 && pet.id !== petId) {
            message = '未出战宠物,无法进行附体。'
        }
        // 附体验证
        if (state === 2 && l === -1) {
            message = '宠物暂时未领悟附体技能。'
        }
        if (message) {
            res.send({
                code: 0,
                message,
            })
            return;
        }
        // 更新角色宠物信息
        petList[in_x].s = state;
        const c_pet = state ? petList[in_x] : {};
        RoleG.updataRoleGlobal(req, res, {
            pet_pool: {
                l: petList,
                c: c_pet,
                x: pet_pool.x
            }
        })
        // 更新角色宠物全局信息
        PetG.updataPetGlobal(req, res, { state });
        // 休战 释放宠物全局信息
        if (state === 0) {
            await PetG.savePetSql(req, res);
        }
        // 出战 设置宠物全局信息,并更新状态为出战
        if (state === 1) {
            await PetG.setPetGlobal(req, res);
            PetG.updataPetGlobal(req, res, { state: 1 });
        }
        let success = '';
        // 附体
        if (state === 2) {
            const { life } = petFn.computePetAttr(pet, { life: 0 });
            success = `附体成功,玩家生命上限+${parseInt(life * v / 100)}`;

        }
        res.send({
            code: 0,
            success,
            data: c_pet
        })
        return;
    }
}