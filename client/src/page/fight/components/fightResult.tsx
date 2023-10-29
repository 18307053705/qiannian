import React, { useCallback } from "react";
import { exitFight, creatFight } from '@cgi/fight';





const Result = ({ fight, fightInfoChang }) => {
    const continueClick = useCallback(() => {
        creatFight({ iscContinue: true }).then(fightInfoChang)
    }, [])
    const { state, template, reward = {}, continue: iscContinue, type, escape } = fight;
    const { tasks, textReward = [], exp, tael, tip, pet } = reward;

    if (state === 3) {
        return (
            <div>
                <div>{escape}</div>
                <span className="g_u_end" onClick={exitFight}>返回游戏</span>
            </div>
        )
    }


    // 切磋
    if (type === 3) {
        return (
            <div>
                <div>{state === 1 ? `你成功击败了${template.name}。` : `你被${template.name}击败了。`}</div>
                <span className="g_u_end" onClick={exitFight}>返回游戏</span>
            </div>
        )
    }
    // 死斗 - 胜利
    if (type === 4 && state === 1) {
        return (
            <div>
                <div>你成功击败了{template.name}</div>
                <span className="g_u_end" onClick={exitFight}>返回游戏</span>
            </div>
        )
    }
    // 失败
    if (state === 2) {
        return (
            <div>
                <div>你被{template.name}击杀了！</div>
                <span className="g_u_end" onClick={exitFight}>云荒大陆</span>
            </div>
        )
    }
    return (
        <div>
            {tip && <div style={{ color: 'red' }}>提示：{tip}</div>}
            <div>
                {
                    iscContinue ? <span className="g_u"><span onClick={continueClick}>继续</span></span> :
                        <span><span>继续</span><span> | </span></span>
                }
                <span className="g_u"><span onClick={exitFight}>返回</span></span>
            </div>
            <div>战斗胜利！</div>
            <div>恭喜玩家，成功击杀{template.name}。</div>
            {
                Object.values(tasks).map(({ title, s, c }: any, index) => <div key={index}>任务进度：{title}({c}/{s})</div>)
            }
            <div>获得经验：{exp}</div>
            <div>获得银两：{tael}</div>
            <div>{pet}</div>
            {textReward.map((text, index) => <div key={index}>{text}</div>)}
            <span className="g_u_end" onClick={exitFight}>返回游戏</span>
        </div>
    )

}

export default Result;