import React, { useState } from 'react';
import { List, Tab } from '@components';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';


export default () => {
    const [page, setPage] = useState(1)



    return (
        <div>
             <div>恭喜玩家已修炼至最高境界！</div>
            <div>=================</div>
            <div>当前境界：凡人境</div>
            <div>元素属性</div>
            <div>冰攻：20000</div>
            <div>风攻：20000</div>
            <div>雷攻：20000</div>
            <div>水攻：20000</div>
            <div>火攻：20000</div>
            <div>冰防：20000</div>
            <div>风防：20000</div>
            <div>雷防：20000</div>
            <div>水防：20000</div>
            <div>火防：20000</div>
            <div>总潜力值：300<span className='g_u_end'>重置潜力</span></div>
            <div>可用潜力：100<span className='g_u_end'>分配潜力</span></div>
            <div>=================</div>
            <div>下个境界需玩家达到10级方可开启！</div>
            <div><span className='g_u_end'>突破淬体初期</span></div>
            <div>
                <span className="g_u_end" onClick={backGrand}>返回游戏</span>
            </div>
        </div>
    )

}
