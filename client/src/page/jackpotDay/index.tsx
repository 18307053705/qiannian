import React, { useState } from "react";
import { backGrand } from '@utils/grand';
import { jackpotDay } from '@cgi/jackpot';
import Styles from './index.less';
export const JackpotDay = () => {
    const [list, setList] = useState([]);
    const drawClick = () => {
        jackpotDay().then(({ data }) => {
            setList(data || []);
        })
    }

    return (
        <div>
            <div className={Styles.tips}>今日首次登录，机会获得灵血，银两，元宝，材料及各种丹药。</div>
            {
                list.map(({ name, value }, index) => <div key={index}>{name}+{value}</div>)
            }
            <div><span className="g_u_end" onClick={drawClick}>开始抽奖</span></div>
            <div>
                提示：每日首次登录即可抽奖，运气好更是可获得元宝奖励。
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default JackpotDay;

