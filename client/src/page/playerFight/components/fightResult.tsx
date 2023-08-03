import React from "react";
import { exitFight } from '@cgi/player';

const FightResult = ({ fight }) => {
    const { results } = fight.myFightMap;
    return (
        <div>
            <div>{results.text}</div>
            <div onClick={exitFight} className="g_u_end">返回地图</div>
        </div>
    )
}

export default FightResult;