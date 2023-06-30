import React, { useCallback } from "react";
import { fightClean, fightContinue } from '@cgi/fight';
import { backGrand } from '@utils/grand';
const Result = ({ result, dirClick }) => {
    const backClick = useCallback(() => {
        fightClean().then(() => {
            sessionStorage.removeItem('fightResult');
            backGrand();
        })
    }, [])
    const continueClick = useCallback(() => {
        sessionStorage.removeItem('fightResult');
        fightContinue().then(() => {
            dirClick()
        })
    }, [])
    const { freak = {}, statu,tasks } = result;
    if (statu === -1) {
        return (<div>
            <div>你被某某击杀了,点击传送至云荒大陆！</div>
            <span className="g_b_u" onClick={backClick}>返回游戏</span>
        </div>)
    }

    return (
        <div>
            {freak.tip && <div style={{ color: 'red' }}>提示：{freak.tip}</div>}
            <div>
                {
                    freak.continue ?  <span className="g_u"><span onClick={continueClick}>继续</span></span> :
                    <span><span>继续</span><span> | </span></span>
                }
                <span className="g_u"><span onClick={backClick}>返回</span></span>
            </div>
            <div>战斗胜利！</div>
            <div>恭喜玩家，成功击杀{freak.name}。</div>
            {
              tasks.map((itme, index) => <div key={index}>任务进度：{itme}</div>)
            }
            <div>获得经验：{freak.exp}</div>
            <div>获得银两：{freak.tael}</div>
            {freak.article && <div>获得物品：{freak.article}</div>}
            <span className="g_b_u" onClick={backClick}>返回游戏</span>
        </div>
    )

}

export default Result;