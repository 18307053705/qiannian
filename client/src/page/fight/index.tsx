import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { fightDir, creatFight } from '@cgi/fight';

import FightAttr from './components/fightAttr';
import FightDuke from './components/fightDuke';
import FightResult from './components/fightResult';
import FightSet from './components/fightSet';

import './index.less';
const Fight = ({ history }) => {

    // const fightResult = sessionStorage.getItem('fightResult');
    const [panel, setPanel] = useState('duke');
    // 记录结果信息
    // const [result, setResult] = useState({});
    // 记战斗信息
    const [fight, setFight] = useState();
    // 回合信息
    // const [fightDirInfp, setFightDirInfp] = useState({});
    // 属性信息
    const [attrInfo, setAttrInfo] = useState();

    const fightInfoChang = ({ data }) => {
        console.log(data, 'data...')
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


    useEffect(() => {
        creatFight().then(fightInfoChang)
    }, [])

    const dirClick = (data) => {
        fightDir(data).then(fightInfoChang)
    }

    console.log(fight, 'fight...')
    if (!fight) {
        return null;
    }
    const { fightInfo, fightMap } = fight;
    // fightInfo={fightInfo} fightDirInfp={fightDirInfp}
    return (
        <div className="fight-page">
            {panel === "duke" && <FightDuke fight={fight} dirClick={dirClick} />}
            {panel === "attr" && <FightAttr attrInfo={attrInfo} dirClick={dirClick} />}
            {panel === "result" && <FightResult fight={fight} fightInfoChang={fightInfoChang} />}
            {panel === "set" && <FightSet fightMap={fightMap} />}
        </div>
    )

}

export default Fight;