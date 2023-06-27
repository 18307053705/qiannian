import React, { useState, useEffect } from "react";
import { cheng, getDetail, studyArt, addFlair, reborn } from '@cgi/pet';
import { Tab } from '@components';

import PetAttr from './petAttr';
import PetEquip from './petEquip';
import PetArt from './petArt';

const tabList = [
    { value: 0, label: "属性" },
    { value: 1, label: "装备" },
    { value: 2, label: "技能" }
];


const detail = ({ id, history }) => {
    const [pet, setPet] = useState();
    const [updata, setUpdata] = useState(false);
    const [pageKey, setPageKey] = useState(0);
    useEffect(() => {
        getDetail({ id }).then(({ data }) => {
            setPet(data);
        })
    }, [updata])

    if (!pet) {
        return null;
    }

    const { attr, art, equip } = pet;
    // resuslt
    const resuslt = ({ data }) => {
        if (data) {
            setUpdata(!updata);
        }
    }
    // 学习技能
    const studyArtClick = (in_x) => {
        studyArt({ id, in_x }).then(resuslt)
    }
    // 状态切换
    const chengClick = (state) => {
        cheng({ id: pet.id, state }).then(resuslt)
    }
    // 参战或附体，无法进行任何操作
    const isFight = pet.state === 1 || pet.state === 2;
    // 是否可附体
    const appendage = pet.state === 1 && art[1].l !== -1;
    // 是否转世
    const reincarnation = pet.flair_x === pet.flair && pet.reborn < 3;
    return (
        <div>
            <div>{pet.name}</div>
            <div>
                <span>状态：{pet.state === 3 ? '出售中' : (isFight ? '出战中' : "休战中")}</span>
                {
                    pet.state !== 3 && <span
                        className='g_u_end'
                        onClick={() => { chengClick(isFight ? 0 : 1) }}
                    >
                        {isFight ? '休战' : "出战"}
                    </span>

                }
                {
                    appendage && (
                        <span>
                            <span> | </span>
                            <span className='g_u_end' onClick={() => { chengClick(2) }}>附体</span>
                        </span>
                    )
                }
            </div>
            <div>
                <span>资质：{`${pet.flair}/${pet.flair_x}`}</span>
                {isFight && !reincarnation && (
                    <span
                        className='g_u_end'
                        onClick={() => { addFlair().then(resuslt) }}
                    >
                        +
                    </span>
                )}
                {isFight && reincarnation && (
                    <span
                        className='g_u_end'
                        onClick={() => { reborn().then(resuslt) }}
                    >
                        转生
                    </span>
                )}
            </div>
            <div><span>等级：{`${pet.level}级(${pet.exp})`}</span></div>
            <Tab list={tabList} onCheng={setPageKey} />
            {pageKey === 0 && <PetAttr attr={attr} />}
            {pageKey === 1 && (
                <PetEquip
                    id={id}
                    equip={equip}
                    isFight={isFight}
                    level={pet.level}
                    history={history}
                    setUpdata={setUpdata}
                />
            )}
            {pageKey === 2 && (
                <PetArt
                    art={art}
                    isFight={isFight}
                    level={pet.level}
                    studyArtClick={studyArtClick}
                />
            )}

        </div>
    )

}

export default detail;

