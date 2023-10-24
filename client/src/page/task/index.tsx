import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { tpDir } from '@cgi/grand';
import { getTaskList, doneTask } from '@cgi/taks';

const SpeedText = ({ task }) => {
    const { grand, speed, status } = task;
    if (status === 0) {
        return <div>进度：{grand.npc.name}(未领取)</div>;
    }
    if (speed) {
        const { fight, exist } = speed;
        const speedArr = [...Object.values(fight || {}), ...Object.values(exist || {})];
        return <div>进度：{speedArr.map(({ n, s, c }: any) => `${n}(${c}/${s})`).join(',')}</div>;
    }
    const { name } = grand.tNpc || grand.npc;
    return <div>进度：{name}对话(未完成)</div>
}

const DeonTaskBtn = ({ task, dailList, deonTask }) => {
    const { id, speed, taskType, tpInfo } = task;
    // 传送到目标位置
    const tpClick = () => {
        tpDir({ dir: tpInfo.address }).then(() => {
            backGrand();
        })

    }
    // 每日任务
    if (dailList.includes(taskType) && speed.done) {
        return <div><span className='g_u_end' onClick={() => { deonTask(id, taskType) }}>领取奖励</span></div>;
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
                getTaskInfo(type);
            }

        })
    }
    const { taskDetail, taskList, dailList } = tasks;
    return (
        <div>
            <div>
                {
                    taskDetail.map((itme) => {
                        const { id, title, tips, reward = { text: [] } } = itme;
                        return (
                            <div key={id}>
                                <div className='g_b'>{title}</div>
                                <div>描述：{tips}</div>
                                <div>奖励：{reward.text.join(',')}</div>
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