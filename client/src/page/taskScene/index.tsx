import React, { useState, useEffect } from 'react';

import { getTaskStory, tpTask } from '@cgi/taks';
import { backGrand } from '@utils/grand';

import { MAIN1_100_SCENE } from './main1_100';

import Styles from './index.less';


export const taskScene = () => {
    const [updata, setUpdata] = useState(false);
    const [info, setInfo]: any = useState({ state: -1 });
    const [scne, setScne] = useState({
        page: 1,
        size: 1
    })

    useEffect(() => {
        setScne({
            page: 1,
            size: 1
        })
        getTaskStory().then(({ data }) => {
            setInfo(data);
        }).catch(() => {
            backGrand();
        })
    }, [updata])

    const scneClick = (key: 'size' | 'page', value = 2) => {
        if (key === 'size') {
            if (scne[key] === value) return;
            setScne({
                ...scne,
                size: value
            })
        };
        if (key === 'page') {
            if (info.reward) {
                setInfo({
                    ...info,
                    reward: ''
                })
            }
            setScne({
                ...scne,
                page: scne.page + 1
            })
        };


    }


    const tpClick = () => {
        tpTask({ address: info.tpNpc.address }).finally(backGrand);
    }
    const { state, reward, tpNpc, taskId, message, taskType } = info;

    if (state === 0 || state === 1) {
        const { page, size } = scne;
        const Dom: any = MAIN1_100_SCENE[taskId];
        const keep = page === size && state && !tpNpc;
        const tp = page === size && tpNpc;
        return (
            <div className={Styles['page-task-scene']}>
                <div>{reward && reward.split(',').map((itme, index) => (<div key={index}>{itme}</div>))}</div>
                {Dom && <Dom state={state} scne={scne} scneClick={scneClick} />}

                {keep ? <div><span className="g_u_end" onClick={() => { setUpdata(!updata) }}>继续</span></div> : ''}
                {tp && <div>任务目标:<span className="g_u_end" onClick={tpClick} >{tpNpc.name}</span></div>}
            </div>
        )
    }

    return (
        <div className={Styles['page-task-scene']}>
            {message}
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default taskScene;