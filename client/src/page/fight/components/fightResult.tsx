import React, { useCallback } from "react";
import { exitFight, fightContinue } from '@cgi/fight';
const Result = ({ fight, fightInfoChang }) => {
    const continueClick = useCallback(() => {
        fightContinue().then(fightInfoChang)
    }, [])
    const { rivalMold = {}, state, results = {}, isContinue } = fight.fightMap;
    const { tasks = [], textReward = [], exp, tael, petMsg, tip } = results;
    if (state === 2) {
        return (<div>
            <div>你被{rivalMold.name}击杀了,点击传送至云荒大陆！</div>
            <span className="g_b_u" onClick={exitFight}>返回游戏</span>
        </div>)
    }

    return (
        <div>
            {tip && <div style={{ color: 'red' }}>提示：{tip}</div>}
            <div>
                {
                    isContinue ? <span className="g_u"><span onClick={continueClick}>继续</span></span> :
                        <span><span>继续</span><span> | </span></span>
                }
                <span className="g_u"><span onClick={exitFight}>返回</span></span>
            </div>
            <div>战斗胜利！</div>
            <div>恭喜玩家，成功击杀{rivalMold.name}。</div>
            {tasks.map((itme, index) => <div key={index}>任务进度：{itme}</div>)}
            <div>获得经验：{exp}</div>
            <div>获得银两：{tael}</div>
            <div>{petMsg}</div>
            {textReward.map((text, index) => <div key={index}>{text}</div>)}
            <span className="g_b_u" onClick={exitFight}>返回游戏</span>
        </div>
    )

}

export default Result;