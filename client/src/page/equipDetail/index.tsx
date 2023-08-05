import React, { useState, useEffect } from "react";

import { getEquipInfo, getEquipExtInfo } from '@utils/equip';
import { backGrand } from '@utils/grand';

import { renameFn, firmFn, forgeFn, unsnatchFn, sigilFn } from '@cgi/equip';
import { getArticleDetail } from '@cgi/knapsack';
import { equipActive } from '@cgi/pet';

import { Input } from '@components';
import { HeadActive, FirmActive, ForgeActive, SigilActive } from './equipActive';

import Style from './index.less';


const EquipDetail = ({ history }) => {
    const { state: query } = history.location;
    const [isRename, setIsRename] = useState(false);
    const [equip, setEquip] = useState();

    const update = () => {
        const { state } = history.location;
        getArticleDetail(state).then(({ data }) => {
            setEquip(data)
        })
    }
    useEffect(update, []);

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
            setEquip({
                ...equip,
                name: data
            })
        });
    }

    // 强化
    const firmClick = (materialtype) => {
        firmFn({
            id: query.id,
            in_x: query.in_x,
            materialtype
        }).then(({ data }) => {
            if (data) {
                history.location.state = {
                    ...query,
                    in_x: data
                }
                update()
            }
        })
    }

    // 锻造
    const forgeClick = (materialtype) => {
        forgeFn({
            id: query.id,
            in_x: query.in_x,
            materialtype
        }).then(({ data }) => {
            if (data) {
                history.location.state = {
                    ...query,
                    in_x: data
                }
                update()
            }
        })
    }
    // 附魔
    const sigilClick = () => {
        sigilFn({
            id: query.id,
            in_x: query.in_x
        }).then(({ data }) => {
            if (data) {
                history.location.state = {
                    ...query,
                    in_x: data
                }
                update()
            }
        })
    }

    // 使用或者卸下
    const unsnatchClick = () => {
        if (query.kanapsackType === 6) {
            equipActive({
                in_x: query.in_x,
                type: 2
            }).then(({ message }) => {
                if (!message) {
                    history.goBack()
                }
            })
        } else {
            unsnatchFn({
                id: query.id,
                in_x: query.in_x
            }).then(({ message }) => {
                if (!message) {
                    history.goBack()
                }
            })
        }


    }
    return (
        <div>
            <HeadActive query={query} setIsRename={setIsRename} activeClick={unsnatchClick} />
            <div >
                {isRename ?
                    <Input
                        defaultValue={equip.name || equip.n}
                        submit={rename}
                        onText='改名'
                        close={() => { console.log('执行'); setIsRename(false); }} />
                    : text}
            </div>
            <div><span>职业：{equip.level}级{equipInfo.careerName}</span></div>
            {
                Object.keys(equip.attr).map((key) => (
                    <div key={key}>{key}：{equip.attr[key]}</div>
                ))
            }
            <div>强化：{ext.firm}级</div>
            <div>锻造：{ext.forge}次</div>
            <div>镶嵌：{equipInfo.gemList.length ? equipInfo.gemList.map(({ level }) => level) : '无'}</div>
            <div>简介：{equip.tips}</div>
            <div className={Style.equipFooter}>
                <FirmActive query={query} firm={ext.firm} firmClick={firmClick} />
                <ForgeActive query={query} ext={ext} forgeClick={forgeClick} level={equip.level} career={equip.career} />
                <SigilActive query={query} sigil={ext.sigil} sigilClick={sigilClick} />
            </div>
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default EquipDetail;