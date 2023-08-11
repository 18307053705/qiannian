
import React from 'react';
const CAREER_MEUN = {
    1: '法皇,星君,血煞',
    2: '战尊,战神,战狂',
    3: '羽圣,剑仙,赤魅',
}

const MAKE_MEUN = {
    1: '世界声望',
    2: '世界功勋',
    3: '帮会声望',
}

export const MakeInfo = ({ material }: any) => {
    const { equip, materiaInfo, makeNum, make } = material;
    let text: any[] = [];
    if (materiaInfo) {
        text = Object.values(materiaInfo).map(({ n, s }: any) => `${n}x${s}`)
    }
    if (makeNum && MAKE_MEUN[make]) {
        text.push(`${MAKE_MEUN[make]}x${makeNum}`)
    }
    return (
        <div>
            <div><span>装备等级：{equip.level}级</span></div>
            <div><span>装备职业：{CAREER_MEUN[equip.career] || "全职"}</span></div>
            {
                Object.keys(equip.attr).map((key) => (
                    <div key={key}>{key}：{equip.attr[key]}</div>
                ))
            }
            <span>打造材料:{text.join(',')}</span>
        </div>
    )

}
