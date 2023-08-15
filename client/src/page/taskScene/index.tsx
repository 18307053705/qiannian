import React, { useState, useEffect } from 'react';

import { getTaskScene } from '@cgi/taks';
import { backGrand } from '@utils/grand';
import Styles from './index.less';


export const taskScene = () => {
    const [taskInfo, setTaskInof] = useState();
    useEffect(() => {
        getTaskScene().then(({ data }) => {
            setTaskInof(data)
        })
    }, [])
    console.log(taskInfo);
    if (!taskInfo) {
        return null;
    }
    const { neck = [], done = [], speed } = taskInfo || {};
    const isDone = !speed || !speed.done;
    const list = isDone ? done : neck;
    const active = isDone ? done.splice(-1)[0].split('&') : neck.splice(-1)[0].split('&');
    return (
        <div className={Styles['page-task-scene']}>
            {
                list.map((text, index) => <div key={index}>{text}</div>)
            }
            <div>
                <span>{active[0]}</span>
                <span className='g_u_end'>{active[1]}</span>
            </div>

            {/* <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div> */}
        </div>
    )




}

export default taskScene;