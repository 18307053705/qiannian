import React from 'react';
import { backGrand } from '@utils';
import { tpDir } from '@cgi/grand';
const DeonTaskBtn = ({ task, deonTask }) => {
    const { id, taskType, tpInfo, complete } = task;
    // 传送到目标位置
    const tpClick = () => {
        tpDir({ dir: tpInfo.address }).then(() => {
            backGrand();
        })

    }
    // 每日任务
    if (taskType !== 1) {
        return complete.done ? <div><span className='g_u_end' onClick={() => { deonTask(id, taskType) }}>领取奖励</span></div> : null;
    }

    return (
        <div>
            <span className='g_u_end' onClick={tpClick}>传送到{tpInfo.addressName}</span>
        </div>
    );
}
export default DeonTaskBtn;