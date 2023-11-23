import React, { useState, useEffect } from 'react';
import { getArticleDetail } from '@cgi/knapsack';
import { freeForgeEquip } from '@cgi/equip';
import { getEquipInfo, getEquipExtInfo } from '@utils/equip';

export const ForgeEquip = ({ history, historyClick }) => {
    const { state, pathname } = history.location;

    const { uid } = state;
    const [equip, setEquip] = useState();
    const [forgeNum, setForgeNum] = useState(0);
    const [isContinue, setIsContinue] = useState(false);
    // 获取武器详情
    const getEquipDetail = () => {
        getArticleDetail({
            uid,
            form: 1,
        }).then(({ data }) => {
            const equipInfo = getEquipInfo(data);
            const extInfo = getEquipExtInfo(data.name, data.ext);
            setEquip({
                ...data,
                ...equipInfo,
                ...extInfo
            })
        })
    }
    // 挂载请求武器详情
    useEffect(() => {
        if (uid !== -1) {
            getEquipDetail()
        }

    }, []);
    const freeForgeEquipClick = () => {
        setIsContinue(true);
        freeForgeEquip({ uid }).then(({ data }) => {
            if (data) {
                setForgeNum(data);
                getEquipDetail();
            } else {
                history.push(pathname, { uid: -1, pageKey: state.pageKey });
                setForgeNum(0);
            }
        })
    }



    if (!forgeNum && uid === -1) {
        return (
            <div>
                <div>精炼失败,装备已损坏</div>
                <div><span className='g_u_end' onClick={() => { historyClick({ pageKey: 'list' }) }}>精炼其他装备</span></div>
            </div>
        )
    }
    if (!equip) {
        return null;
    }
    return (
        <div>
            <div>提示：精炼装备有一定概率失败导致直接损坏。</div>
            <div>{forgeNum ? `精炼成功,锻造等级+${forgeNum}` : ''}</div>
            <div>{equip.text}+{equip.forge}</div>
            <div><span>等级：{equip.level}级</span></div>
            <div><span>职业：{equip.careerName}</span></div>
            {
                Object.keys(equip.attr).map((key) => (
                    <div key={key}>{key}：{equip.attr[key]}</div>
                ))
            }
            <div><span className='g_u_end' onClick={freeForgeEquipClick}>{isContinue ? '继续精炼' : '开始精炼'}</span></div>
            <div><span className='g_u_end' onClick={() => { historyClick({ pageKey: 'list' }) }}>精炼其他装备</span></div>
        </div>
    )
}

export default ForgeEquip;