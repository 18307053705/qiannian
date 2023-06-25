import React, { useState, useEffect } from 'react';
import { getArtList, artUp } from '@cgi/art';
import { getNameInfo, getSuffix } from '@utils/art';

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

    const artItme = (art) => {
        const { text, digest } = getNameInfo(art);
        const { text: suffixTest, isDigest } = getSuffix(art, role_level);
        const nameClick = digest ? () => { chengId(art.id) } : () => { };
        const suffixClick = isDigest ? () => { upClick(art.id) } : () => { };
        return (
            <div>
                <span className={digest ? 'g_color' : ''} onClick={nameClick}>{text}</span>
                <span> | </span>
                <span className={isDigest ? 'g_color' : ''} onClick={suffixClick}>{suffixTest}</span>
            </div>
        )
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}。</div>}
            <div>===技能===</div>
            {
                Object.keys(art).map((key, index) => {
                    return (
                        <div key={index}>
                            {index === 2 && <div>===持续===</div>}
                            {index === 3 && <div>===天赋===</div>}
                            {artItme(art[key])}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArtList;