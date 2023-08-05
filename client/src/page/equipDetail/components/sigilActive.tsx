import React from "react";
import { sigilEquip } from '@cgi/equip';


// 附魔组件
export const SigilActive = ({ query, equip, getEquipDetail }) => {
    const { form, in_x } = query;
    const { sigil } = equip;
    if (form !== 1 || sigil === 9) {
        return null;
    }
    let text = ['一星', '二星', '三星', '四星', '五星', '六星', '七星', '八星', '九星'][sigil];
    const sigilClick = () => {
        sigilEquip({
            in_x
        }).then(({ data }) => {
            if (data) {
                getEquipDetail({ in_x: data })
            }
        })
    }
    return (
        <div><span className='g_u_end' onClick={sigilClick}>{text}魔符,成功率100%</span></div>
    )
}

