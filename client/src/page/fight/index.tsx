import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { fightDir, creatFight } from '@cgi/fight';
import { backGrand } from '@utils/grand';

import FightDuke from './components/fightDuke';
import FightResult from './components/fightResult';
import FightSet from './components/fightSet';
import FightAttr from './components/fightAttr';

import './index.less';
const Fight = ({ }) => {
    const [panel, setPanel] = useState('duke');
    // 记战斗信息
    const [fight, setFight] = useState();
    // 查看目标属性
    const [id, setId] = useState();

    const fightInfoChang = ({ data }) => {
        let panelKey = 'duke';
        if (data.state) {
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
        return <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>;
    }

    // 关闭FightAttr
    const closeFightAttr = () => {
        setId(undefined);
        setPanel('duke')
    }

    // 开启FightAttr
    const openFightAttr = (id) => {
        setId(id);
        setPanel('attr')
    }

    return (
        <div className="fight-page">
            {panel === "duke" && <FightDuke fight={fight} dirClick={dirClick} setPanel={setPanel} openFightAttr={openFightAttr} />}
            {panel === "result" && <FightResult fight={fight} fightInfoChang={fightInfoChang} />}
            {panel === "set" && <FightSet getFightInfo={getFightInfo} />}
            {panel === "attr" && <FightAttr id={id} close={closeFightAttr} />}
        </div>
    )

}

export default Fight;