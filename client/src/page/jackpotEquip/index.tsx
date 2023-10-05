import React, { useState } from "react";
import { backGrand } from '@utils/grand';
import { equipDraw } from '@cgi/jackpot';
import Styles from './index.less';
export const JackpotEquip = ({ history }) => {
    const [data, setData] = useState({
        num: 0,
        isActivity: false,
        yb: 0
    })
    const drawPetClick = () => {
        equipDraw().then(({ data }) => {
            setData(data)
        })
    }
    const { num, isActivity } = data;
    const text = isActivity ? `200元宝试试运气,再砸${10 - num}次即可获得元宝奖励。` : '200元宝试试运气';
    return (
        <div>
            <div className={Styles.tips}>
                全天火热活动,只需200元宝便可获得【九歌の断魂】【才子の佳人】系列的绝世神装,周六，周日活动期间每抽取十次更有机会获得100-1000元宝奖励。
            </div>
            <div><span className="g_u_end" onClick={drawPetClick}>{text}</span></div>
            <div className={Styles.tips}>
                神装宝箱中蕴含无数绝世神装,一些气运极强的修士，甚至可以获得【君临の天下】【上善の若水】【月华の相思】等系列的终极神装。
            </div>
            <div><span className="g_u_end" onClick={() => {
                history.push('/shopIntegral');
            }}>积分商店</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default JackpotEquip;

