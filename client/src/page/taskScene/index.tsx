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

const SpeedText = ({ speed }) => {
    if (speed) {
        const { fight, exist } = speed;
        const speedArr = [...Object.values(fight || {}), ...Object.values(exist || {})];
        return <div>进度：{speedArr.map(({ n, s, c }: any) => `${n}(${c}/${s})`).join(',')}</div>;
    }
    return null;
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
    const { connet, speed, noLevel, endText, reward, status, tpInfo }: any = taskInfo || {};

    const doneTask = () => {
        taskSceneEnd().then(({ data }) => {
            setTaskInof(data);
        })
    }
    // 等级不足 或者 无更多任务
    if (endText || noLevel) {
        return (
            <div className={Styles['page-task-scene']}>
                <div>{endText || noLevel}</div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    // 任务进行中
    if (status === 1) {
        return (
            <div className={Styles['page-task-scene']}>
                <SpeedText speed={speed} />
                {connet.map((text, index) => <div key={index}>{text}</div>)}
                {
                    tpInfo && <span className='g_u_end' onClick={() => {
                        tpDir({ dir: tpInfo.address }).then(() => {
                            backGrand();
                        })

                    }}>传送到{tpInfo.addressName}</span>
                }
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    const active = connet.splice(-1)[0].split('&');
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

}

export default taskScene;