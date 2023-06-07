import React, { useState, useEffect, useCallback, useMemo } from "react";
import { backGrand } from '@utils/grand';
import { getDetail } from '@cgi/knapsack';
import { getEquipName, getEquipInfo } from '@utils/equip'



const knapsackDetail = ({ history }) => {
    const [info, setInfo]: any = useState({});
    const { equip, article } = info;
    useEffect(() => {
        const { state } = history.location;
        getDetail(state).then(({ data }) => {
            setInfo(data)
        })
    }, [])
    let equipInfo: any = { careerName: '', gemList: [] };
    if (equip) {
        equipInfo = getEquipInfo(equip);
    }
    return (
        <div >
            <div>===物品详情===</div>
            {
                equip && (
                    <div>
                        <div style={{ textIndent: '1em' }}>{getEquipName(equip.ext, equip.n)}</div>
                        {
                            Object.keys(equip.attr).map((key) => (<div key={key}><span className="g_b">{key}</span>：<span>{equip.attr[key]}</span></div>))
                        }
                        <div><span className="g_b">等级</span>：<span>{equip.level}</span></div>
                        <div><span className="g_b">职业</span>：<span>{equipInfo.careerName}</span></div>
                        <div>
                            <span className="g_b">镶嵌</span>：<span>{equipInfo.gemList.length ? equipInfo.gemList.map(({ level }) => level) : ''}</span>
                        </div>
                        <div><span className="g_b">简介</span>：<span>{equip.tips}</span></div>
                    </div>
                )
            }
            {
                article && (
                    <div>
                        <div><span className="g_b">{article.n}</span></div>
                        <div><span className="g_b">数量</span>：<span>{article.s}</span></div>
                        <div><span className="g_b">单价</span>：<span>{article.sell}银两</span></div>
                        <div><span className="g_b">简介</span>：<span>{article.tips}</span></div>
                    </div>
                )
            }
            =========================
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_b">返回游戏</span></div>
        </div>
    )

}

export default knapsackDetail;