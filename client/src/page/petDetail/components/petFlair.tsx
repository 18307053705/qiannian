import React from "react";
import { petFlair, petReborn } from '@cgi/pet';
const getTating = (flair_x) => {
    let tating = 1;
    switch (parseInt(flair_x / 10)) {
        case 3:
        case 4:
            tating = 2;
            break;
        case 5:
        case 6:
            tating = 3;
            break;
        case 7:
            tating = 4;
            break;
        case 8:
            tating = 5;
            break;
        case 9:
            tating = 6;
            break;
        case 10:
        case 11:
        case 12:
            tating = 7;
            break;
        default:
            tating = 1;
    }
    return Array(tating).fill('★').join('')
}

export const PetFlair = ({ petInfo, callback }) => {
    const petRebornClick = () => {
        petReborn().then(({ data }) => {
            if (data) {
                callback()
            }
        })
    }
    const petFlairClick = () => {
        petFlair().then(({ data }) => {
            if (data) {
                callback()
            }
        })
    }
    const { flair_x, flair, reborn,state } = petInfo;
    // 是否出战
    const isFight = state === 1 || state === 2;
    if (!isFight) {
        return <div>资质：{`${flair}/${flair_x}`}</div>
    }

    // 是否可提升资质
    const isFlair = flair_x > flair && isFight;
    // 是否可转生
    const isReborn = reborn < 3 && flair_x === flair && isFight;
    // 1:0-29 2:30-49 3:50-69 4:70-79 5:80-89 7:90-99 10:100
    return (
        <div>
            <span>资质：{getTating(flair_x)}({`${flair}/${flair_x}`})</span>
            {isFlair && <span className="g_u"><span onClick={petFlairClick}>+</span></span>}
            {isReborn && <span className="g_u"><span onClick={petRebornClick}>转生</span></span>}
        </div>
    )
}

