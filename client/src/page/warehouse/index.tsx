import React from 'react';
import {backGrand} from '@utils/grand'


export const Warehouse = ({ history }) => {
    return (
        <div>
           
            <div><span className="g_b" onClick={() => { history.push('/knapsack', { type: 2 }) }}>存物品</span></div>
            <div><span className="g_b" onClick={() => { history.push('/knapsack', { type: 3 }) }}>取物品</span></div>
            =============
            <div><span className="g_b" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Warehouse;