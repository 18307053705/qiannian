
import React, { useMemo } from 'react';
import { makeEquip } from '@cgi/equip';
const CAREER_MEUN = {
    1: '法皇,星君,血煞',
    2: '战尊,战神,战狂',
    3: '羽圣,剑仙,赤魅',
}

export const MakeInfo = ({ material }: any) => {
    const { equip, article, yuanbao, integral } = material;
    const list = useMemo(() => {
        const text: string[] = Object.values(article || {}).map(({ name, s }: any) => `${name}x${s}`);
        text.push(`${integral.name}x${integral.value}`);
        return text;
    }, [integral, article])
    const { level, career, attr, id } = equip;
    return (
        <div>
            <div><span>装备等级：{level}级</span></div>
            <div><span>装备职业：{CAREER_MEUN[career] || "全职"}</span></div>
            {
                Object.keys(attr).map((key) => (
                    <div key={key}>{key}：{attr[key]}</div>
                ))
            }
            <div><span className='g_u_end' onClick={() => { makeEquip({ equipId: id, type: 1 }) }}>【消耗材料{list.join(',')}】</span></div>
            <div><span className='g_u_end' onClick={() => { makeEquip({ equipId: id, type: 2 }) }}>【消耗{yuanbao}元宝直接打造】</span></div>
            <div>--------------------------------</div>
        </div>
    )
}
