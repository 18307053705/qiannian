import React from "react";

// 头部操作
export const HeadActive = ({ query, setIsRename, activeClick }) => {

    if (![2, 6].includes(query.kanapsackType)) {
        return null;
    }

    return (
        <div>
            <span className='g_u'><span onClick={activeClick}>卸下</span></span>
            {query.kanapsackType === 1 && <span className='g_u_end' onClick={() => { setIsRename(true) }}>改名</span>}
        </div>
    )
}


// 底部操作 
export const FirmActive = ({ query, firm, firmClick }) => {
    if (query.kanapsackType !== 1 || firm === 16) {
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
    return (
        <div>
            <div><span className='g_u_end' onClick={() => { firmClick(1) }}>{upFirm}级强化卡,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(2) }}>{moonlight}颗月光石,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(3) }}>{stoneNum}颗强化石,成功率{rate}%,失败强化等级-1</span></div>
            <div><span className='g_u_end' onClick={() => { firmClick(4) }}>{exp}经验,成功率{rate}%,失败强化等级-1</span></div>
        </div>
    )

}

export const ForgeActive = ({ query, ext, forgeClick, level, career }) => {
    const { forge, firm } = ext;
    const isForge = (firm === 16 && forge < 50) || (firm < 16 && forge < 20) && query.kanapsackType === 1;
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
    return (
        <div>
            <div><span className='g_u_end' onClick={() => { forgeClick(1) }}>{text}锻造,成功率100%</span></div>
            <div><span className='g_u_end' onClick={() => { forgeClick(2) }}>{yuanbao}元宝锻造,成功率100%</span></div>
        </div>
    )
}

export const SigilActive = ({ query, sigil, sigilClick }) => {
    if (query.kanapsackType !== 1 || sigil === 9) {
        return null;
    }
    let text = ['一星', '二星', '三星', '四星', '五星', '六星', '七星', '八星', '九星'][sigil];
    return (
        <div><span className='g_u_end' onClick={sigilClick}>{text}魔符,成功率100%</span></div>
    )
}

