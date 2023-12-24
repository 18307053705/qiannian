const { equipFn } = require('../../utils');
module.exports = {
    /**
     * 打造装备的信息
     * @param {*} req.equipId
     */
    makeEquipInfo: (req, res) => {
        const { equipId } = req.body;
        if (!equipId) {
            ErrorG.paramsError(res);
            return;
        }
        const equip = equipFn.getEquipInfo(equipId);
        res.send({
            code: 0,
            data: {
                ...equipFn.getMakeInfo(equip),
                equip
            }
        })
    }
};
