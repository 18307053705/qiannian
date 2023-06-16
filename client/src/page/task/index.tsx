import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getTaskDetail, getTaskList, doneTask } from '@cgi/taks';



export const Task = () => {
    const [error, setError] = useState('')
    const [updata, setUpdata]: any[] = useState(false);
    const [taskList, setTaskList]: any[] = useState([]);
    const [taskDetail, setTaskDetail]: any = useState([]);
    const getDetail = (type) => {
        getTaskDetail({ type }).then(({ data }) => {
            setTaskDetail(data);
        })
    }
    useEffect(() => {
        Promise.all([getTaskList(), getTaskDetail()]).then((res) => {
            setTaskList(res[0].data);
            setTaskDetail(res[1].data);
            setError('');
        })
    }, [updata])

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

    return (
        <div>
            <div>
                {
                    taskDetail.map(({ title, tips, reward = [], speed, type, btn }, index) => {
                        return (
                            <div key={index}>
                                <div className='g_b'>{title}</div>
                                <div>描述：{tips}</div>
                                <div>奖励：{reward}</div>
                                <div>进度：{speed} </div>
                                <span>
                                    {btn && <span className='g_u_end' onClick={() => { deonTask(type, index) }}>{btn}</span>}
                                </span>
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
                            <span className='g_u_end' onClick={() => { getDetail(type) }}>{text}</span>
                        </div>)

                    })
                }

            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Task;