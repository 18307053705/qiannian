// 攻击-基础属性
const AttackBaseAttr = {
    life: 200,
    life_max: 200,
    mana: 150,
    mana_max: 150,
    atk_max: 20,
    atk_min: 10,
    dfs_max: 4,
    dfs_min: 2,
    hit: 2,
    dodge: 1,
    sudden: 1
}

// 防御-基础属性
const DefenseBaseAttr = {
    life: 250,
    life_max: 250,
    mana: 180,
    mana_max: 180,
    atk_max: 15,
    atk_min: 8,
    dfs_max: 5,
    dfs_min: 3,
    hit: 2,
    dodge: 1,
    sudden: 1
}

// 敏捷-基础属性
const AgileBaseAttr = {
    life: 180,
    life_max: 180,
    mana: 120,
    mana_max: 120,
    atk_max: 15,
    atk_min: 8,
    dfs_max: 4,
    dfs_min: 2,
    hit: 4,
    dodge: 2,
    sudden: 2
}


// 均衡职业(怪物)
const AverageBaseAttr =  {
    life: 225,
    mana: 150,
    atk_max: 12,
    atk_min: 10,
    dfs_max: 4,
    dfs_min: 3,
    hit: 3,
    dodge: 1,
    sudden: 2
}

// 元素属性
const AllEleAttr = {
    ice_atk_min: 80,
    ice_atk_max: 120,
    mine_atk_min: 80,
    mine_atk_max: 120,
    wind_atk_min: 80,
    wind_atk_max: 120,
    water_atk_min: 80,
    water_atk_max: 120,
    fire_atk_min: 80,
    fire_atk_max: 120,
    ice_dfs_min: 80,
    ice_dfs_max: 120,
    mine_dfs_min: 80,
    mine_dfs_max: 120,
    wind_dfs_min: 80,
    wind_dfs_max: 120,
    water_dfs_min: 80,
    water_dfs_max: 120,
    fire_dfs_min: 80,
    fire_dfs_max: 120,
}

// 宠物基础元素
const PetBaseEleAttr = {
    1: {
        ice_atk_max: AllEleAttr.ice_atk_max,
        ice_atk_min: AllEleAttr.ice_atk_min,
        ice_dfs_max: AllEleAttr.ice_dfs_max,
        ice_dfs_min: AllEleAttr.ice_dfs_min,
    },
    2: {
        mine_atk_max: AllEleAttr.mine_atk_max,
        mine_atk_min: AllEleAttr.mine_atk_min,
        mine_dfs_max: AllEleAttr.mine_dfs_max,
        mine_dfs_min: AllEleAttr.mine_dfs_min,
    },
    3: {
        wind_atk_max: AllEleAttr.wind_atk_max,
        wind_atk_min: AllEleAttr.wind_atk_min,
        wind_dfs_max: AllEleAttr.wind_dfs_max,
        wind_dfs_min: AllEleAttr.wind_dfs_min,
    },
    4: {
        water_atk_max: AllEleAttr.water_atk_max,
        water_atk_min: AllEleAttr.water_atk_min,
        water_dfs_max: AllEleAttr.water_dfs_max,
        water_dfs_min: AllEleAttr.water_dfs_min,
    },
    5: {
        fire_atk_max: AllEleAttr.fire_atk_max,
        fire_atk_min: AllEleAttr.fire_atk_min,
        fire_dfs_max: AllEleAttr.fire_dfs_max,
        fire_dfs_min: AllEleAttr.fire_dfs_min,
    },
}

// 全部属性初始化
const AllAttrMap = {
    life_max: 0,
    life: 0,
    mana_max: 0,
    mana: 0,
    atk_max: 0,
    atk_min: 0,
    dfs_max: 0,
    dfs_min: 0,
    hit: 0,
    dodge: 0,
    sudden: 0,
    ice_atk_max: 0,
    ice_atk_min: 0,
    ice_dfs_max: 0,
    ice_dfs_min: 0,
    mine_atk_max: 0,
    mine_atk_min: 0,
    mine_dfs_max: 0,
    mine_dfs_min: 0,
    wind_atk_max: 0,
    wind_atk_min: 0,
    wind_dfs_max: 0,
    wind_dfs_min: 0,
    water_atk_max: 0,
    water_atk_min: 0,
    water_dfs_max: 0,
    water_dfs_min: 0,
    fire_atk_max: 0,
    fire_atk_min: 0,
    fire_dfs_max: 0,
    fire_dfs_min: 0,
}


module.exports = {
    AttackBaseAttr,
    DefenseBaseAttr,
    AgileBaseAttr,
    AllEleAttr,
    AllAttrMap,
    PetBaseEleAttr,
    AverageBaseAttr
}