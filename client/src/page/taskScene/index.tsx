import React, { useState, useEffect } from 'react';

import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
import Styles from './index.less';


const TaskResult = ({ reward, speed }) => {
    if (!speed.done) {
        return null;
    }
    const { text } = reward;
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
    console.log(taskInfo)

    const { talk = [], speed = {}, type, grand, isCan, reward = { text: [] }, isEnd, noLevel, level, treat } = taskInfo || {};
    const active = talk.length ? talk.splice(-1)[0].split('&') : [];

    const doneTask = () => {
        taskSceneEnd().then(({ data }) => {
            setTaskInof(data);
        })
    }
    // 角色等级不足
    if (noLevel) {
        return (
            <div className={Styles['page-task-scene']}>
                <TaskResult reward={reward} speed={speed} />
                <div>请先将等级提示到{level}</div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }

    // 全部任务结束
    if (isEnd) {
        return (
            <div className={Styles['page-task-scene']}>
                <TaskResult reward={reward} speed={speed} />
                {
                    talk.map((text, index) => <div key={index}>{text}</div>)
                }
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }


    // isCan true:未接任务 展示任务内容
    if (isCan) {
        return (
            <div className={Styles['page-task-scene']}>
                <TaskResult reward={reward} speed={speed} />
                {
                    talk.map((text, index) => <div key={index}>{text}</div>)
                }
                <div>
                    <span>{active[0]}</span>
                    <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
                </div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }

    // 完成任务
    if (speed.done) {
        return (
            <div className={Styles['page-task-scene']}>
                <TaskResult reward={reward} speed={speed} />
                {
                    talk.map((text, index) => <div key={index}>{text}</div>)
                }
                <div>
                    <span>{active[0]}</span>
                    <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
                </div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    // 未完成任务提示
    const { address, name, text } = treat;
    const tpClick = () => {
        tpDir({ dir: address }).then(() => {
            backGrand();
        })

    }
    return (
        <div className={Styles['page-task-scene']}>
            <div>描述：{taskInfo.tips}</div>
            <div>提示：{text}</div>
            <div>
                <span className='g_u_end' onClick={tpClick}>传送到{name}</span>
            </div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default taskScene;