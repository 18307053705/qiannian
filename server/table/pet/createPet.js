const petList = require('./petList');

const ELE_MEN = {
    1: '[冰]',
    2: '[雷]',
    3: '[风]',
    4: '[水]',
    5: '[火]',
}


module.exports = {
    /**
     * 宠物id
     * @param {*} id 生成的宠物id
     * @param {*} pet.type 生成的宠物,默认随机
     * @param {*} pet.ele 生成的宠物元素,默认随机
     * @returns pet.name
     * @returns pet.flair_x
     * @returns pet.type
     * @returns pet.ele
     */
    createPet: function (id, { type, ele }={}) {
        let pet = petList[id];
        if (!pet) {
            return undefined;
        }
        pet = JSON.parse(JSON.stringify(petList[id]));
        pet.type = type || Math.floor(Math.random() * 3) + 1;
        if (pet.flair_x >= 80) {
            pet.ele = ele || Math.floor(Math.random() * 5) + 1;
            pet.name += ELE_MEN[pet.ele];
        }
        return pet;

    }

}