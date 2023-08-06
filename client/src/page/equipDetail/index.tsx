import React, { useState, useEffect } from "react";
import { Input } from '@components';
import { getEquipInfo, getEquipExtInfo } from '@utils/equip';
import { backGrand } from '@utils/grand';
import { renameEquip, unloadGem } from '@cgi/equip';
import { getArticleDetail } from '@cgi/knapsack';

import { HeadActive, FirmActive, ForgeActive, SigilActive, MosaicActive } from './components';

import Style from './index.less';


const EquipDetail = ({ history }) => {
    const { state: query } = history.location;
    const [isRename, setIsRename] = useState(false);
    const [equip, setEquip] = useState();
    const [isMosaic, setIsMosaic] = useState(false);

    // 获取武器详情
    const getEquipDetail = (params = {}) => {
        const { state } = history.location;
        history.location.state = {
            ...state,
            ...params,
        }
        getArticleDetail({ ...state, ...params }).then(({ data }) => {
            const equipInfo = getEquipInfo(data);
            const extInfo = getEquipExtInfo(data.ext, data.n);
            setEquip({
                ...data,
                ...equipInfo,
                ...extInfo
            })
        })
    }
    // 挂载请求武器详情
    useEffect(getEquipDetail, []);

    // 卸下宝石
    const unloadGemClick = () => {
        const { state } = history.location;
        unloadGem({ in_x: state.in_x }).then(({ message }) => {
            if (!message) { getEquipDetail() }
        })
    }

    if (!equip) {
        return null;
    }

    const renameBtn = (name) => {
        renameEquip(({ name, pos: query.pos })).then(({ data }) => {
            setEquip({
                ...equip,
                name: data
            })
            setIsRename(false);
        })
    }

    if (isMosaic) {
        return <MosaicActive query={query} setIsMosaic={setIsMosaic} getEquipDetail={getEquipDetail} />
    }
    return (
        <div>
            <HeadActive query={query} history={history} />
            {/* 重命名 */}
            {isRename ?
                <Input
                    defaultValue={equip.text}
                    submit={renameBtn}
                    onText='改名'
                    close={() => { setIsRename(false); }} />
                : (
                    <div>{equip.text} <span className="g_u_end" onClick={() => { setIsRename(true) }}>[改]</span></div>
                )
            }
            <div><span>职业：{equip.level}级{equip.careerName}</span></div>
            {
                Object.keys(equip.attr).map((key) => (
                    <div key={key}>{key}：{equip.attr[key]}</div>
                ))
            }
            <div>强化：{equip.firm}级</div>
            <div>锻造：{equip.forge}次</div>
            {/* 镶嵌 */}
            {
                query.form === 1 ? equip.gemList.map(({ text, active, unload }, index) => (
                    <div key={index}>
                        {text}
                        {active && <span className="g_u_end" onClick={() => { setIsMosaic(true) }}>镶嵌</span>}
                        {unload && <span className="g_u_end" onClick={unloadGemClick}>卸下</span>}
                    </div>
                )) : ''
            }
            <div>简介：{equip.tips}</div>
            <div className={Style.equipFooter}>
                <FirmActive query={query} equip={equip} getEquipDetail={getEquipDetail} />
                <ForgeActive query={query} equip={equip} getEquipDetail={getEquipDetail} />
                <SigilActive query={query} equip={equip} getEquipDetail={getEquipDetail} />
            </div>
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default EquipDetail;