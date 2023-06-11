import React, { useState, useEffect, useCallback } from "react";
import { getFightInfo, initFightInfo, fightDir, fightGive } from '@cgi/fight';

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
    const [fightInfo, setFightInfo] = useState(initFightInfo);
    // 回合信息
    const [fightDirInfp, setFightDirInfp] = useState({});
    // 属性信息
    const [attrInfo, setAttrInfo] = useState();
    // 更新战斗信息
    const upFightInfo = useCallback(() => {
        getFightInfo().then(({ data }) => {
            setFightInfo(data);
            setPanel('duke');
        })
    }, [])

    useEffect(() => {
        if (!fightResult) {
            upFightInfo()
        }
    }, []);

    const dirClick = useCallback((dir, id) => {
        if (dir === 'player' || dir === 'rival') {
            setAttrInfo(fightInfo[dir][id]);
            setPanel('attr');
            return;
        }
        if (dir === "set") {
            setPanel('set');
            return;
        }
        if (dir === undefined) {
            upFightInfo();
            return;
        }
        fightDir({ index: dir }).then(({ data }) => {
            const { statu } = data;
            if (statu === 0) {
                upFightInfo();
                setFightDirInfp(data);
            } else {
                sessionStorage.setItem('fightResult', JSON.stringify(data));
                setResult(data);
                setPanel('result');
                
            }
        })
    }, [fightInfo])
    return (
        <div className="fight-page">
            {panel === "duke" && <FightDuke dirClick={dirClick} fightInfo={fightInfo} fightDirInfp={fightDirInfp} />}
            {panel === "attr" && <FightAttr attrInfo={attrInfo} dirClick={dirClick} />}
            {panel === "result" && <FightResult result={result} dirClick={dirClick} />}
            {panel === "set" && <FightSet art={fightInfo.art} dirClick={dirClick} />}
        </div>
    )

}

export default Fight;