import React from 'react';
import { backGrand } from '@utils/grand';

const hou = {
    exp: 1000000,
    ext: '0_0_0_0_0_0_0'
}

export const House = () => {
    return (
        <div>
            <div>〓千年第一院〓</div>
            <div>清洁度:100000000</div>
            <div><span className='g_u_end'>清洁(20元宝)</span></div>
            <div><span className='g_u_end'>装修(100声望)</span></div>
            <div>生命[+1000000]</div>
            <div>法力[+1000000]</div>
            <div>玉瓷百花瓶(0) | <span className='g_u_end'>摆放</span></div>
            <div>檀木花纹桌(0) | <span className='g_u_end'>摆放</span></div>
            <div>红杏闹春帘(0) | <span className='g_u_end'>摆放</span></div>
            <div>日月春秋床(0) | <span className='g_u_end'>摆放</span></div>
            <div>锦绣山河画(0) | <span className='g_u_end'>摆放</span></div>
            <div>江山社稷图(0) | <span className='g_u_end'>摆放</span></div>
            <div>九州观星台(0) | <span className='g_u_end'>摆放</span></div>

            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default House;