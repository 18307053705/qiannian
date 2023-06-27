import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { Tab } from '@components';
import { getTreasure, setTreasure } from '@cgi/treasure';


export const Cornucopia = ({ history }) => {
    const [data, setData] = useState();

    return (
        <div>
            <div>提示：成功率10%[各项材料不得少于60]</div>
            <div>=============</div>
            <div>水:60<span className="g_u_end">+材料0</span></div>
            <div>火:60<span className="g_u_end">+材料0</span></div>
            <div>风:60<span className="g_u_end">+材料0</span></div>
            <div>雷:60<span className="g_u_end">+材料0</span></div>
            <div>冰:60<span className="g_u_end">+材料0</span></div>
            <div>=============</div>
            <div>
                <span>聚宝盆目标:</span>
                <span className="g_u_end">一级房屋宝石</span>
                <span> | </span>
                <span className="g_u_end">[换]</span></div>
            <div><span>聚宝盆等级:0</span></div>
            <div>
                <span>有效抽奖次数:(0/3)</span>
                <span className="g_u_end">[抽奖]</span></div>
            <div>提示:玩家的聚宝盆等级越高,影响获得商城道具的概率以及成功率。</div>
            <div><span onClick={() => { history.push('./treasure') }} className="g_u_end">返回珍宝</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Cornucopia;