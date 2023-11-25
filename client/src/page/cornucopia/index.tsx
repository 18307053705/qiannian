import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getCornucopia, getMaterial, chengId, gather, draw } from '@cgi/cornucopia';
import MaterialList from './materialList';
import { unstable_batchedUpdates } from "react-dom";

const ELE_KEY = {
    1: '风',
    2: '雷',
    3: '冰',
    4: '水',
    5: '火',
}
const initMaterial = () => ({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
})

const initValMap = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
}

const getExp = (lx, exp) => {
    // 计算聚宝盆等级经验等
    // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
    // 最大30级
    const level = lx / 3;
    let upExp = level * 10 + 10;
    if (level > 9) {
        upExp = level % 10 * 1000 + 1000;
    }
    if (level > 19) {
        upExp = level % 10 * 10000 + 10000;
    }
    return `${exp}/${upExp}`;

}

export const Cornucopia = ({ history }) => {
    const [materialMap, setMaterialMap]: any = useState();
    const [materialType, setMaterialType]: any = useState('');
    const [materialReq, setMaterialReq]: any = useState({});
    const [results, setResults]: any = useState('');
    const [valMap, setValMap]: any = useState(JSON.parse(JSON.stringify(initValMap)));
    const [data, setData]: any = useState();
    const updata = (text = '') => {
        Promise.all([getCornucopia(), getMaterial()]).then((reslist) => {
            const [cornucopiaRes, materialRes] = reslist;
            const { material, list } = materialRes.data;
            const materialMap: any = initMaterial();
            list.forEach((itme) => {
                const ele = material[itme.id]
                if (ele) {
                    materialMap[ele['ele']].push({
                        ...itme,
                        ...ele
                    })
                }
            })
            unstable_batchedUpdates(() => {
                setData(cornucopiaRes.data);
                setMaterialMap(materialMap);
                setResults(text);
            });

        })
    }
    useEffect(updata, []);
    const materialClick = (material, num) => {
        setMaterialType('');
        if (!num) {
            return;
        }
        material.s -= num;
        const in_x = materialMap[material.ele].findIndex(({ id }) => material.id === id);
        // 判断材料是否全部消耗
        if (!material.s) {
            materialMap[material.ele].splice(in_x, 1);
        } else {
            materialMap[material.ele][in_x] = material;
        }
        valMap[material.ele] += material.value * num;
        materialReq[material.id] = (materialReq[material.id] || 0) + num;

        setMaterialReq(materialReq);
        setMaterialMap(materialMap);
        setValMap(valMap);
    }

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

    const gatherClick = () => {
        gather({ materialIds: materialReq }).then((res) => {
            updata(res.data);
        })
    }
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

    if (!data) {
        return null;
    }

    const { id, lx, l, exp } = data['jbp'];
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
                            <div>提示:聚宝成功率随等级提升[各项材料不得少于100]</div>
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
                            <div><span onClick={() => {
                                setMaterialReq({});
                                setValMap(JSON.parse(JSON.stringify(initValMap)));
                                updata();
                            }} className='g_u_end'>清空材料</span></div>
                            <div>=============</div>
                            <div><span onClick={gatherClick} className='g_u_end'>开始聚宝</span></div>
                            <div>
                                <span>聚宝盆目标:</span>
                                <span className="g_u_end">{id}</span>
                                <span> | </span>
                                <span className="g_u_end" onClick={chengIdClick}>[换]</span></div>
                            <div><span>聚宝盆等级:{lx / 3 || 0}({getExp(lx, exp)})</span></div>
                            <div>
                                <span>有效抽奖次数:({lx - l || 0})</span>
                                <span className="g_u_end" onClick={drawClick}>[抽奖]</span></div>
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