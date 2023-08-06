import React, { useState } from "react";
import { grounding, purchase } from '@cgi/shopping';
import { getEquipName } from '@utils/equip'
import { Input, List } from '@components';
const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName({ ext, n });
}
const ArticleList = ({ history, data, roleId, updataDetail }) => {
    const [error, setError] = useState('')
    const [in_x, setInX]: any = useState();
    const activeClick = (itme, index) => {
        setError('');
        // 下架
        if (!roleId) {
            grounding({ in_x: index - 1, type: 1, active: 2 }).then(({ message }) => {
                if (message) {
                    setError(message);
                } else {
                    updataDetail(roleId);
                }

            })
            return;
        }
        // 购买
        if (itme.p == 3) {
            purchaseClick(1, index);
            return;
        }
        setInX(index)
    }

    const prefix = ({ id, p, ext, s, n, price }, index) => (
        <span
            className='g_u_end'
            onClick={() => {
                history.push('/articleDetail', { id, in_x: index - 1, kanapsackType: 4, t_roleId: roleId, p });
            }}>
            {index}. {namehandel(n, p, ext)} x {s}({price}/件)
        </span>
    )
    const active = (itme, index) => (
        <span className='g_u_end' onClick={() => { activeClick(itme, index); }}>{roleId ? '购买' : '下架'}</span>
    )

    const purchaseClick = (num, index) => {
        purchase({
            type: 1,
            role_id: roleId,
            in_x: index - 1,
            s: Number(num),
        }).then(({ message }) => {
            if (message) {
                setError(message);
            } else {
                updataDetail(roleId);
                setInX(0)
            }
        })
    }

    const submit = (num) => {
        purchaseClick(num, in_x);
    }
    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            {in_x ? <Input submit={submit} label='物品数量' type='number' /> : ''}
            <List data={data} prefix={prefix} active={active} />
        </div>
    )

}

export default ArticleList;