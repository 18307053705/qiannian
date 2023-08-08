const { RoleG } = require("../../global");
const { petFn } = require('../../utils');

module.exports = {
    /**
     * 灵兽山砸宠
     * @param {*} req
     */
    drawPet: async function (req, res) {
        const { pet_pool } = RoleG.getRoleGlobal(req, res);
        if (pet_pool['l'].length >= pet_pool['x']) {
            res.send({
                code: 0,
                message: '宠物房已满,无法获得更多宠物。'
            })
            return;
        }
        const data = await petFn.setPet(req, res, { name: '〓九翼天冰龙〓(冰)', type: 1, flair_x: 100, ele: 1 });


        res.send({
            code: 0,
            data
        })
    }
}
