import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getCornucopia, getMaterial } from '@cgi/cornucopia';
import MaterialList from './materialList';
import { unstable_batchedUpdates } from "react-dom";
const ELE_KEY = {
    ice: '冰',
    mine: '雷',
    wind: '风',
    water: '水',
    fire: '火',
}
const initMaterial = () => ({
    ice: [],
    mine: [],
    wind: [],
    water: [],
    fire: [],
})
export const Cornucopia = ({ history }) => {
    const [materialMap, setMaterialMap] = useState();

    const [materialType, setMaterialType] = useState('')
    const [materialList]: any = useState([]);
    const [valMap] = useState({
        ice: 0,
        mine: 0,
        wind: 0,
        water: 0,
        fire: 0,
    })
    const [data, setData] = useState();
    useEffect(() => {
        Promise.all([getCornucopia(), getMaterial()]).then((reslist) => {
            const [cornucopiaRes, materialRes] = reslist;
            const { material, list } = materialRes.data;
            const materialMap = initMaterial();
            list.forEach((itme) => {
                const ele = material[itme.id]
                if (ele) {
                    materialMap[ele['key']].push({
                        ...itme,
                        ...ele
                    })
                }
            })
            unstable_batchedUpdates(() => {
                setData(cornucopiaRes.data);
                setMaterialMap(materialMap);
            });
        })
    }, [])

    const materialClick = (ele) => {
        setMaterialType('');
        if (ele) {
            const { num, val, in_x, id, ...itme } = ele;
            valMap[itme.key] += val;
            if (itme.s == 0) {
                materialMap[itme.key].splice(in_x, 1);
            } else {
                materialMap[itme.key][in_x] = itme;
            }
            materialList.push({ id, s: num })
        }

    }

    if (!data) {
        return null;
    }
    const { jbp } = data;
    return (
        <div>
            {
                !data.limits && (
                    <div>
                        <span>50级后可以开启聚宝盆功能,赶快去练级吧。</span>
                        <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
                    </div>
                )
            }

            {
                materialType ? (
                    <MaterialList
                        materialType={materialType}
                        materialClick={materialClick}
                        setMaterialMap={materialMap}
                    />)
                    : (
                        <div>
                            <div>提示：成功率10%[各项材料不得少于60]</div>
                            <div>=============</div>
                            {
                                Object.keys(valMap).map((key) => {
                                    return (
                                        <div key={key}>
                                            <span>{ELE_KEY[key]}:{valMap[key]}</span>
                                            <span className="g_u_end" onClick={() => { setMaterialType(key) }}>
                                                +材料{materialMap[key].length}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                            <div>=============</div>
                            <div>
                                <span>聚宝盆目标:</span>
                                <span className="g_u_end">{jbp.id}</span>
                                <span> | </span>
                                <span className="g_u_end">[换]</span></div>
                            <div><span>聚宝盆等级:{jbp.l || 0}</span></div>
                            <div>
                                <span>有效抽奖次数:({jbp.lx || 0})</span>
                                <span className="g_u_end">[抽奖]</span></div>
                            <div>提示:玩家的聚宝盆等级越高,影响获得商城道具的概率以及成功率。</div>
                        </div>
                    )
            }
            <div><span onClick={() => { history.push('./treasure') }} className="g_u_end">返回珍宝</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Cornucopia;