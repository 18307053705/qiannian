import React from "react";
import { backGrand } from '@utils/grand';
import { lingShouShan } from '@cgi/jackpot';
import Styles from './index.less';
export const JackpotEquip = () => {
    const drawPetClick = () => { 
        
     }
    return (
        <div>
    
            <div className={Styles.tips}>
                全天火热活动,只需200元宝便可获得77级【才子佳人】系列的绝世神装,并且活动期间每抽取十次更有机会获得100-1000元宝奖励。
            </div>
            <div><span className="g_u_end" onClick={drawPetClick}>200元宝试试运气</span></div>
            <div className={Styles.tips}>
                <div></div>
                灵兽山,四处都是奇珍异兽,你甚至还看到了远古时代才存在的【★远古鲲鹏★】【★吞天巨蟒★】,
                不过想要获得想要获得他们的认可还需一点点的运气...
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default JackpotEquip;

