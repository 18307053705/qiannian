import React from 'react';
import { backGrand } from '@utils';
import { gather } from '@cgi/synthesis';
const TianCaiDiBao = () => {
    return (
        <div>
            
            <div>洞府内太阴石，太阳石，凝血草，聚气草这些外界极为稀有的天材地宝这里竟然到处都是。</div>
            <div style={{ lineHeight: "24px" }}>
                采集天材地宝有概率遇到守护妖兽，击杀后有概率获得冰，雷，风，水，火先天灵石。
            </div>
            <div><span className='g_u_end' onClick={gather}>采集天材地宝</span></div>
            <div><span className='g_u_end' onClick={backGrand}>离开洞天</span></div>

        </div>
    )
}

export default TianCaiDiBao;