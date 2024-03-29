import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { fightDir, creatFight } from '@cgi/fight';

import FightDuke from './components/fightDuke';
import FightResult from './components/fightResult';
import FightSet from './components/fightSet';

import './index.less';
const Fight = () => {
    const [panel, setPanel] = useState('duke');
    // 记战斗信息
    const [fight, setFight] = useState();

    const fightInfoChang = ({ data }) => {
        const { fightMap } = data;
        let panelKey = 'duke';
        if (fightMap.state) {
            panelKey = 'result';
        }
        unstable_batchedUpdates(() => {
            setFight(data);
            setPanel(panelKey);
        })

    }

    const getFightInfo = () => {
        creatFight().then(fightInfoChang);
    }

    useEffect(getFightInfo, [])

    const dirClick = (data) => {
        fightDir(data).then(fightInfoChang)
    }

    if (!fight) {
        return null;
    }
    
    return (
        <div className="fight-page">
            {panel === "duke" && <FightDuke fight={fight} dirClick={dirClick} setPanel={setPanel} />}
            {panel === "result" && <FightResult fight={fight} fightInfoChang={fightInfoChang} />}
            {panel === "set" && <FightSet getFightInfo={getFightInfo}/>}
        </div>
    )

}

export default Fight;