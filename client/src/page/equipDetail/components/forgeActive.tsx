import React from "react";
import { forgeEquip } from '@cgi/equip';


// 锻造组件
export const ForgeActive = ({ query, getEquipDetail, equip }) => {
    const { from, in_x } = query;
    const {  level, career,forge, firm } = equip;
    // const { forge, firm } = ext;
    console.log(equip)
    const isForge = (firm === 16 && forge < 50) || (firm < 16 && forge < 20) && from !== 1;
    if (!isForge) {
        return null;
    }
    let text = ['一级玄石', '一级玄石', '一级玉石', '一级云石'][career];
    let yuanbao = 20;
    if (level > 35) {
        text = ['二级玄石', '二级玄石', '二级玉石', '二级云石'][career];
        yuanbao = 50;
    }
    if (level > 69) {
        text = ['三级玄石', '三级玄石', '三级玉石', '三级云石'][career];
        yuanbao = 100;
    }
    if (level > 74) {
        text = ['顶级玄石', '顶级玄石', '顶级玉石', '顶级云石'][career];
        yuanbao = 200;
    }
    const forgeClick = (type) => {
        forgeEquip({
            materialtype: type,
            in_x
        }).then(({ data }) => {
            if (data) {
                getEquipDetail({ in_x: data })
            }
        })
    }
    return (
        <div>
            <div><span className='g_u_end' onClick={() => { forgeClick(1) }}>{text}锻造,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { forgeClick(2) }}>{yuanbao}元宝锻造,成功率100%</span></div>
        </div>
    )
}


