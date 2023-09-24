import React, { useState, useEffect } from 'react';
import { jumpDetail } from '@utils/jumpPage';
import { getequipList, shopEquip } from '@cgi/shops';
import { List } from '@components';
import { backGrand } from '@utils/grand';


export const TieJiangPu = ({ history }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getequipList().then(({ data }) => {
            setData(data);
        })
    }, [])

    const shopEquipClick = (id) => {
        shopEquip({ id })
    }

    const prefix = ({ name, id }) => (
        <span className="g_u_end" onClick={() => { jumpDetail(history, { p: 3, form: 5, id }) }}>{name}</span>
    );
    const active = ({ id, price }) => {
        return <span className="g_u_end" onClick={() => { shopEquipClick(id) }}>购买({price}银两)</span>
    }

    return (
        <div>
            <div>你在这里可以花费银两购买一些比较低级的装备！</div>
            <List data={data} prefix={prefix} active={active} />
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default TieJiangPu;