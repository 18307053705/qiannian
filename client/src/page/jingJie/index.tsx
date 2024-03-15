import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getJingJie, distributionPotentia, resetPotential, advanced } from '@cgi/jingJie';

import Base from './base';
import Dstribution from './distribution';


export default () => {
    const [pageKey, setPageKey] = useState('base');
    const [data, setData] = useState();


    const getDataInfo = () => {
        getJingJie().then((res) => {
            setData(res.data)
        })
    }


    useEffect(getDataInfo, [])
    // 分配潜力
    const distributionPotentiaClick = (values) => {
        distributionPotentia(values).then((res) => {
            if (!res.message) {
                getDataInfo()
            }

        })
    }
    // 重置潜力
    const resetPotentialClick = () => {
        resetPotential().then((res) => {
            if (!res.message) {
                getDataInfo()
            }
        })
    }
    // 突破境界
    const advancedClick = () => {
        advanced().then((res) => {
            if (!res.message) {
                getDataInfo()
            }
        })
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            {pageKey === 'base' ?
                <Base
                    setPageKey={setPageKey}
                    data={data}
                    resetPotentialClick={resetPotentialClick}
                    advancedClick={advancedClick}
                /> :
                <Dstribution
                    setPageKey={setPageKey}
                    data={data}
                    distributionPotentiaClick={distributionPotentiaClick}
                />}
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}
