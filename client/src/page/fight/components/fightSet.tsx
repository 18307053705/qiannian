import React, { useState, useEffect } from "react";
import { getFightConfig, setFightConfig } from '@cgi/fight';
import { Tab } from '@components/index';

const list = [
    { value: 1, label: '技能' },
    { value: 2, label: '药品' },
]

const FightSet = ({  getFightInfo }) => {
    const [dirData, setDirData] = useState({
        art: [],
        drug: [],
        config: []
    })
    const [type, setType] = useState(0);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        getFightConfig().then(({ data }) => {
            setDirData(data);
        })
    }, [])

    const chengClick = (index) => {
        setIndex(index);
        setType(1);
    }
    const setClick = (dir_id, dir_type) => {
        setFightConfig({
            dir_type,
            dir_id,
            dir_inx: index
        }).then(({data})=>{
            setDirData({
                ...dirData,
                ...data
            })
            setType(0);
        })
    }
    return (
        <>
            {
                type === 0 ? dirData.config.map(({ n }, index) => (
                    <div key={index}>
                        <span>战斗键{index + 1}：</span>
                        <span>{n}</span>
                        <span className="g_u_end" onClick={() => { chengClick(index) }}>更换</span>
                    </div>
                )) : (<Tab currentKey={type} onCheng={setType} list={list} />)
            }
            {
                type === 1 && dirData.art.map(({ id, n }) => (
                    <div key={id}>
                        <span>{n}</span>
                        <span className="g_u_end" onClick={() => { setClick(id, 1) }}>设置</span>
                    </div>
                ))
            }
            {
                type === 2 && dirData.drug.map(({ id, n }) => (
                    <div key={id}>
                        <span>{n}</span>
                        <span className="g_u_end" onClick={() => { setClick(id, 2) }}>设置</span>
                    </div>
                ))
            }
            <span className='g_b' onClick={getFightInfo}>返回战斗</span>
        </>
    )
}

export default FightSet;