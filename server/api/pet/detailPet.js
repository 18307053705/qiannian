const { ArtSystem, AttrSystem } = require("@/system");
const { petFn } = require('@/utils');
const { PetG } = require("@/global");

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
        pet.art = pet.art.map(art => {
            const { condition, msg } = ArtSystem.getArt(art.id);
            art.condition = condition;
            art.msg = ArtSystem.getArtMsg({ ...art, msg });
            return art;
        })


        res.send({
            code: 0,
            data: {
                attr: AttrSystem.computePetAttr(pet),
                art: pet.art,
                equip: pet.equip,
                exp: pet.exp,
                flair: pet.flair,
                flair_x: pet.flair_x,
                name: pet.name,
                reborn: pet.reborn,
                level: pet.level,
                type: pet.type,
                isRole: index !== -1,
                state: pet_pool.l[index].s || 0
            }
        })
    }
}
