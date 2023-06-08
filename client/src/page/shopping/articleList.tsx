import React, { useState, useEffect, useMemo } from "react";
import { getKnapsack } from '@cgi/knapsack';
import { grounding, purchase } from '@cgi/shopping';
import { getEquipName } from '@utils/equip'
import { Input, List } from '@components';
import { number } from "prop-types";
const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName(ext, n);
}
const ArticleList = ({ history, data, roleId, updataDetail }) => {
    const [error, setError] = useState('')
    const [in_x, setInX]: any = useState();
    const activeClick = (itme, index) => {
        setError('');
        // 下架
        if (!roleId) {
            grounding({ in_x: index, type: 1, active: 2 }).then((res) => {
                updataDetail();
            })
            return;
        }
        // 购买
        if (itme.p == 3) {
            submit(1, index);
            return;
        }
        setInX(index)
    }

    const prefix = ({ id, in_x, p, ext, s, n,price }, index) => (
        <span className='g_u'>
            <span
                onClick={() => {
                    history.push('/knapsackDetail', { id, in_x, p, type: 1 })
                }}>
                {index}. {namehandel(n, p, ext)} x {s}({price}银两/件)
            </span>
        </span>
    )
    const active = (itme, index) => (
        <span className='g_u_end' onClick={() => { activeClick(itme, index); }}>{roleId ? '购买' : '下架'}</span>
    )

    const submit = (num, index=0) => {
        
        purchase({
            type: 1,
            role_id: roleId,
            in_x: (index ? index : in_x) - 1,
            s: Number(num),
        }).then(({ message }) => {
            if (message) {
                setError(message);
            } else {
                updataDetail();
                setInX(0)
            }
        })
    }
    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            {in_x  ?  <Input submit={submit} label='物品数量' type='number' /> : ''}
            <List data={data} prefix={prefix} active={active} />
            <div></div>
        </div>
    )

}

export default ArticleList;