import React, { useState, useEffect } from 'react';
import { BackGrand } from '@components';
import { getCopyTaskList, getTaskInfo, receiveTask } from '@cgi/xuanshanbang';
import { getTaskReward } from '@utils';
import TaskDetail from './taskDetail';

import Styles from './index.less';

export default () => {
    const [list, setList] = useState([]);
    const [curId, setCurId] = useState<number>(110);
    const [taskInfo, setTaskInfo] = useState();
    const [reward, setReward] = useState();

    useEffect(() => {
        getCopyTaskList().then((res) => {
            setList(res.data);
        })
    }, [])

    // 获取任务详情
    const getTaskInfoClick = (id) => {
        getTaskInfo({ id }).then((res => {
            setTaskInfo(res.data);
            setCurId(id);
        }))
    }
    // 领取任务 || 完成任务
    const receiveTaskClick = (id, type) => {
        receiveTask({ id, type }).then((res => {
            const { data, success } = res;
            if (type === 1 && success) {
                getTaskInfoClick(id);
            }
            if (type === 2 && data) {
                setReward(data);
                getTaskInfoClick(id);
            }

        }))
    }


    return (
        <div>
            <div>提示：悬赏任务每日可领取两次，完成后可以获得大量经验与装备材料。</div>
            <div>=================</div>
            {getTaskReward(reward).map((text, index) => <div key={index}>{text}</div>)}
            {
                list.map(({ id, title, level }) => {
                    return (
                        <div key={id}>
                            <div className={Styles.li}>
                                <span
                                    className='g_u_end'
                                    onClick={() => { getTaskInfoClick(id) }}>
                                    {title}({level})
                                </span>
                            </div>
                            <TaskDetail id={id} taskInfo={taskInfo} curId={curId} receiveTaskClick={receiveTaskClick} />
                        </div>
                    )
                })
            }
            <div>=================</div>
            <BackGrand />
        </div>

    )
}
