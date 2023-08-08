import React, { useState, useEffect } from "react";
import { grounding, purchase, getDetail } from '@cgi/shopping';
import { getEquipName } from '@utils/equip';
import { jumpDetail } from '@utils/jumpPage';
import { Input, List } from '@components';
import { UNIT_MEUN } from '@meun';

const PetList = ({ history, historyClick }) => {
    const { state } = history.location;
    const { role_id } = state;
    const [shopInfo, setShopInfo] = useState()
    const [in_x, setInX]: any = useState();


    // 下架宠物
    const groundingClick = (petId) => {
        grounding({
            active: 2,
            type: 2,
            petId
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }
    // 购买宠物
    const purchaseClick = (petId) => {
        purchase({
            type: 2,
            role_id,
            petId
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }



    useEffect(() => {
        getDetail({ role_id }).then(({ data }) => {
            setShopInfo(data)
        })
    }, [])



    if (!shopInfo) {
        return null;
    }

    const prefix = ({ id, p, n, price, unit }, index) => (
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
            {n}({price}{UNIT_MEUN[unit]})
        </span>
    )
    const active = ({ id }) => {
        if (role_id) {
            return <span className='g_u_end' onClick={() => { purchaseClick(id); }}>购买</span>
        }
        return <span className='g_u_end' onClick={() => { groundingClick(id); }}>下架</span>
    }



    return (
        <div>
            <List data={shopInfo.petList} prefix={prefix} active={active} />
        </div>
    )

}

export default PetList;