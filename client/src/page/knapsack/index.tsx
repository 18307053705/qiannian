import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getKnapsack, initKnapsack, operate } from '@cgi/knapsack';
import { grounding } from '@cgi/paiMai';
import { getEquipName } from '@utils/equip'
import { jumpDetail } from '@utils/jumpPage'
import { List, Tab, Input } from '@components';
// 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
const nva = [
    {
        label: '全部',
        value: 0
    },
    {
        label: '装备',
        value: 3
    }, {
        label: '药品',
        value: 1
    }, {
        label: '卷轴',
        value: 4
    },
    {
        label: '材料',
        value: 5
    },
    {
        label: '任务',
        value: 6
    },
    {
        label: '杂物',
        value: 7
    }];


const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName({ ext, n });
}

const ACTIVE_TYPE = {
    1: '使用',
    2: '入库',
    3: '取出',
    4: '出售',
    5: '拍卖',
}

const knapsack = ({ history }) => {
    const { state, pathname } = history.location;
    const [active, setActive] = useState();
    // const listRef: any = useRef();
    // 缓存处理
    const { type = 1, serchValue = '', current = 0 } = state;
    const [knapsack, setKnapsack] = useState(initKnapsack);
    useEffect(() => {
        getKnapsack({ type }).then(({ data }) => {
            setKnapsack(data);
        });
    }, [])



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
            list.forEach(({ n = '', p, ...itme }, index) => {
                if (((p === 1 || p === 2) && n.includes(serchValue))) {
                    data.push({ n, p, ...itme, in_x: index })
                }
            });
            return data;
        }
        list.forEach(({ n = '', p, ...itme }, index) => {
            if (p === current && n.includes(serchValue)) {
                data.push({ n, p, ...itme, in_x: index })
            }
        });

        return data;

    }, [current, list, serchValue]);

    const operateClick = (parms) => {
        // 拍卖上架
        if (type === 5) {
            grounding({
                in_x: parms.in_x,
                price: parms.s,
            })
            return;
        }
        operate(parms).then(({ data }) => {
            setKnapsack(data);
        })
    }

    const activeClick = useCallback((in_x, s, p) => {
        if (p === 3 && type !== 5) {
            operateClick({
                in_x,
                s: 1,
                type,
            })
        } else {
            setActive({
                in_x,
                s,
                type,
            })
        }
    }, [type])

    const prefix = ({ id, n, p, s, ext, in_x }, index) => {
        return (
            <span
                key={`${id}_1`}
                className="g_u_end"
                onClick={() => {
                    jumpDetail(history, {
                        p,
                        form: type === 3 ? 3 : 1,
                        in_x
                    })
                }}
            >
                {index}. {namehandel(n, p, ext)} x {s}
            </span>
        )
    }

    const activeDom = ({ id, p, s, in_x }) => {
        return (
            <span key={`${id}_2`} className="g_u_end" onClick={() => { activeClick(in_x, s, p) }}>{ACTIVE_TYPE[type]}</span>
        )
    }

    return (
        <div>
            {
                active && (
                    <Input
                        label={type === 5 ? '拍卖价格' : `${ACTIVE_TYPE[type]}数量`}
                        type='number'
                        layout={false}
                        submit={(num) => {
                            operateClick({ ...active, s: Number(num) })
                        }}
                    />
                )
            }
            <Tab list={nva} currentKey={current} onCheng={(value) => {
                history.push(pathname, { ...state, current: value, listPage: 1 });
            }} />
            <List data={data} prefix={prefix} active={activeDom} emptyText="暂无物品" />
            <div className="g_fgx"></div>
            <Input
                label='搜索'
                layout={false}
                onText='查找'
                length={[0, 12]}
                defaultValue={serchValue}
                submit={(value) => {
                    history.push(pathname, { ...state, serchValue: value, listPage: 1 });
                }}
            />
            <div> 背包：{list.length}/200</div>
            {type === 1 && <div>元宝：{yuanbao}</div>}
            {type === 1 && <div>银两：{tael}</div>}
            <div onClick={() => { history.push('/grand') }}><span className="g_b">返回游戏</span></div>
        </div>
    )

}

export default knapsack;