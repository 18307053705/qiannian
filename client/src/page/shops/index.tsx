import React, { useState, useEffect } from 'react';
import { List, Tab, Input } from '@components/index';
import { getList, purchase } from '@cgi/shops';
import { backGrand } from '@utils/grand';
import { jumpDetail } from '@utils/jumpPage'

const tabList = [
    { value: 0, label: "道具商店" },
    { value: 1, label: "恢复商店" },
    { value: 2, label: "丹药商店" },
    { value: 3, label: "材料商店" },
];
export const Shops = ({ history }) => {
    const [tabKey, setTabKey] = useState(0);
    const [id, setId] = useState(0);
    const [list, setList] = useState([]);
    useEffect(() => {
        // 店铺列表
        getList().then(({ data }) => {
            setList(data)
        })
    }, []);
    const data = list.filter(({ unit, type }) => {
        if (tabKey === 0 && unit === 'yuanbao') {
            return true;
        }
        if (tabKey === 1 && unit === 'tael' && type === 1) {
            return true;
        }
        if (tabKey === 2 && unit === 'tael' && type === 2) {
            return true;
        }
        if (tabKey === 3 && unit === 'tael' && type === 5) {
            return true;
        }
        return false;
    })


    const prefix = ({ id,type, in_x, price, n }, index) => {

        return (
            <div key={index}>
                <span
                    className='g_u_end'
                    onClick={() => {
                        jumpDetail(history, {
                            p: type,
                            form: 5,
                            in_x,
                            id,
                        })
                    }}
                >
                    {n}(售价:{price}{tabKey === 0 ? '元宝' : '银两'})
                </span>
            </div>
        )
    }
    const active = (row, index) => (<div><span key={index} className='g_u_end' onClick={() => { setId(row.id) }}>购买</span></div>)

    const submit = (num) => {
        purchase({
            id,
            s: Number(num)
        }).then(() => {
            setId(0)
        })
    }

    return (
        <div>
            {id ? <Input label="数量" layout={false} submit={submit} type='number' /> : ''}
            <Tab list={tabList} currentKey={tabKey} onCheng={setTabKey} />
            <List data={data} prefix={prefix} active={active} />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shops;