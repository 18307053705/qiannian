import React, { useState } from 'react';
import { backGrand } from '@utils/grand';
import { exchange } from '@cgi/yinHang';
import { Input } from '@components';


export const YinHang = ({ history }) => {
    const [pageKey, setPageKey] = useState(0);
    const submit = (num) => {
        
        exchange({
            type: pageKey,
            num
        }).then(() => {
            setPageKey(0);
        })
    }

    if (pageKey) {
        return (
            <div>
                <div>{pageKey === 1 ? '提示：兑换1元宝需要消耗100000银两' : '提示：1元宝可兑换成50000银两'}</div>
                <Input
                    label='数量'
                    submit={submit}
                    close={() => { setPageKey(0); }}
                    type='number'
                    layout={false}
                />
            </div>
        )
    }


    return (
        <div>
            <div>欢迎来到千年老字号银行,你可以在进行物品存储以及货币兑换！</div>
            <div><span className="g_u_end" onClick={() => { history.push('/knapsack', { type: 2 }) }}>存物品</span></div>
            <div><span className="g_u_end" onClick={() => { history.push('/knapsack', { type: 3 }) }}>取物品</span></div>
            <div><span className="g_u_end" onClick={() => { setPageKey(1) }}>兑换银两</span></div>
            <div><span className="g_u_end" onClick={() => { setPageKey(2) }}>兑换元宝</span></div>
            =============
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default YinHang;