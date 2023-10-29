import React, { useState, useMemo, useEffect } from 'react';
import { backGrand, goBack } from '@utils/grand';
import { makeEquip, makeEquipInfo } from '@cgi/equip';
import { getRoleInfo } from '@cgi/roleInfo';
import { Tab } from '@components';
import { MakeInfo } from './makeInfo';
import { worldConfig, gangConfig, marriageConfig, exploitConfig, faBaoConfig } from './config';
export const GangEquip = ({ history }) => {
    const { state = {}, pathname } = history.location;
    const { current: initCurrent, equipMeun, tabList } = useMemo(() => {
        const { pageKey, level = 0 } = state;
        let config: any = {
            current: 0,
            equipMeun: {},
            tabList: []
        };
        if (pageKey === 'world') {
            config = worldConfig
        }
        if (pageKey === 'gang') {
            config = gangConfig
        }
        if (pageKey === 'marriage') {
            config = marriageConfig
        }
        if (pageKey === 'exploit') {
            config = exploitConfig
        }
        if (pageKey === 'faBao') {
            config = faBaoConfig
        }
        if (level < 80) {
            // 过滤当前等级无法打造的装备
            config.tabList = config.tabList.filter(({ value }) => value < 80);
        }
        return config
    }, [state])

    const [current, setCurrent] = useState(initCurrent);
    const [material, setMaterial] = useState(0);

    const [materialInfo, setMaterialInfo] = useState();

    const getMaterialInfo = (equipId) => {
        makeEquipInfo({ equipId }).then(({ data }) => {
            setMaterialInfo(data);
            setMaterial(equipId)
        })
    }

    useEffect(() => {
        const { level } = state;
        if (!level) {
            getRoleInfo().then(({ data }) => {
                history.replace(pathname, { ...state, level: data.role_level });
            })
        }
    }, [])


    if (!tabList.length) {
        return (
            <div>
                <div><span className='g_u_end' onClick={goBack}>返回上页</span></div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    return (
        <div>
            <Tab list={tabList} currentKey={current} onCheng={setCurrent} />
            {
                equipMeun[current].map(({ name, id }) => {
                    return (
                        <div key={id}>
                            <div>
                                <span className='g_u'><span onClick={() => { getMaterialInfo(id) }}>【{name}】</span></span>
                                <span className='g_u_end' onClick={() => { makeEquip({ equipId: id, type: 1 }) }}>打造</span>
                            </div>
                            {material === id && <MakeInfo material={materialInfo} />}
                        </div>
                    )
                })
            }
            <div><span className='g_u_end' onClick={goBack}>返回上页</span></div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default GangEquip;