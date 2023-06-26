import React, { useState } from 'react';
import { backGrand } from '@utils/grand';
import { Tab } from '@components';
const tabList = [
    { value: 0, label: "勋章" },
    { value: 1, label: "令牌" },
    { value: 2, label: "徽标" }
];

const XZ = ['勋章', '令牌', '徽标']

 var a = {fw:{exp:10000000,ext:'10_10_10_10_10_10_10'},xz:1000000,hb:10000000,lp:10000000}

JSON.stringify(a)
export const Treasure = () => {
    return (
        <div>
            <Tab list={tabList} />
            <div>级别:〓千年第一院〓</div>
            <div>忠义:100000000</div>
            {/* <div>已达到顶级不能再操作。</div> */}
            <div><span className='g_u_end'>打磨(20元宝)</span></div>
            <div><span className='g_u_end'>精磨(100声望)</span></div>
            <div>攻击[1000000-2000000]</div>
            <div>命中[1000]</div>


            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Treasure;