import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getKnapsack, initKnapsack, operate } from '@cgi/knapsack';
import { grounding } from '@cgi/paiMai';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpPage'
import { List, Tab, Input } from '@components';
import { dataChange } from './useData';
// 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
const nva = [
    {
        label: '全部',
        value: 0
    },
    {
        label: '装备',
        value: 1
    }, {
        label: '药品',
        value: 2
    }, {
        label: '卷轴',
        value: 3
    },
    {
        label: '材料',
        value: 4
    },
    {
        label: '任务',
        value: 5
    },
    {
        label: '杂物',
        value: 6
    }];


const namehandel = (n, isEquip, ext) => {
    if (!isEquip) {
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
    const [active, setActive]: any = useState();
    // 缓存处理
    const { type = 1, serchValue = '', current = 0 } = state;
    const [knapsack, setKnapsack] = useState(initKnapsack);
    useEffect(() => {
        getKnapsack({ type }).then(({ data }) => {
            setKnapsack(dataChange(data));
        });
    }, [])

    const { list, tael, yuanbao } = knapsack;
    const data = useMemo(() => {
        // 初始化表格配置
        setActive(null);
        if (current === 0) {
            return list.filter(({ name }) => name.includes(serchValue));
        }
        return list.filter(({ name, p }) => p === current && name.includes(serchValue));

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
        operate(parms).then(({ code }) => {
            if (code === 0) {
                getKnapsack({ type }).then(({ data }) => {
                    setKnapsack(dataChange(data));
                });
            }

        })
    }

    const activeClick = useCallback(({ isEquip, s, uid, in_x }) => {
        if (isEquip && type !== 5) {
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

    const prefix = ({ id, name, s, ext, uid, isEquip }, index) => {
        return (
            <span
                key={`${id}_1`}
                className="g_u_end"
                onClick={() => {
                    jumpDetail({
                        isEquip,
                        form: type === 3 ? 3 : 1,
                        uid
                    })
                }}
            >
                {index}. {namehandel(name, isEquip, ext)} x {s}
            </span>
        )
    }

    const activeDom = (itme) => {
        return (
            <span key={`${itme.id}_2`} className="g_u_end" onClick={() => { activeClick(itme) }}>{ACTIVE_TYPE[type]}</span>
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