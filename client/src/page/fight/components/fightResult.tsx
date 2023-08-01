import React, { useCallback } from "react";
import { exitFight, fightContinue } from '@cgi/fight';
const Result = ({ fight, fightInfoChang }) => {
    const continueClick = useCallback(() => {
        fightContinue().then(fightInfoChang)
    }, [])
    const { rivalMold = {}, state, tasks = [], results = {}, isContinue } = fight.fightMap;
    if (state === 2) {
        return (<div>
            <div>你被某某击杀了,点击传送至云荒大陆！</div>
            <span className="g_b_u" onClick={exitFight}>返回游戏</span>
        </div>)
    }

    return (
        <div>
            {results.tip && <div style={{ color: 'red' }}>提示：{results.tip}</div>}
            <div>
                {
                    isContinue ? <span className="g_u"><span onClick={continueClick}>继续</span></span> :
                        <span><span>继续</span><span> | </span></span>
                }
                <span className="g_u"><span onClick={exitFight}>返回</span></span>
            </div>
            <div>战斗胜利！</div>
            <div>恭喜玩家，成功击杀{rivalMold.name}。</div>
            {
                tasks.map((itme, index) => <div key={index}>任务进度：{itme}</div>)
            }
            <div>获得经验：{results.exp}</div>
            <div>获得银两：{results.tael}</div>
            {results.article && <div>{results.article}</div>}
            <span className="g_b_u" onClick={exitFight}>返回游戏</span>
        </div>
    )

}

export default Result;