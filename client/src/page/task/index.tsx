import React, { useState, useEffect } from 'react';
import { backGrand, getTaskReward } from '@utils';
import { tpDir } from '@cgi/grand';
import { getTaskList, doneTask } from '@cgi/taks';
import { TASK_TYPE_MEUN } from '@meun';
const TASK_TYPE = {
    zhandou: 1, // 战斗
    duihau: 2, // 对话
    shouji: 3, // 收集
    biaoxiang: 4, // 宝箱
    migong: 5, // 迷宫
    task: 6, // 任务战斗
}

const SpeedText = ({ task }) => {
    const { grand, complete, status, type } = task;
    if (status === 0) {
        return <div>进度：{grand.npc.name}(未领取)</div>;
    }
    if (complete && (type === TASK_TYPE.zhandou || type === TASK_TYPE.shouji)) {
        const { freak, article } = complete;
        const speedArr = [...Object.values(freak || article || {})];
        return <div>进度：{speedArr.map(({ name, n, s, c }: any) => `${name || n}(${c}/${s})`).join(',')}</div>;
    }
    if (type === TASK_TYPE.duihau) {
        const { name } = grand.tNpc || grand.npc;
        return <div>进度：{name}对话(未完成)</div>
    }
    return null;
}

const DeonTaskBtn = ({ task, dailList, deonTask }) => {
    const { id, taskType, tpInfo, complete } = task;
    // 传送到目标位置
    const tpClick = () => {
        tpDir({ dir: tpInfo.address }).then(() => {
            backGrand();
        })

    }
    // 每日任务
    if (dailList.includes(taskType)) {
        return complete.done ? <div><span className='g_u_end' onClick={() => { deonTask(id, taskType) }}>领取奖励</span></div> : null;
    }

    return (
        <div>
            <span className='g_u_end' onClick={tpClick}>传送到{tpInfo.addressName}</span>
        </div>
    );
}

export const Task = () => {

    const [tasks, setTasks]: any = useState({
        taskList: [],
        taskDetail: [],
        dailList: []
    })

    const getTaskInfo = (type?: number) => {
        if (type) {
            sessionStorage.setItem('taskType', type.toString())
        }
        const taskType = sessionStorage.getItem('taskType') || '1';
        getTaskList({ type: type || Number(taskType) }).then(({ data, message }) => {
            if (!message) {
                setTasks({
                    taskList: data.taskList,
                    taskDetail: data.task ? Object.values(data.task) : [],
                    dailList: data.DAIL_TYPE_LIST
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
    const { taskDetail, taskList, dailList } = tasks;
    return (
        <div>
            <div>
                {
                    taskDetail.map((itme) => {
                        const { id, title, tips, reward, taskType } = itme;
                        return (
                            <div key={id}>
                                <div className='g_b'>{title}</div>
                                <div>描述：{tips}</div>
                                {
                                    taskType !== TASK_TYPE_MEUN.copy ? <div>奖励：{getTaskReward(reward).join(',')}</div> : ''
                                }
                                <SpeedText task={itme} />
                                <DeonTaskBtn task={itme} dailList={dailList} deonTask={deonTask} />
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
                            <span className='g_u_end' onClick={() => { getTaskInfo(type) }}>{text}</span>
                        </div>)
                    })
                }
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Task;