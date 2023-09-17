import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List, Input } from '@components';
import { getList, auction } from '@cgi/paiMai';


const getUinxDay = (out_timer) => {
    const time =  Math.floor(out_timer - new Date()) / 1000;
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    let text = "剩余竞拍时间:";
    if (m) {
        text += `${m}分`;
    }
    return `${text}${s}秒`;
};

export const PaiMaiHang = ({ history }) => {
    const [list, setList]: any = useState([]);
    const [idP, setIdP] = useState('');
    const [price, setPrice] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        getList().then(({ data }) => {
            setList(data);
        })
    }, [])



    const prefix = ({ id_p, info, role_name, price,out_timer }) => {
        return (
            <div>
                <span>{role_name}:{info.n}x1,当前竞价:{price}银两,{getUinxDay(out_timer)}</span>
                <span className='g_u_end' onClick={() => {
                    setIdP(id_p);
                    setPrice(price);
                }}>竞拍</span>
            </div>
        )
    }

    const submit = (num) => {
        if (num < price) {
            setError(`价格不可低于${price}`);
            return;
        } else {
            setError('');
        }
        auction({
            id_p: idP,
            price: num
        }).then(({ data }) => {
            setList(data || list);
            setIdP('');
        })
    }
    return (
        <div>
            {error && <div className="g_error">{error}</div>}
            {idP && <Input defaultValue={price} submit={submit} type='number' close={() => { setIdP('') }} />}
            <List
                data={list}
                prefix={prefix}
                emptyText='暂无拍卖物品'
            />
            <div>
                <span className="g_u_end" onClick={() => { history.push('/knapsack', { type: 5 }) }}>拍卖物品</span>
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default PaiMaiHang;