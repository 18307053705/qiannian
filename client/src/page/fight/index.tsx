import React, { useState, useEffect, useCallback } from "react";
import { getFightInfo, initFightInfo, fightDir, fightGive, creatFight } from '@cgi/fight';

import FightAttr from './components/fightAttr';
import FightDuke from './components/fightDuke';
import FightResult from './components/fightResult';
import FightSet from './components/fightSet';

import './index.less';
const Fight = ({ history }) => {

    const fightResult = sessionStorage.getItem('fightResult');
    const [panel, setPanel] = useState(fightResult ? 'result' : 'duke');
    // 记录结果信息
    const [result, setResult] = useState(fightResult ? JSON.parse(fightResult) : {});
    // 记战斗信息
    const [fight, setFight] = useState();
    // 回合信息
    const [fightDirInfp, setFightDirInfp] = useState({});
    // 属性信息
    const [attrInfo, setAttrInfo] = useState();
    // 更新战斗信息
    const upFightInfo = useCallback(() => {
        getFightInfo().then(({ data }) => {
            setFight(data);
            setPanel('duke');
        })
    }, [])

    useEffect(() => {
        creatFight().then((res) => {
            setFight(res.data);
        })
    }, [])

    const dirClick = (data) => {
        fightDir(data).then((res) => {
            setFight(res.data);
        })

    }

    console.log(fight, 'fight...')
    if (!fight) {
        return null;
    }
    const { fightInfo, fightMap } = fight;
    return (
        <div className="fight-page">
            {panel === "duke" && <FightDuke fight={fight} dirClick={dirClick} fightInfo={fightInfo} fightDirInfp={fightDirInfp} />}
            {panel === "attr" && <FightAttr attrInfo={attrInfo} dirClick={dirClick} />}
            {panel === "result" && <FightResult result={result} dirClick={dirClick} />}
            {panel === "set" && <FightSet art={fightInfo.art} dirClick={dirClick} />}
        </div>
    )

}

export default Fight;