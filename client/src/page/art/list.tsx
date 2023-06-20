import React, { useState, useEffect } from 'react';
import { getArtList, artUp } from '@cgi/art';

const RP_MEUN = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
}

const getName = (art) => `${art.n}(${RP_MEUN[art.r]}转${art.l === -1 ? 0 : art.l}重)`;

export const ArtList = ({ chengId }) => {
    const [data, setData] = useState();
    const [error, setError] = useState('');
    useEffect(() => {
        getArtList().then(({ data }) => {
            setData(data);
        })
    }, [])


    if (!data) {
        return null;
    }
    const { art, role_level } = data;

    const upClick = (id) => {
        artUp({ id }).then(({ data: artList, message }) => {

            if (message) {
                setError(message)
            } else {
                error && setError('');
                setData({
                    ...data,
                    art: artList
                })
            }
        })
    }


    const getSuffix = (art, artLevel) => {
        if (art.l === -1 && artLevel > role_level) {
            return <span style={{ color: "#000" }}>{artLevel}级可领悟</span>
        }
        let text = art.l === 13 ? '升华' : '升重';
        if (art.r >= 3) {
            text = art.l === 30 ? '升华' : '升重';
        }
        if (art.r >= 5) {
            text = art.l === 50 ? '升华' : '升重';
        }
        if (art.r === 7) {
            text = art.l === 100 ? '' : '升重';
        }
        if (art.l === -1 && artLevel <= role_level) {
            text = '领悟';
        }
        return text ? <span onClick={() => { upClick(art.id) }}>{text}</span> : null;

    }

    const art1 = art[1] || art[2] || art[3];
    const art2 = art[5] || art[6] || art[7];
    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}。</div>}
            <div>===技能===</div>
            <div className='g_color'>
                <span onClick={() => { chengId(art1['id']) }}>{getName(art1)}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art1, 1)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(4) }}>{getName(art[4])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[4], 10)}</span>
            </div>
            <div>===持续===</div>
            <div className='g_color'>
                <span onClick={() => { chengId(art2['id']) }}>{getName(art2)}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art2, 30)}</span>
            </div>
            <div>===天赋===</div>
            <div className='g_color'>
                <span onClick={() => { chengId(8) }}>{getName(art[8])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[8], 32)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(9) }}>{getName(art[9])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[9], 34)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(10) }}>{getName(art[10])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[10], 36)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(11) }}>{getName(art[11])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[11], 38)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(12) }}>{getName(art[12])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[12], 40)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(13) }}>{getName(art[13])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[13], 40)}</span>
            </div>
            <div className='g_color'>
                <span onClick={() => { chengId(14) }}>{getName(art[14])}</span>
                <span style={{ color: "#000" }}> | </span>
                <span>{getSuffix(art[14], 40)}</span>
            </div>

        </div>
    )
}

export default ArtList;