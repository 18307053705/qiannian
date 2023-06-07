import React, { useState, useEffect } from 'react';
import { List, Tab } from '@components/index';
import { getShopList, createShop, getDetail } from '@cgi/shopping';

import { backGrand } from '@utils/grand'

import DetailShop from './detail';

const list = [
    { value: 1, label: '我的店铺' },
    { value: 2, label: '店铺列表' },
]
export const Shopping = ({ history }) => {
    const [error, setError] = useState('')
    const [key, setKey] = useState(1);
    const [info, setInfo] = useState();
    const [shopList, setShopList] = useState([]);
    useEffect(() => {
        // 店铺详情
        getDetail().then(({ data }) => {
            setInfo(data)
        })
        // 店铺列表
        getShopList().then(({ data }) => {
            setShopList(data)
        })
    }, [])

    const create = (name) => {
        createShop({ name }).then(({ data, message }) => {
            if (message) {
                setError(message)
            } else {
                setError('')
                setInfo(data)
            }
        })
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            <Tab list={list}
                currentKey={key}
                onCheng={(value) => {
                    setError('')
                    setKey(value);
                }}
            />
            {
                key === 1 ? <DetailShop history={history} info={info} create={create} />
                    : <List
                        data={shopList}
                        prefix={(row, index) => (<span>{index}.{row.name}</span>)}
                    />
            }
            <div><span className="g_b" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shopping;