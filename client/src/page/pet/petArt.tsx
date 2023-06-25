import React, { useState } from "react";
import { getNameInfo, getSuffix } from '@utils/art';
const petArt = ({ art, state, history, level, studyArtClick }) => {
    const [artInx, setArtInx] = useState(-100);

    const talent = art.slice(0, 1)[0];
    const list = art.slice(1);
    console.log(list, 'art...')
    console.log(talent, 'talent...')

    const artItme = (art, in_x) => {
        const { text, digest } = getNameInfo(art);
        const { text: suffixTest, isDigest } = getSuffix(art, level);
        const nameClick = digest ? () => { } : () => { };
        const suffixClick = isDigest ? () => { studyArtClick(in_x) } : () => { };
        return (
            <div>
                <span onClick={nameClick}>{text}</span>
                <span> | </span>
                <span className={isDigest ? 'g_u_end' : ''} onClick={suffixClick}>{suffixTest}</span>
            </div>
        )
    }
    return (
        <div>
            <div>==天赋==</div>
            <div><span>{talent.n}：{talent.msg}</span></div>
            <div>==技能==</div>
            {
                list.map((itme, index) => {
                    return (
                        <div key={index}>
                            {artItme(itme, index)}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default petArt;

