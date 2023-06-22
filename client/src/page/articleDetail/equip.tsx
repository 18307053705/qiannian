import React, { useState } from "react";
import { getEquipInfo, getEquipExtInfo } from '@utils/equip';
import { Input } from '@components';
import { renameFn, firmFn, forgeFn, activeFn, sigilFn } from '@cgi/equip';
import { HeadActive, FirmActive, ForgeActive, SigilActive } from './equipActive'
import Style from './index.less';


const Equip = ({ equip, query, cheng }) => {
    const [isRename, setIsRename] = useState(false);
    if (!equip) {
        return null;
    }
    const equipInfo = getEquipInfo(equip);
    const { text, ...ext } = getEquipExtInfo(equip.ext, equip.name || equip.n);

    const rename = (name) => {
        renameFn({
            ...query,
            name
        }).then(({ data }) => {
            setIsRename(false);
            cheng({
                equip: {
                    ...equip,
                    name: data
                }
            })
        });

    }

    // 强化
    const firmClick = (materialtype) => {
        firmFn({
            id: query.id,
            in_x: query.in_x,
            materialtype
        })
    }

    // 锻造
    const forgeClick = (materialtype) => {
        forgeFn({
            id: query.id,
            in_x: query.in_x,
            materialtype
        })
    }
    // 附魔
    const sigilClick = () => {
        sigilFn({
            id: query.id,
            in_x: query.in_x
        })
    }

    // 使用或者卸下
    const activeClick = () => {
        activeFn({
            id: query.id,
            in_x: query.in_x,
            active: query.kanapsackType
        })
    }
    return (
        <div>
            <HeadActive query={query} setIsRename={setIsRename} activeClick={activeClick} />
            <div >
                {isRename ?
                    <Input
                        defaultValue={equip.name || equip.n}
                        submit={rename}
                        onText='改名'
                        close={() => { console.log('执行'); setIsRename(false); }} />
                    : text}
            </div>
            {
                Object.keys(equip.attr).map((key) => (
                    <div key={key}>{key}：{equip.attr[key]}</div>
                ))
            }
            <div><span>职业：{equip.level}级{equipInfo.careerName}</span></div>
            <div>强化：{ext.firm}级</div>
            <div>锻造：{ext.forge}次</div>
            <div>镶嵌：{equipInfo.gemList.length ? equipInfo.gemList.map(({ level }) => level) : '无'}</div>
            <div>简介：{equip.tips}</div>
            <div className={Style.equipFooter}>
                <FirmActive query={query} firm={ext.firm} firmClick={firmClick} />
                <ForgeActive query={query} ext={ext} forgeClick={forgeClick} level={equip.level} career={equip.career} />
                <SigilActive query={query} sigil={ext.sigil} sigilClick={sigilClick} />
            </div>

        </div>
    )

}

export default Equip;