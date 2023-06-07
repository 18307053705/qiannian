import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getKnapsack, initKnapsack, operate } from '@cgi/knapsack';
import { getEquipName } from '@utils/equip'

import Style from './index.less';
// 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
const nva = [
    {
        lable: '全部',
        valeu: 0
    },
    {
        lable: '装备',
        valeu: 3
    }, {
        lable: '药品',
        valeu: 1
    }, {
        lable: '卷轴',
        valeu: 4
    },
    {
        lable: '材料',
        valeu: 5
    },
    {
        lable: '任务',
        valeu: 6
    },
    {
        lable: '杂物',
        valeu: 7
    }];


const tabelConfig = {
    page: 0,
    size: 20
}

const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName(ext, n);
}

const ACTIVE_TYPE = {
    1: '使用',
    2: '入库',
    3: '取出',
    4: '出售',
}

const knapsack = ({ history }) => {
    const [current, setCurrent] = useState(0);
    const [knapsack, setKnapsack] = useState(initKnapsack);
    const [table, setTable] = useState(tabelConfig);
    const [serch, setSerch] = useState('');
    const [serchValue, setSerchValue] = useState('');
    const [active, setActive] = useState();
    const [type, setType] = useState(1)
    useEffect(() => {
        const { state } = history.location;
        setType(state.type);
        getKnapsack({type:state.type}).then(({ data }) => {
            setKnapsack(data);
        });
    }, [])

    useEffect(() => {
        setTable(tabelConfig);
    }, [current])

    const { list, tael, yuanbao } = knapsack;
    const data = useMemo(() => {
        // 初始化表格配置
        setActive(null);
        const data: any = [];
        if (current === 0) {
            list.forEach(({ n, ...itme }, index) => {
                if (n.includes(serchValue)) {
                    data.push({ n, ...itme, in_x: index })
                }
            });
            return data;
        }
        if (current === 1) {
            list.forEach(({ n, p, ...itme }, index) => {
                if (((p === 1 || p === 2) && n.includes(serchValue))) {
                    data.push({ n, p, ...itme, in_x: index })
                }
            });
            return data;
        }
        list.forEach(({ n, p, ...itme }, index) => {
            if (p === current && n.includes(serchValue)) {
                data.push({ n, p, ...itme, in_x: index })
            }
        });

        return data;

    }, [current, list, serchValue]);

    const operateClick = (parms) => {
        operate(parms).then(({ data }) => {
            setKnapsack(data);
        })
    }

    const activeClick = useCallback((id, in_x, s, p) => {
        if (p === 3) {
            operateClick({
                id,
                in_x,
                s: 1,
                p,
                type,
            })
        } else {
            setActive({
                id,
                in_x,
                s,
                p,
                type,
            })
        }


    }, [type])
    const total = data.length;
    const { page, size } = table;
    const tList = data.slice(page * size, (page + 1) * size);
    return (
        <div className={Style["knapsack-page"]}>
            {
                active && (
                    <div className={Style.active}>
                        {ACTIVE_TYPE[type]}数量:
                        <input
                            className={Style.input}
                            value={active.s}
                            type='number'
                            onChange={(e) => {
                                setActive({ ...active, s: e.target.value })
                            }} />
                        <button onClick={() => { operateClick(active) }}>确定</button>
                    </div>
                )
            }
            <div>
                {
                    nva.map(({ valeu, lable }, index) => (
                        <span className={current === valeu ? "g_u g_u_d" : 'g_u'} key={index} >
                            <span onClick={() => { setCurrent(valeu); }}>{lable}</span>
                        </span>))
                }
            </div>
            <div className={Style['article-list']}>
                {
                    total ? tList.map(({ id, n, p, s, ext, in_x }, index) => {
                        return (
                            <div key={index}>
                                <span className="g_u" onClick={() => { history.push('/knapsackDetail', { id, in_x, p, type }) }}>
                                    <span>{index + (page * size) + 1}. {namehandel(n, p, ext)} x {s}</span>
                                </span>
                                <span className="g_u"><span onClick={() => { activeClick(id, in_x, s, p) }}>{ACTIVE_TYPE[type]}</span></span>
                            </div>
                        )
                    })
                        : <div className={Style.empty}>暂无物品</div>
                }
            </div>

            {
                total ? (
                    <div>
                        {page !== 0 && <span className="g_u"><span onClick={() => {
                            setActive(null);
                            setTable({ size, page: page - 1 });
                        }}>上一页</span></span>}
                        {total > (page + 1) * size && <span className="g_u" onClick={() => {
                            setActive(null);
                            setTable({ size, page: page + 1 });
                        }}><span>下一页</span></span>}
                    </div>
                ) : ''
            }
            <div className="g_fgx"></div>
            <div>
                背包：{list.length}/200
                <input
                    className={Style.input}
                    value={serch}
                    onChange={(e) => {
                        setSerch(e.target.value)
                    }} />
                <button onClick={() => { setSerchValue(serch) }}>查找</button>
            </div>
            {type === 1 && <div>元宝：{yuanbao}</div>}
            {type === 1 && <div>银两：{tael}</div>}
            <div onClick={() => { history.push('/grand') }}><span className="g_b">返回游戏</span></div>
        </div>
    )

}

export default knapsack;