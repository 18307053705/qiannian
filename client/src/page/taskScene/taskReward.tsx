import React from 'react';
const TaskReward = ({ reward, status }) => {
    if (status !== 2 && status !== 3) {
        return null;
    }
    const { text = [] } = reward || {};
    return (
        text.map((text, index) => <div key={index}>{text}</div>)
    )
}

export default TaskReward