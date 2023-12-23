import React, { useState, useEffect } from 'react';
import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { backGrand, getTaskReward } from '@utils';
import { TASK_TYPE, TASK_STATU } from '@meun';
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
    const { connet, speed, levelText, endText, reward, status, action, type, complete }: any = taskInfo || {};

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
    const { done, text } = complete || {};
    // 任务进行中
    if ((TASK_TYPE.biaoxiang === type || TASK_TYPE.migong === type) && !done) {
        return (
            <div className={Styles['page-task-scene']}>
                {text ? text : connet.map((text, index) => <div key={index}>{text}</div>)}
                <TaskAction action={action} doneTask={doneTask} />
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    const taskConnet = JSON.parse(JSON.stringify(connet));
    const active = taskConnet.splice(-1)[0].split('&');
    return (
        <div className={Styles['page-task-scene']}>
            {getTaskReward(done ? reward : []).map((text, index) => <div key={index}>{text}</div>)}
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