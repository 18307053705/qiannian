import React, { useState, useEffect } from 'react';

import { getTaskScene,taskSceneActive } from '@cgi/taks';
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
    useEffect(getTaskInfo, [])
    console.log(taskInfo);
    if (!taskInfo) {
        return null;
    }
    const { neck = [], done = [], speed, type, grand, isCan } = taskInfo || {};
    const isDone = !speed || speed.done;
    const list = isCan ? neck : done;
    const active = isCan ? neck.splice(-1)[0].split('&') : done.splice(-1)[0].split('&');

    const doneTask = () => {
        taskSceneActive().then(({data})=>{
            console.log(data,'data...');
            setTaskInof(data);
        })
        // if(isCan){
        //     getTaskInfo();
        //     return;
        // }
        // // 战斗任务
        // if (type === 1) {

        // }
        // // 对话任务
        // if (type === 2) {

        // }

        // console.log('完成任务');
        // active
    }

    return (
        <div className={Styles['page-task-scene']}>
            {
                list.map((text, index) => <div key={index}>{text}</div>)
            }
            <div>
                <span>{active[0]}</span>
                <span className='g_u_end' onClick={doneTask}>{active[1]}</span>
            </div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )




}

export default taskScene;