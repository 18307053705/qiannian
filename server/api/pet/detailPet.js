const { petFn } = require('../../utils');
const { PetG, ErrorG, RoleG } = require("../../global");
module.exports = {
    /**
     * 宠物详情
     * @param {*} req.petId
     */
    detailPet: async function (req, res) {
        const { petId } = req.body;
        if (!petId) {
            ErrorG.paramsError(res);
            return;
        }
        const { pet_pool } = RoleG.getRoleGlobal(req, res)
        const index = pet_pool.l.findIndex(({ id }) => id === petId);
        let pet = PetG.getPetGlobal(req, res) || {};
        if (petId !== pet.id) {
            pet = await petFn.getPetInfo(req, res, petId);
        }
        res.send({
            code: 0,
            data: {
                ...pet,
                attr: petFn.computePetAttr(pet),
                isRole: index !== -1,
                state: pet_pool.l[index].s || 0
            }
        })
    }
}
