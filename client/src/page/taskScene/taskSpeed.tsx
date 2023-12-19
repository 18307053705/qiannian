import React from 'react';
const taskSpeed = ({ speed, status }) => {
    if (status !== 1 || !speed) {
        return null;
    }
    const { fight, exist } = speed;
    const speedArr = [...Object.values(fight || {}), ...Object.values(exist || {})];
    return <div>进度：{speedArr.map(({ n, s, c }: any) => `${n}(${c}/${s})`).join(',')}</div>;

}

export default taskSpeed