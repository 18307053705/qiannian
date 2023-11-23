import React from "react";
import { firmeEquip } from '@cgi/equip';


// 强化组件
export const FirmActive = ({ query, getEquipDetail, equip }) => {
    const { form, uid } = query;
    const { firm } = equip;
    if (form !== 1 || firm === 16) {
        return null;
    }
    const upFirm = firm + 1;
    const moonlight = 2 ** firm;
    const stoneNum = firm < 11 ? 2 ** firm : 512 * firm;
    let rate = 100 - upFirm * 10;
    if (upFirm > 7) {
        rate = 30 - (upFirm - 7) * 5;
    }
    if (upFirm > 12) {
        rate = 5 - (upFirm - 12)
    }
    if (upFirm === 1) {
        rate = 100;
    }
    const exp = 75000000 + 75000000 * firm / 2;

    const firmClick = (type) => {
        firmeEquip({
            materialtype: type,
            uid
        }).then(({data})=>{
            if(data){
                getEquipDetail()
            }
        })
    }

    return (
        <div>
            <div><span className='g_u_end' onClick={() => { firmClick(1) }}>{upFirm}级强化卡,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(2) }}>{moonlight}颗月光石,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(3) }}>{stoneNum}颗强化石,成功率{rate}%,失败强化等级-1</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(4) }}>{exp}经验,成功率{rate}%,失败强化等级-1</span></div>
        </div>
    )

}





