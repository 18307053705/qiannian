import React, { useState, useEffect } from 'react';

import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
import Styles from './index.less';


const TaskResult = ({ reward }) => {
    const { text = [] } = reward || {};
    return (
        text.map((text, index) => <div key={index}>{text}</div>)
    )
}

export const taskScene = () => {
    const [taskInfo, setTaskInof] = useState();
    const getTaskInfo = () => {
        getTaskScene().then(({ data }) => {
            setTaskInof(data)
        })
    }
    useEffect(getTaskInfo, []);
    if (!taskInfo) {
        return null;
    }
    const { connet, complete, grand, noLevel, endText, reward }: any = taskInfo || {};

    // const { done = [], receive, status, reward = { text: [] }, isEnd, noLevel, level, complete, grand,tips } = taskInfo || {};
    // const talk = status === 0 ? receive : done;
    const active = connet.splice(-1)[0].split('&');

    const doneTask = () => {
        taskSceneEnd().then(({ data }) => {
            setTaskInof(data);
        })
    }

    if (endText || noLevel) {
        return (
            <div className={Styles['page-task-scene']}>
                <div>{endText || noLevel}</div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    return (
        <div className={Styles['page-task-scene']}>
            <TaskResult reward={reward} />
            {connet.map((text, index) => <div key={index}>{text}</div>)}
            <div>
                <span>{active[0]}</span>
                <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
            </div>
            <div>
            </div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )

    // isCan true:未接任务 展示任务内容
    // if (status === 0) {
    //     return (
    //         <div className={Styles['page-task-scene']}>
    //             {
    //                 talk.map((text, index) => <div key={index}>{text}</div>)
    //             }
    //             <div>
    //                 <span>{active[0]}</span>
    //                 <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
    //             </div>
    //             <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
    //         </div>
    //     )
    // }

    // 完成任务
    // if (status === 2 || status === 3) {
    //     return (
    //         <div className={Styles['page-task-scene']}>
    //             <TaskResult reward={reward} />
    //             {
    //                 talk.map((text, index) => <div key={index}>{text}</div>)
    //             }
    //             <div>
    //                 <span>{active[0]}</span>
    //                 <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
    //             </div>
    //             <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
    //         </div>
    //     )
    // }

    // const { npc, tNpc, freak = [] } = grand || {};
    // let tpInfo = npc;
    // if (status === 2 && tNpc) {
    //     tpInfo = tNpc;
    // }
    // if (status === 1 && freak.length) {
    //     const { freak: freakS } = complete;
    //     tpInfo = freak.find(({ id }) => freakS[id].s > freakS[id].c);
    // }

    // const { addressName, address } = tpInfo;

    // // 未完成任务提示
    // // const { name, text } = treat;
    // const tpClick = () => {
    //     tpDir({ dir: address }).then(() => {
    //         backGrand();
    //     })

    // }
    // return (
    //     <div className={Styles['page-task-scene']}>
    //         {/* <div>描述：{taskInfo.tips}</div> */}
    //         {/* <div>提示：{tips}</div> */}
    //         <div>
    //             <span className='g_u_end' onClick={tpClick}>传送到{addressName}</span>
    //         </div>
    //         <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
    //     </div>
    // )
}

export default taskScene;