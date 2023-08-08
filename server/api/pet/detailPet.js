const { petFn } = require('../../utils');
const { PetG } = require("../../global");
module.exports = {
    /**
     * 宠物详情
     * @param {*} req.petId
     */
    detailPet: async function (req, res) {
        const { petId } = req.body;
        let pet = PetG.getPetGlobal(req, res) || {};
        console.log()
        if (petId !== pet.id) {
            pet = await petFn.getPetInfo(req, res, petId);
        }
        res.send({
            code: 0,
            data: {
                ...pet,
                attr: petFn.computePetAttr(pet)
            }
        })
    }
}
