import React, { useState, useEffect } from 'react';
import { unstable_batchedUpdates } from "react-dom";

import { backGrand } from '@utils/grand';
import { getCornucopia, getMaterial, chengId, gather, draw } from '@cgi/cornucopia';

import MaterialList from './materialList';
import Home from './home';
import Guide from './guide';

const initValMap = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
}


type PageInfoType = {
    key: 'home' | 'materialList' | 'guide',
    state?: number
}

export const Cornucopia = ({ history }) => {
    const [pageInfo, setPageInfo] = useState<PageInfoType>({ key: 'home' });
    const [materialMap, setMaterialMap]: any = useState();
    const [materialIdMap, setMaterialIdMap]: any = useState({});
    const [results, setResults]: any = useState('');
    const [valMap, setValMap]: any = useState(JSON.parse(JSON.stringify(initValMap)));
    const [data, setData]: any = useState();

    // 获取聚宝信息
    const updata = (text = '') => {
        Promise.all([getCornucopia(), getMaterial()]).then((reslist) => {
            const [cornucopiaRes, materialRes] = reslist;
            unstable_batchedUpdates(() => {
                setData(cornucopiaRes.data);
                setMaterialMap(materialRes.data);
                setResults(text);
            });

        })
    }
    useEffect(updata, []);

    // 返回聚宝盆信息
    const backJuBaoPeng = () => {
        setPageInfo({ key: 'home' })
    }

    // 投入材料
    const materialClick = (materialId, num) => {
        const { state = 0 } = pageInfo;
        // 对应材料列表
        const materialList = materialMap[state] || [];
        // 查找对应材料下标
        const in_x = materialList.findIndex(({ id }) => materialId === id);
        // 对应材料
        const material = materialList[in_x];
        // 删除对应材料
        material.s -= num;
        // 材料全部消耗
        if (!material.s) {
            materialList.splice(in_x, 1);
        }
        // 更新材料信息
        setMaterialMap({
            ...materialMap,
            [state]: materialList
        })
        // 计算对应材料类型值
        setValMap({
            ...valMap,
            [state]: valMap[state] + material.value * num
        });
        // 记录材料ID对应的数量，调用聚宝盆
        setMaterialIdMap({
            ...materialIdMap,
            [materialId]: (materialIdMap[materialId] || 0) + num
        });
        // 切换聚宝盆信息
        backJuBaoPeng();
    }



    // 更换聚宝物品
    const chengIdClick = () => {
        chengId().then(({ data }) => {
            if (data) {
                setData((prev) => {
                    const { jbp } = prev;
                    jbp.id = data;
                    return {
                        ...prev,
                        jbp
                    }
                })
            }

        })
    }

    // 点击聚宝
    const gatherClick = () => {
        gather({ materialIds: materialIdMap }).then((res) => {
            updata(res.data);
        })
    }

    // 抽奖
    const drawClick = () => {
        draw().then(({ data }) => {
            setResults(data.msg);
            setData((prev) => {
                const { jbp } = prev;
                jbp.l = data.l || 0;
                return {
                    ...prev,
                    jbp
                }
            })
        })
    }


    // 清空材料
    const clear = () => {
        setMaterialIdMap({});
        setValMap(JSON.parse(JSON.stringify(initValMap)));
        updata();
    }

    if (!data) {
        return null;
    }

    if (!data.limits) {
        return (
            <div>
                <span>50级后可以开启聚宝盆功能,赶快去练级吧。</span>
                <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
            </div>
        )
    }

    if (results) {
        return (
            <div>
                <span>{results}</span>
                <div><span onClick={() => { setResults('') }} className="g_u_end">继续</span></div>
            </div>
        )
    }

    return (
        <div>
            {/** 聚宝材料掉落信息 */}
            {pageInfo.key === 'guide' && <Guide
                backJuBaoPeng={backJuBaoPeng}
            />}
            {/** 聚宝信息 */}
            {pageInfo.key === 'home' && <Home
                valMap={valMap}
                setPageInfo={setPageInfo}
                materialMap={materialMap}
                gatherClick={gatherClick}
                clear={clear}
                chengIdClick={chengIdClick}
                data={data}
                drawClick={drawClick}
            />}
            {/** 聚宝材料列表 */}
            {pageInfo.key === 'materialList' && <MaterialList
                pageInfo={pageInfo}
                materialClick={materialClick}
                materialMap={materialMap}
                backJuBaoPeng={backJuBaoPeng}
            />}


            <div><span onClick={() => { history.push('./treasure') }} className="g_u_end">返回珍宝</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Cornucopia;