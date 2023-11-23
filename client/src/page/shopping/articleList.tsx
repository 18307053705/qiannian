import React, { useState, useEffect } from "react";
import { grounding, purchase, getDetail } from '@cgi/shopping';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpPage';
import { isEquip } from '@utils';
import { Input, List } from '@components';
import { UNIT_MEUN } from '@meun';
const namehandel = (n, p, ext) => {
    if (p !== 3) {
        return n;
    }
    return getEquipName({ ext, n });
}
const ArticleList = ({ history, historyClick }) => {
    const { state } = history.location;
    const { role_id } = state;
    const [shopInfo, setShopInfo]: any = useState();
    const [uid, setUid]: any = useState();


    // 下架物品
    const groundingClick = (uid) => {
        grounding({
            active: 2,
            type: 1,
            uid
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }
    // 购买物品
    const purchaseClick = (num, uid) => {
        purchase({
            type: 1,
            role_id,
            uid,
            s: Number(num),
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }

    const activeClick = ({ id, uid }) => {
        // 下架
        if (!role_id) {
            groundingClick(uid);
            return;
        }
        // 装备直接购买
        if (isEquip(id)) {
            purchaseClick(1, uid);
            return;
        }
        // 非装备选择数量
        setUid(uid);
    }


    useEffect(() => {
        getDetail({ role_id }).then(({ data }) => {
            setShopInfo(data)
        })
    }, [])



    if (!shopInfo) {
        return null;
    }

    const prefix = ({ p, ext, s, name, price, unit }, index) => (
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
            {index}. {namehandel(name, p, ext)} x {s}({price}{UNIT_MEUN[unit]}/件)
        </span>
    )
    const active = (itme) => (
        <span className='g_u_end' onClick={() => { activeClick(itme); }}>{role_id ? '购买' : '下架'}</span>
    )


    const submit = (num) => {
        purchaseClick(num, uid);
    }
    return (
        <div>
            {uid ? <Input submit={submit} label='物品数量' type='number' /> : ''}
            <List data={shopInfo.article} prefix={prefix} active={active} />
        </div>
    )

}

export default ArticleList;