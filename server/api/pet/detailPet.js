const { petFn } = require('../../utils');

module.exports = {
    /**
     * 宠物详情
     * @param {*} req.petId
     */
    detailPet: async function (req, res) {
        const { petId } = req.body;
        const pet = await petFn.getPetInfo(req, res, petId);
        res.send({
            code: 0,
            data: pet
        })
    }
}
