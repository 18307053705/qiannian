import React, { useState } from "react";
import { getNameInfo, getSuffix } from '@utils/art';
import { petStudyArt } from '@cgi/pet';
export const PetArt = ({ petInfo, callback }) => {
    const { art, level, state } = petInfo;
    const isFight = state === 1 || state === 2;
    const [artInx, setArtInx] = useState(-100);
    const talent = art.slice(0, 1)[0];
    const list = art.slice(1);
    // 学习技能
    const studyArtClick = (id, index) => {
        petStudyArt({ id }).then(({ message }) => {
            if (!message) {
                callback();
                setArtInx(index);
            }
        })
    }
    const artItme = (art, index) => {
        const artName = getNameInfo(art);
        const { text, suffixClass } = getSuffix(art, level);
        const suffixClick = (isFight && suffixClass) ? () => {
            studyArtClick(art.id, index);
        } : undefined

        const ArtNameClick = art.l ? () => {
            setArtInx(index);
        } : undefined;
        const nameClass = art.l ? 'g_color' : '';
        return (
            <div>
                <div>
                    <span className={nameClass} onClick={ArtNameClick}>{artName}</span>
                    {text && <span> | </span>}
                    <span className={isFight ? suffixClass : ''} onClick={suffixClick}>{text}</span>
                </div>
                {artInx === index && <div>{art.msg}</div>}
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

