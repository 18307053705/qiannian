import React, { useState, useEffect } from 'react';
import { backGrand, getTaskReward } from '@utils';
import { getTaskList, doneTask, completionTask } from '@cgi/taks';
import { TASK_TYPE_MEUN, TASK_TYPE_TEXT_MEUN, DAIL_TYPE_LIST } from '@meun';
import SpeedText from './speedText';
import DeonTaskBtn from './deonTaskBtn';


export const Task = () => {

    const [tasks, setTasks]: any = useState({
        taskList: [],
        taskDetail: [],
    })
    const [reward, setReward] = useState()

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
        setReward(undefined);
        doneTask({
            type,
            id
        }).then(({ message, data }) => {
            if (!message) {
                getTaskInfo(TASK_TYPE_MEUN.main);
                setReward(data);
            }
        })
    }

    const completionTaskClick = (type) => {
        setReward(undefined);
        completionTask({ type }).then(({ message, data }) => {
            if (!message) {
                getTaskInfo(TASK_TYPE_MEUN.main);
                setReward(data);
            }
        })
    }

    const { taskDetail, taskList } = tasks;
    return (
        <div>
            {getTaskReward(reward).map((text, index) => <div key={index}>{text}</div>)}
            <div>
                {
                    taskDetail.map((itme) => {
                        const { id, title, connet, reward, levelText } = itme;
                        const hide = !levelText;
                        return (
                            <div key={id}>
                                <div className='g_b'>{title}</div>
                                {connet.map((text, index) => <div key={index}>{index === 0 ? `描述：${text}` : text}</div>)}
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
                        return (
                            <div key={index}>
                                <span className='g_u'>
                                    <span onClick={() => { setReward(undefined); getTaskInfo(type); }}>{text}</span>
                                </span>

                                {
                                    DAIL_TYPE_LIST.includes(type) && (
                                        <span className='g_u'>
                                            <span onClick={() => { completionTaskClick(type); }}>一键完成</span>
                                        </span>)
                                }

                            </div>
                        )
                    })
                }
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Task;