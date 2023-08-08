import React, { useState, useEffect, useMemo } from "react";
import { getKnapsack } from '@cgi/knapsack';
import { grounding } from '@cgi/shopping';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpPage';
import { Input, Tab, List } from '@components';

// 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
const nva = [
    {
        label: '全部',
        value: 0
    },
    {
        label: '装备',
        value: 3
    },
    {
        label: '药品',
        value: 1
    },
    {
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
const Article = ({ history, historyClick }) => {
    const [num, setNum]: any = useState(1);
    const [info, setInfo]: any = useState(undefined);
    const [current, setCurrent] = useState(0);
    const [list, setList]: any[] = useState([]);

    useEffect(() => {
        getKnapsack({ type: 1 }).then(({ data }) => {
            setList(data.list);
        })
    }, [])


    const data = useMemo(() => {
        const data: any = [];
        if (current === 0) {
            list.forEach(({ n, ...itme }, index) => {
                data.push({ n, ...itme, in_x: index })
            });
            return data;
        }

        if (current === 1) {
            list.forEach(({ n, p, ...itme }, index) => {
                if (p === 1 || p === 2) {
                    data.push({ n, p, ...itme, in_x: index })
                }
            });
            return data;
        }
        list.forEach(({ n, p, ...itme }, index) => {
            if (p === current) {
                data.push({ n, p, ...itme, in_x: index })
            }
        });
        return data;

    }, [current, list]);

    const prefix = ({ id, in_x, p, ext, s, n }, index) => (
        <span
            className='g_u_end'
            onClick={() => {
                jumpDetail(history, {
                    p,
                    form: 1,
                    in_x
                })
            }}>
            {index}. {namehandel(n, p, ext)} x {s}
        </span>
    )
    const active = ({ in_x, p, s }) => (
        <span className='g_u_end' onClick={() => { setInfo({ in_x, p, s }); }}>上架</span>
    )

    const submit = (price) => {
        grounding({
            type: 1,
            active: 1,
            price: Number(price),
            s: info.p !== 3 ? Number(num) : 1,
            in_x: info.in_x,
            unit: 'tael'
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' });
            }

        })

    }
    return (
        <div>
            {info && info.p !== 3 && <Input onChange={setNum} label='物品数量' type='number' />}
            {info && <Input submit={submit} label='物品单价' type='number' />}
            <Tab list={nva} onCheng={setCurrent} currentKey={0} />
            <List data={data} prefix={prefix} active={active} />
            <div></div>
        </div>
    )

}

export default Article;