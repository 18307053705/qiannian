import React, { useState, useEffect } from 'react';
import { getequipList, shopEquip } from '@cgi/shops';
import { List } from '@components';
import { jumpDetail, backGrand, getEquipName } from '@utils';


export const TieJiangPu = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getequipList().then(({ data }) => {
            setData(data.map((item) => ({ ...item, name: getEquipName({ name: item.name }) })));
        })
    }, [])

    const shopEquipClick = (id) => {
        shopEquip({ id })
    }

    const prefix = ({ name, id }) => (
        <span className="g_u_end" onClick={() => { jumpDetail({ isEquip: true, form: 5, id }) }}>{name}</span>
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