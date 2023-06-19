import React, { useState, useCallback } from 'react';

export const Art = ({ history }) => {
    const [page, setPage] = useState('info');
    const [posInfo, setPosInfo] = useState({
        pos: 0,
        key: ''
    });
    const pageCheng = useCallback((name, pos, key) => {
        setPage(name);
        if (pos) {
            setPosInfo({ pos, key })
        }
    }, [])
    return (
        <div>
            <div>===技能===</div>
            <div className='g_color'>青元剑诀 零转0级</div>
            <div className='g_color'>太极剑诀 零转0级</div>
            <div>===天赋===</div>
            <div className='g_color'>道君心经 零转0级</div>
            <div className='g_color'>太阴心诀 零转0级</div>
            <div className='g_color'>太阳心诀 零转0级</div>
            <div className='g_color'>太上道经 零转0级</div>
            <div>===技能===</div>
            <div className='g_color'>道君真意 零转0级</div>
            <div className='g_color'>无上道法 零转0级</div>
            <div>===防御===</div>
            <div className='g_color'>荒古圣体 零转0级</div>
        </div>
    )
}

export default Art;