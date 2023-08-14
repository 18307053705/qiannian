import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getTaskList, doneTask } from '@cgi/taks';

const getSpeedText = (speed) => {
    const { fight, exist } = speed;
    const speedArr = [...Object.values(fight || {}), ...Object.values(exist || {})];
    return speedArr.map(({ n, s, c }: any) => `${n}(${c}/${s})`).join(',');
}

const DeonTaskBtn = ({ task, dailList, deonTask }) => {
    const { id, speed, taskType, grand } = task;
    const { done } = speed;
    const { npc, tNpc, freak } = grand || {};
    const { addressName } = tNpc || freak || npc;
    // 每日任务
    if (dailList.includes(taskType)) {
        return done ? (
            <div><span className='g_u_end' onClick={() => { deonTask(id, taskType) }}>领取奖励</span></div>
        ) : null;
    }

    return (
        <div>
            <span className='g_u_end' onClick={() => { deonTask(id, taskType) }}>传送到{addressName}</span>
        </div>
    );
}

export const Task = () => {
    const [error, setError] = useState('')
    const [updata, setUpdata]: any[] = useState(false);
    const [tasks, setTasks]: any = useState({
        taskList: [],
        taskDetail: [],
        dailList: []
    })
    const getTaskInfo = (type = 'exp') => {
        getTaskList({ type }).then(({ data, message }) => {
            if (!message) {
                setTasks({
                    taskList: data.taskList,
                    taskDetail: data.task ? [data.task] : [],
                    dailList: data.DAIL_TYPE_LIST
                });
            }
        })
    }
    useEffect(getTaskInfo, [updata])

    const deonTask = (type, in_x) => {
        doneTask({
            type,
            in_x
        }).then(({ data, message }) => {
            if (message) {
                setError(message);
            } else if (typeof data === 'string') {
                setUpdata(!updata);
            } else {
                backGrand();
            }

        })
    }
    const { taskDetail, taskList, dailList } = tasks;
    return (
        <div>
            <div>
                {
                    taskDetail.map((itme) => {
                        const { id, title, tips, reward = { text: [] }, speed } = itme;
                        return (
                            <div key={id}>
                                <div className='g_b'>{title}</div>
                                <div>描述：{tips}</div>
                                <div>奖励：{reward.text.join(',')}</div>
                                <div>进度：{getSpeedText(speed)} </div>
                                <DeonTaskBtn task={itme} dailList={dailList} deonTask={deonTask} />
                            </div>
                        )
                    })
                }
                {error && <div style={{ color: 'red' }}>提示：{error}</div>}
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