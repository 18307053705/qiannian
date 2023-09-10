import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getTaskScene, active } from '@cgi/rankTask';
import { List } from '@components';




export const RankTask = ({ history }) => {
    const [taskInfo, setTaskInfo] = useState();

    useEffect(() => {
        getTaskScene().then(({ data }) => {
            setTaskInfo(data);
        })
    }, [])

    const activeClick = (data?: { freakId: number }) => {
        active(data).then(({ data }) => {
            setTaskInfo(data);
        })
    }

    if (!taskInfo) {
        return null;
    }
    const { tNpc, task } = taskInfo;
    const { receive, title, status } = task;
    const prefix = ({ s, c, name, ...freak }) => {
        const treat = s > c;
        return (
            <div>
                <div>{name}({treat ? `${c}/${s}` : '已完成'})</div>
                <div><span>奖励：经验+100000,姻缘树+10,姻缘果+1</span></div>
                {!treat && <div><span className='g_u_end'>领取奖励</span></div>}
            </div>
        )
    }
    // 完成任务剧情
    if (tNpc) {
        return (
            <div>
                <div>{title}</div>
                <List data={task.freak} prefix={prefix} hiddenFooter={true}/>
                <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }
    // 接任务剧情
    const activeList = receive.length ? receive.splice(-1)[0].split('&') : [];
    return (
        <div>
            <div>{title}</div>
            {
                receive.map((text, index) => <div key={index}>{text}</div>)
            }
            {
                status ? null : (<div>
                    <span>{activeList[0]}</span>
                    <span className='g_u_end' onClick={() => { activeClick() }}>{activeList[1]}</span>
                </div>)
            }

            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default RankTask;