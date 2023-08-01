import React, { useState, useCallback } from "react";
import { getFightDri, setFightDir } from '@cgi/fight';
import { Tab } from '@components/index';

const list = [
    { value: 1, label: '技能' },
    { value: 2, label: '药品' },
]

const FightSet = ({ dirClick, fightMap }) => {
  
    const [dirList, setDirList] = useState({ art: [], drug: [] });
    const [type, setType] = useState(0);
    const [index, setIndex] = useState(0);
    
    const { art } = fightMap.player;
    const [artlist, setArtlist] = useState(art);
    const chengClick = useCallback((i) => {
        setIndex(i);
        setType(1);
        getFightDri().then(({ data }) => {
            setDirList(data);
        })
    }, [])
    const setClick = useCallback((id, type, index) => {
        setFightDir({ dir: id, type, index }).then(({ data }) => {
            setArtlist(data);
            setType(0);
        })
    }, [])
    return (
        <>
            {
                type === 0 ? artlist.map(({ name }, index) => (
                    <div key={index}>
                        <span>战斗键{index + 1}：</span>
                        <span>{name}</span>
                        <span className="g_u_end" onClick={() => { chengClick(index) }}>更换</span>
                    </div>
                )) : (<Tab currentKey={type} onCheng={setType} list={list} />)
            }
            {
                type === 1 && dirList.art.map(({ id, name }) => (
                    <div key={id}>
                        <span>{name}</span>
                        <span className="g_u_end" onClick={() => { setClick(id, 1, index) }}>设置</span>
                    </div>
                ))
            }
            {
                type === 2 && dirList.drug.map(({ id, name }) => (
                    <div key={id}>
                        <span>{name}</span>
                        <span className="g_u_end" onClick={() => { setClick(id, 2, index) }}>设置</span>
                    </div>
                ))
            }
            <span className='g_b' onClick={() => { dirClick() }}>返回战斗</span>
        </>
    )
}

export default FightSet;