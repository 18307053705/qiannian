import React from "react";
import { backGrand } from '@utils/grand';
import { jackpotArt } from '@cgi/jackpot';
import Styles from './index.less';
export const JackpotArt = () => {

    const drawPetClick = (type) => {
        jackpotArt({ type })
    }
    return (
        <div>
            <div className={Styles.tips}>全天火热活动,可获得【风云诀】,【逍遥诀】,【天地诀】等系列技能书。</div>
            <div><span className="g_u_end" onClick={() => { drawPetClick(1) }}>消耗199世界声望</span></div>
            <div><span className="g_u_end" onClick={() => { drawPetClick(2) }}>消耗199帮会声望</span></div>
            <div><span className="g_u_end" onClick={() => { drawPetClick(3) }}>消耗199结义声望</span></div>
            <div><span className="g_u_end" onClick={() => { drawPetClick(4) }}>消耗49元宝</span></div>
            <div className={Styles.tips}>周六，周日活动期间更有机会获得【一转技能书】,【二转技能书】,【三转技能书】,【四转技能书】。</div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default JackpotArt;

