import React from "react";
import { forgeEquip } from '@cgi/equip';


// 锻造组件
export const ForgeActive = ({ query, getEquipDetail, equip }) => {
    const { form, uid } = query;
    const { level, career, forge, firm } = equip;
    const isForge = ((firm === 16 && forge < 50) || (firm < 16 && forge < 20)) && form === 1;
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
    if (level > 89) {
        text = '法则之石';
        yuanbao = 300;
    }
    if (level > 99) {
        text = '大道光韵';
        yuanbao = 500;
    }
    const forgeClick = (type) => {
        forgeEquip({
            materialtype: type,
            uid
        }).then(({ data }) => {
            if (data) {
                getEquipDetail()
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


