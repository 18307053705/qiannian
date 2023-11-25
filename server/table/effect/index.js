const {group1Fn} = require('./group1Fn');
const {group2Fn} = require('./group2Fn');
const {group3Fn} = require('./group3Fn');
const { effect1Fn } = require('./effect1Fn');


module.exports = {
    /**
     * 直接增加玩家属性的物品
     * @param {*} req 
     * @param {*} res 
     * @param {key_value} group
     * @param {number} s 使用数量
     * @returns { string } message 错误信息,存在则使用失败
     * @returns { string } text 使用成功信息,存在则使用成功
     */
    group1Fn,
    /**
    * 直接增加玩家属性的物品
    * @param {*} req 
    * @param {*} res 
    * @param {key_value} group
    * @param {number} s 使用数量
    * @returns { string } message 错误信息,存在则使用失败
    * @returns { string } text 使用成功信息,存在则使用成功
    */
    group2Fn,
    group3Fn,
    /**
     * 
     * @param {*} effect 效果
     * @param {*} attr 需要增加的属性
     * @param {*} base 基础属性
     */
    effect1Fn,
}