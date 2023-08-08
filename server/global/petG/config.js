const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];

module.exports = {
    PET_JSON_KEYS,
    petGlobal: {
        // key：role_id {...petInfo,updateKeys:[] }
        // updateKeys 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    },
}