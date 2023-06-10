import React from 'react';
import { backGrand } from '@utils/grand';



export const Task = () => {

    return (
        <div>
            <div>
                <div>标题</div>
                <div>描述</div>
                <div>奖励(状态)</div>
                <div>传送</div>
            </div>
            <div></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Task;