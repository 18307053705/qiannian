import React from 'react';
const TASK_TYPE = {
    zhandou: 1, // 战斗
    duihau: 2, // 对话
    shouji: 3, // 收集
    biaoxiang: 4, // 宝箱
    migong: 5, // 迷宫
    task: 6, // 任务战斗
}

const SpeedText = ({ task }) => {
    const { grand, complete, status, type } = task;
    if (status === 0) {
        return <div>进度：{grand.npc.name}(未领取)</div>;
    }
    if (complete && (type === TASK_TYPE.zhandou || type === TASK_TYPE.shouji)) {
        const { freak, article } = complete;
        const speedArr = [...Object.values(freak || article || {})];
        return <div>进度：{speedArr.map(({ name, n, s, c }: any) => `${name || n}(${c}/${s})`).join(',')}</div>;
    }
    if (type === TASK_TYPE.duihau) {
        const { name } = grand.tNpc || grand.npc;
        return <div>进度：{name}对话(未完成)</div>
    }
    return null;
}


export default SpeedText;