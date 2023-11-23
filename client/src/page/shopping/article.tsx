import React, { useState, useEffect, useMemo } from "react";
import { getKnapsack } from '@cgi/knapsack';
import { grounding } from '@cgi/shopping';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpPage';
import { Input, Tab, List } from '@components';
import { dataChange } from '../knapsack/useData';
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


const namehandel = (n, p, ext) => {
    if (p !== 1) {
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
            setList(dataChange(data).list);
        });
    }, [])

    const data = useMemo(() => {
        if (current === 0) {
            return list;
        }
        return list.filter(({ p }) => p === current);

    }, [current, list]);

    const prefix = ({ in_x, p, ext, s, name }, index) => (
        <span
            className='g_u_end'
            onClick={() => {
                jumpDetail(history, {
                    p,
                    form: 1,
                    in_x
                })
            }}>
            {index}. {namehandel(name, p, ext)} x {s}
        </span>
    )
    const active = ({ uid, p, s }) => (
        <span className='g_u_end' onClick={() => { setInfo({ uid, p, s }); }}>上架</span>
    )

    const submit = (price) => {
        grounding({
            type: 1,
            active: 1,
            price: Number(price),
            s: info.p !== 1 ? Number(num) : 1,
            uid: info.uid,
            unit: 'tael'
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' });
            }

        })

    }
    return (
        <div>
            {info && info.p !== 1 && <Input onChange={setNum} label='物品数量' type='number' />}
            {info && <Input submit={submit} label='物品单价' type='number' />}
            <Tab list={nva} onCheng={setCurrent} currentKey={0} />
            <List data={data} prefix={prefix} active={active} />
            <div></div>
        </div>
    )

}

export default Article;