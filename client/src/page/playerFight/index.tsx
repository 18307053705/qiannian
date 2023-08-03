import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { creatPlayerFight, playerFightDir } from '@cgi/player';

import FightDuke from './components/fightDuke';
import FightResult from './components/fightResult';
import FightSet from './components/fightSet';

// import './index.less';
const PlayerFight = () => {
    const [panel, setPanel] = useState('duke');
    // 记战斗信息
    const [fight, setFight] = useState();

    const fightInfoChang = ({ data }) => {
        const { myFightMap } = data;
        let panelKey = 'duke';
        if (myFightMap.state) {
            panelKey = 'result';
        }
        unstable_batchedUpdates(() => {
            setFight(data);
            setPanel(panelKey);
        })

    }

    const getFightInfo = () => {
        creatPlayerFight().then(fightInfoChang);
    }

    useEffect(getFightInfo, [])

    const dirClick = (data) => {
        playerFightDir(data).then(fightInfoChang)
    }

    if (!fight) {
        return null;
    }

    return (
        <div className="player-fight-page">
            {panel === "duke" && <FightDuke fight={fight} dirClick={dirClick} setPanel={setPanel} />}
            {panel === "set" && <FightSet getFightInfo={getFightInfo} />}
            {panel === "result" && <FightResult fight={fight}  />}
        </div>
    )

}

export default PlayerFight;