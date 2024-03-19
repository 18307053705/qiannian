import React, { useState, useEffect } from 'react';
import { backGrand, getTaskReward } from '@utils';
import { getTaskList, doneTask } from '@cgi/taks';
import { TASK_TYPE_MEUN, TASK_TYPE_TEXT_MEUN } from '@meun';

import SpeedText from './speedText';
import DeonTaskBtn from './deonTaskBtn';


export const Task = () => {

    const [tasks, setTasks]: any = useState({
        taskList: [],
        taskDetail: [],
    })

    const getTaskInfo = (type?: number) => {
        getTaskList({ type: type || 1 }).then(({ data, message }) => {
            if (!message) {
                const { task, taskGNum } = data;
                const taskList = taskGNum.map(({ p, s }) => ({
                    text: `${TASK_TYPE_TEXT_MEUN[p]}(${s})`,
                    type: p
                }))
                setTasks({
                    taskList,
                    taskDetail: Object.values(task || {}),
                });
            }
        })
    }
    useEffect(getTaskInfo, [])

    const deonTask = (id, type) => {
        doneTask({
            type,
            id
        }).then(({ message }) => {
            if (!message) {
                getTaskInfo(TASK_TYPE_MEUN.main);
            }

        })
    }
    const { taskDetail, taskList } = tasks;
    return (
        <div>
            <div>
                {
                    taskDetail.map((itme) => {
                        const { id, title, connet, reward, levelText } = itme;
                        connet[0] = `描述：${connet[0]}`;
                        const hide = !levelText;
                        return (
                            <div key={id}>
                                <div className='g_b'>{title}</div>
                                {connet.map((text, index) => <div key={index}>{text}</div>)}
                                {(hide && reward) && <div>奖励：{getTaskReward(reward).join(',')}</div>}
                                {levelText && <div>提示：{levelText}</div>}
                                {hide && <SpeedText task={itme} />}
                                {hide && <DeonTaskBtn task={itme} deonTask={deonTask} />}
                            </div>
                        )
                    })
                }
                {taskDetail.length === 0 && '暂无更多任务'}
            </div>
            <div>
                <div>===========================</div>
                {
                    taskList.map(({ text, type }, index) => {
                        return (<div key={index}>
                            <span className='g_u_end' onClick={() => { getTaskInfo(type); }}>{text}</span>
                        </div>)
                    })
                }
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Task;