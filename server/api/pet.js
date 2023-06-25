const express = require("express");
const router = new express.Router();
const Global = require("../global");
const petFn = require('../utils/petFn');
const ArtTable = require("../table/art");
const KnapsackTable = require("../table/knapsack");
const knapsackFn = require("../utils/knapsackFn");
const artFn = require("../utils/artFn");
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
        data:{
            ...data,
            attr: petFn.computeAttr(data)
        }
    })
});

// 宠物状态切换
// state 0休息 1 出战 2 附体 3出售(店铺接口实现)
router.post("/cheng", async (req, res) => {
    const { id, state = 0 } = req.body;
    const { role_attr, pet_pool, ...role } = Global.getRoleGlobal(req);
    const { l: petList } = pet_pool;
    const in_x = petList.findIndex(({ id: petId }) => petId === id);
    if (in_x === -1) {
        res.send({
            code: 100005,
            message: '参数错误。'
        })
        return;
    }
    const pet = Global.getPetGlobal(req) || {};
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
    if (message) {
        res.send({
            code: 0,
            message,
        })
        return;
    }

    const { addition } = role_attr;
    // 判断是否附体
    const appendage = pet.s === 2;
    if (state === 0) {
        if (appendage) {

        }
    }
    // 出战
    if (state === 1) {
        petList[in_x].s = 1;
        Global.updateRoleGlobal(req, {
            pet_pool: {
                l: petList,
                c: petList[in_x],
                x: pet_pool.x
            }
        })
        await Global.setPetGlobal(req);
        Global.updatePetGlobal(req, { state: 1 });
        res.send({
            code: 0,
            data: ''
        })
        return;
    }

    // const data = await petFn.getPetInfo(id);
    // res.send({
    //     code: 0,
    //     data,
    // })
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
    const { l, r } = art[in_x + 1];
    const artInfo = ArtTable[id];
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
    art[in_x + 1] = data.art;
    const updata = {
        art,
    }

    if (data.addition) {
        updata['addition'] = data.addition;
    }
    Global.updatePetGlobal(req, updata);
    console.log(data);
    // const data = await petFn.getPetInfo(id);
    // res.send({
    //     code: 0,
    //     data,
    // })
});




module.exports = router;
