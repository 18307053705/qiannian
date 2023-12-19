import React, { useState, useEffect } from 'react';
import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
import TaskReward from './taskReward';
import TaskSpeed from './taskSpeed';
import TaskAction from './taskAction';
import Styles from './index.less';

export const taskScene = () => {
    const [taskInfo, setTaskInof] = useState();
    useEffect(() => {
        getTaskScene().then(({ data }) => {
            setTaskInof(data)
        })
    }, []);
    if (!taskInfo) {
        return null;
    }
    const { connet, speed, levelText, endText, reward, status, tpInfo, action }: any = taskInfo || {};

    const doneTask = () => {
        taskSceneEnd().then(({ data }) => {
            setTaskInof(data);
        })
    }
    // 等级不足 或者 无更多任务
    if (endText || levelText) {
        return (
            <div className={Styles['page-task-scene']}>
                <div>{endText || levelText}</div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    // 任务进行中
    if ((status === 1 || status === 0) && action) {
        return (
            <div className={Styles['page-task-scene']}>
                {connet.map((text, index) => <div key={index}>{text}</div>)}
                <TaskAction action={action} doneTask={doneTask} />
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    const taskConnet = JSON.parse(JSON.stringify(connet));
    const active = taskConnet.splice(-1)[0].split('&');
    return (
        <div className={Styles['page-task-scene']}>
            <TaskReward reward={reward} status={status} />
            {taskConnet.map((text, index) => <div key={index}>{text}</div>)}
            <TaskSpeed speed={speed} status={status} />
            <div>
                <span>{active[0]}</span>
                <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
            </div>
            <div>
            </div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default taskScene;