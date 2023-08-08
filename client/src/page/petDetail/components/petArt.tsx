import React, { useState } from "react";
import { getNameInfo, getSuffix } from '@utils/art';

export const PetArt = ({ petRoom, petInfo, callback, studyArtClick }) => {
    console.log(petInfo)
    const { art, level } = petInfo;
    const [artInx, setArtInx] = useState(-100);
    const talent = art.slice(0, 1)[0];
    const list = art.slice(1);
    const artItme = (art, in_x) => {
        const { text, digest } = getNameInfo(art);
        const { text: suffixTest, isDigest } = getSuffix(art, level);
        const nameClick = digest ? () => { setArtInx(in_x) } : () => { };
        const suffixClick = isDigest && petRoom ? () => { studyArtClick(in_x) } : () => { };
        return (
            <div>
                <div>
                    <span className={digest ? 'g_u_end' : ''} onClick={nameClick}>{text}</span>
                    <span> | </span>
                    <span className={isDigest && petRoom ? 'g_u_end' : ''} onClick={suffixClick}>{suffixTest}</span>
                </div>
                {artInx === in_x && <div>{art.msg}</div>}

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

