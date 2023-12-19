import React from 'react';
const TaskAction = ({ action, doneTask }) => {
    const { type, text } = action;
    // 九宫格
    if (type === 1) {
        return (
            <div>
                <div>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                </div>
                <div>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                </div>
                <div>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                    <span className='g_u' onClick={doneTask}><span>{text}</span></span>
                </div>
            </div>
        )
    }
    // 方向选择
    if (type === 2) {
        return (
            <div>
                <div><span className='g_u_end' style={{ display: 'inline-block', marginLeft: '20px' }} onClick={doneTask}>{text[0]}</span></div>
                <div>
                    <span className='g_u_end' onClick={doneTask}>{text[1]}</span>
                    <span className='g_u_end' style={{ display: 'inline-block', marginLeft: '20px' }} onClick={doneTask}>{text[2]}</span>
                </div>
                <div><span className='g_u_end' style={{ display: 'inline-block', marginLeft: '20px' }} onClick={doneTask}>{text[3]}</span></div>
            </div>
        );
    }
    return null;

}

export default TaskAction