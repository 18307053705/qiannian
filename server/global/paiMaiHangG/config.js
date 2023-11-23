
const TIMER_CPNFIG = {
    offer_id: '', // 对应拍卖物品唯一标识
    index: undefined, // 延时器标识,
};
// const OUT_TIME = 600000;
const OUT_TIME = 30000;
const PAI_MAI_HANG_Global = [
    // {
    //  id: 1, // 物品id
    //  type: 2, // 物品类型
    //  name: '世界声望卷轴', // 物品名称
    //  role_name: '林素清', // 拍卖人名称
    //  role_id: '林素清id', // 拍卖人id
    //  price: 1000, // 拍卖价格
    //  time: 600, // 拍卖时间(秒)
    //  id_p: 1, // 唯一标识(上架时间戳_物品id_拍卖人id)
    //  offer_id:  出价人id，没有代表流拍
    //  out_timer 过期时间戳,
    // },
]

module.exports = {
    PAI_MAI_HANG_Global,
    TIMER_CPNFIG,
    OUT_TIME
}