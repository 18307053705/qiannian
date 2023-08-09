import React from "react";
import { backGrand } from '@utils/grand';
import { drawPet } from '@cgi/pet';
import Styles from './index.less';
export const LingShouShan = () => {
    const drawPetClick = () => { drawPet() }
    return (
        <div>
            <div className={Styles.tips}>
                全天火热活动,只需200元宝便可获得超高资质宠物,甚至有几率获得自带强大天赋【青帝雷经】【太白帝经】【玄武真怒】的强大神宠。
            </div>
            <div><span className="g_u_end" onClick={drawPetClick}>200元宝试试运气</span></div>
            <div className={Styles.tips}>
                灵兽山,四处都是奇珍异兽,你甚至还看到了远古时代才存在的【★远古鲲鹏★】【★吞天巨蟒★】,
                不过想要获得想要获得他们的认可还需一点点的运气...
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default LingShouShan;

