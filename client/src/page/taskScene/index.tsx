import React, { useState, useEffect } from 'react';

import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
import Styles from './index.less';


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

    const { talk = [], speed = {}, type, grand, isCan, reward = { text: [] } } = taskInfo || {};
    const rewardText = reward.text;
    const active = talk.splice(-1)[0].split('&');

    const doneTask = () => {
        taskSceneEnd().then(({ data }) => {
            setTaskInof(data);
        })
    }
    // isCan true:未接任务 展示任务内容
    if (isCan) {
        return (
            <div className={Styles['page-task-scene']}>
                {
                    speed.done && (
                        rewardText.map((text, index) => <div key={index}>{text}</div>)
                    )
                }
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
    if (type === 2) {
        const { tNpc } = grand;
        const tpClick = () => {
            tpDir({ dir: tNpc.address }).then(() => {
                backGrand();
            })

        }
        return (
            <div className={Styles['page-task-scene']}>
                <div>描述：{taskInfo.tips}</div>
                <div>提示：{tNpc.name}在{tNpc.addressName},快过去与她交谈吧.</div>
                <div>
                    <span className='g_u_end' onClick={tpClick}>传送到{tNpc.addressName}</span>
                </div>
                <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    // isCan false:已接任务 展示未完成任务提示
    return (
        <div className={Styles['page-task-scene']}>
            111111111111111
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )









}

export default taskScene;