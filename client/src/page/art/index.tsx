import React, { useState, useEffect } from 'react';
import { getArtList, artUp } from '@cgi/art';
import { getNameInfo, getSuffix } from '@utils/art';
import { backGrand } from '@utils/grand';
import { ArtDetail } from './detail';

export const Art = () => {
    const [data, setData] = useState();
    const [updata, setUpdata] = useState(true);
    const [artInx, setArtInx] = useState(0);
    useEffect(() => {
        getArtList().then(({ data }) => {
            setData(data);
        })
    }, [updata])

    if (!data) {
        return null;
    }
    const { art, role_level } = data;

    const upClick = (id, index) => {
        artUp({ id }).then(({ message }) => {
            if (!message) {
                setUpdata(!updata)
                setArtInx(index);
            }
        })
    }

    const artItme = (art, index) => {
        const artName = getNameInfo(art);
        const { text, suffixClass } = getSuffix(art, role_level);

        const suffixClick = suffixClass ? () => {
            upClick(art.id, index);
        } : undefined

        const ArtNameClick = art.l !== -1 ? () => {
            setArtInx(index);
        } : undefined;
        const nameClass = art.l !== -1 ? 'g_color' : '';
        return (
            <div>
                <span className={nameClass} onClick={ArtNameClick}>{artName}</span>
                {text && <span> | </span>}
                {text && <span className={suffixClass} onClick={suffixClick}>{text}</span>}
            </div>
        )
    }

    const artList: any[] = Object.values(art);
    return (
        <div>
            <ArtDetail art={artList[artInx]} />
            <div>===技能===</div>
            {
                artList.map((art, index) => {
                    return (
                        <div key={index}>
                            {index === 2 && <div>===持续===</div>}
                            {index === 3 && <div>===天赋===</div>}
                            {artItme(art, index)}
                        </div>
                    )
                })
            }
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Art;