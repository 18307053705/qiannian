import React, { useState, useEffect } from "react";
import { grounding, purchase, getDetail } from '@cgi/shopping';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpDetail';
import { Input, List } from '@components';
const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName({ ext, n });
}
const ArticleList = ({ history, historyClick }) => {
    const { state } = history.location;
    const { role_id } = state;
    const [shopInfo, setShopInfo] = useState()
    const [in_x, setInX]: any = useState();


    // 下架物品
    const groundingClick = (index) => {
        grounding({
            active: 2,
            type: 1,
            in_x: index - 1
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }
    // 购买物品
    const purchaseClick = (num, index) => {
        purchase({
            type: 1,
            role_id,
            in_x: index - 1,
            s: Number(num),
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }

    const activeClick = (itme, index) => {
        // 下架
        if (!role_id) {
            groundingClick(index);
            return;
        }
        // 装备直接购买
        if (itme.p == 3) {
            purchaseClick(1, index);
            return;
        }
        // 非装备选择数量
        setInX(index)
    }


    useEffect(() => {
        getDetail({ role_id }).then(({ data }) => {
            setShopInfo(data)
        })
    }, [])



    if (!shopInfo) {
        return null;
    }

    const prefix = ({ id, p, ext, s, n, price }, index) => (
        <span
            className='g_u_end'
            onClick={() => {
                jumpDetail(history, {
                    p,
                    role_id,
                    form: 4,
                    in_x: index - 1
                })
            }}>
            {index}. {namehandel(n, p, ext)} x {s}({price}/件)
        </span>
    )
    const active = (itme, index) => (
        <span className='g_u_end' onClick={() => { activeClick(itme, index); }}>{role_id ? '购买' : '下架'}</span>
    )


    const submit = (num) => {
        purchaseClick(num, in_x);
    }
    return (
        <div>
            {in_x ? <Input submit={submit} label='物品数量' type='number' /> : ''}
            <List data={shopInfo.article} prefix={prefix} active={active} />
        </div>
    )

}

export default ArticleList;