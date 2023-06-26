const express = require("express");
const router = new express.Router();
const Global = require("../global");
const petFn = require('../utils/petFn');
const ArtTable = require("../table/art");
const KnapsackTable = require("../table/knapsack");
const EquipTable = require("../table/equip");
const knapsackFn = require("../utils/knapsackFn");
const artFn = require("../utils/artFn");
const equipFn = require("../utils/equipFn");
// 灵兽山砸宠
router.post("/add", async (req, res) => {
    const { pet_pool } = Global.getRoleGlobal(req);
    if (pet_pool['l'].length >= pet_pool['x']) {
        res.send({
            code: 0,
            message: '宠物房已满,无法获得更多宠物。'
        })
        return;
    }


    const data = await petFn.setPet(req, { name: '〓九翼天冰龙〓(冰)', type: 1, flair_x: 100, ele: 1 });


    res.send({
        code: 0,
        data
    })
});


// 获取宠物详情
router.post("/detail", async (req, res) => {
    const { id } = req.body;
    const { id: petId, ...pet } = Global.getPetGlobal(req) || {};
    const data = petId === id ? { ...pet, id } : await petFn.getPetInfo(id);


    res.send({
        code: 0,
        data: {
            ...data,
            attr: petFn.computeAttr(data)
        }
    })
});

// 宠物状态切换
// state 0休息 1 出战 2 附体 3出售(店铺接口实现)
router.post("/cheng", async (req, res) => {
    const { id, state = 0 } = req.body;
    const { pet_pool, role_id } = Global.getRoleGlobal(req);
    const { l: petList } = pet_pool;
    const in_x = petList.findIndex(({ id: petId }) => petId === id);
    if (in_x === -1) {
        res.send({
            code: 100005,
            message: '参数错误。'
        })
        return;
    }
    const pet = Global.getPetGlobal(req) || { art: [] };
    const { l, v } = pet['art'][1] || {};
    let message = '';
    // 休息验证
    if (state === 0 && pet.id !== id) {
        message = '宠物已经处于休息状态,无法重复操作。'
    }
    // 出战验证
    if (state === 1 && pet.id === id) {
        message = '宠物已经处于出战状态,无法重复操作。'
    }
    // 出战验证
    if (state === 1 && pet.id) {
        message = '只能出战一只宠物,无法继续出战。'
    }
    // 附体验证
    if (state === 2 && pet.id !== id) {
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
    Global.updateRoleGlobal(req, {
        pet_pool: {
            l: petList,
            c: c_pet,
            x: pet_pool.x
        }
    })
    // 更新角色宠物全局信息
    Global.updatePetGlobal(req, { state });
    // 休战 释放宠物全局信息
    if (state === 0) {
        await Global.savePet(role_id);
    }
    // 出战 设置宠物全局信息,并更新状态为出战
    if (state === 1) {
        await Global.setPetGlobal(req);
        Global.updatePetGlobal(req, { state: 1 });
    }
    let success = '';
    // 附体
    if (state === 2) {
        const { life } = petFn.computeAttr(pet, { life: 0 });
        success = `附体成功,玩家生命上限+${parseInt(life * v / 100)}`;

    }
    res.send({
        code: 0,
        success,
        data: c_pet
    })
    return;
});


// 宠物学习技能
router.post("/studyArt", async (req, res) => {
    const { in_x, id } = req.body;
    if (!id) {
        res.send({
            code: 100005,
            message: '参数错误。'
        })
        return;
    }
    const { id: petId, art, level } = Global.getPetGlobal(req) || {};
    if (id !== petId) {
        res.send({
            code: 0,
            message: '请先将宠物参战。'
        })
        return;
    }
    const { l, id: artId } = art[in_x + 1];
    if (artId === 19 && l === 9) {
        res.send({
            code: 0,
            message: '附体技能已经达到最大等级。'
        })
        return;
    }
    const artInfo = ArtTable[artId];
    let artRes = {
        message: '',
        up_art: '',
    }
    // 领悟技能
    if (l === -1) {
        if (artInfo.condition > level) {
            artRes.message = '等级不足，无法领悟该技能';
        } else {
            // 消耗宠物技能卷
            artRes.up_art = artFn.artLevelCompute({ l: 0, r: 0 });
            const article = KnapsackTable[158];
            const { message } = knapsackFn.deleteKnapsack(req, { [158]: { ...article, p: article['type'], s: 1 } });
            artRes.message = message;
        }
    } else {
        artRes = artFn.getMaterial(req, art[in_x + 1]);
    }
    const { up_art, message } = artRes;
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }

    const data = artFn.petArtUpAttrfunction(req, art[in_x + 1], { l: up_art.l, r: up_art.r });
    art[in_x + 1] = petFn.getArttips(data.art);
    const updata = {
        art,
    }

    if (data.addition) {
        updata['addition'] = data.addition;
    }
    Global.updatePetGlobal(req, updata);
    res.send({
        code: 0,
        data: 'ok',
    })
});

// 宠物佩戴装备
router.post("/equip", async (req, res) => {
    const { in_x, type, posKey } = req.body;
    if (!(type && in_x !== undefined)) {
        res.send({
            code: 100005,
            message: '参数错误。'
        })
        return;
    }
    const { id, equip, level, addition } = Global.getPetGlobal(req) || {};
    if (!id) {
        res.send({
            code: 0,
            message: '请先将宠物参战。'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const equip_data = data[in_x];
    // 佩戴
    if (type === 1 && equip_data && equip_data['p'] === 3) {
        const { message, replace } = equipFn.wearEquip(posKey, data[in_x], level, equip, addition);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        !replace && data.splice(in_x, 1);
    }
    // 卸下
    if (type === 2) {
        if (data.length === KnapsackTable.size) {
            res.send({
                code: 0,
                message: '背包空间不足,请先清理配背包。'
            })
            return;
        }
        const itme = equipFn.unloadEquip(in_x, equip, addition);
        if (itme) {
            data.push(itme);
        }
    }
    Global.updateknapsackGlobal(req, { data });
    Global.updatePetGlobal(req, {
        addition,
        equip
    });
    res.send({
        code: 0,
        data: 'ok',
    })
});


// 宠物资质提升
router.post("/flair", async (req, res) => {
    const { id, flair_x, flair } = Global.getPetGlobal(req) || {};
    if (!id) {
        res.send({
            code: 0,
            message: '请先将宠物参战。'
        })
        return;
    }
    if (flair_x === flair) {
        res.send({
            code: 0,
            message: '当前宠物资质已满,无法继续提升。'
        })
        return;
    }
    const article = {
        [159]: {
            ...KnapsackTable[159],
            s: flair + 1
        }
    }
    const { message } = knapsackFn.deleteKnapsack(req, article);
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    Global.updatePetGlobal(req, { flair: flair + 1 });
    res.send({
        code: 0,
        success: `消耗${flair + 1}宠物进化卷,宠物资质+1`,
        data: 'ok',

    })
});


// 宠物转世
router.post("/reborn", async (req, res) => {
    const { id, flair_x, flair, reborn } = Global.getPetGlobal(req) || {};
    if (!id) {
        res.send({
            code: 0,
            message: '请先将宠物参战。'
        })
        return;
    }
    if (flair_x !== flair || reborn === 3) {
        res.send({
            code: 0,
            message: '当前宠物不满足转世条件。'
        })
        return;
    }
    const article = {
        [160]: {
            ...KnapsackTable[160],
            s: reborn + 1
        }
    }
    const { message } = knapsackFn.deleteKnapsack(req, article);
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    Global.updatePetGlobal(req, { reborn: reborn + 1, flair_x: flair_x + 1 });
    res.send({
        code: 0,
        success: `消耗${reborn + 1}宠物转生卷,宠物先天资质+1`,
        data: 'ok',

    })
});
module.exports = router;
