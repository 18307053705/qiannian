import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getRoleInfo } from '@cgi/roleInfo';
import { cheng, getDetail, studyArt } from '@cgi/pet';
import { List, Tab } from '@components';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';

import PetAttr from './petAttr';
import PetEquip from './petEquip';
import PetArt from './petArt';
// {c:当前宠物信息(id,n,攻击，暴击，命中,s:状态，技能,id,l,r,),l:宠物房列表id,n,s  x:宠物房最大空间}

const PET_STATE = {
    0: '休战中',
    1: '参战中',
    2: '参战中',
    3: '出售中',
}

const tabList = [
    { value: 0, label: "属性" },
    { value: 1, label: "装备" },
    { value: 2, label: "技能" }
];


const detail = ({ id, history, c_id }) => {
    const [pet, setPet] = useState();
    const [pageKey, setPageKey] = useState(0);
    useEffect(() => {
        getDetail({ id }).then(({ data }) => {
            console.log()
            setPet(data);
        })
    }, [])

    if (!pet) {
        return null;
    }
    const { attr, art, equip } = pet;
    console.log(attr)
    // const attr = JSON.parse(pet.attr);
    // const art = JSON.parse(pet.art);
    // const equip = JSON.parse(pet.equip);

    const studyArtClick = (in_x) => {
        studyArt({ id, in_x }).then((res) => {
            console.log(res);
        })
    }
    return (
        <div>
            <div>{pet.name}</div>

            <div>
                <span>状态：{pet.state === 3 ? '出售中' : (c_id !== id ? '休息中' : "出战中")}</span>
                {
                    pet.state !== 3 && <span
                        className='g_u_end'
                        onClick={() => { cheng({ id: pet.id, state: c_id === id ? 0 : 1 }) }}>
                        {c_id === id ? '休息' : "出战"}
                    </span>
                }
            </div>
            <div>
                <span>资质：{`${pet.flair}/${pet.flair_x}`}</span>
                {(pet.state === 1 || pet.state === 2) && <span className='g_u_end'>+</span>}
            </div>
            <div><span>等级：{`${pet.level}级(${pet.exp})`}</span></div>
            <Tab list={tabList} onCheng={setPageKey} />
            {pageKey === 0 && <PetAttr attr={attr} />}
            {pageKey === 1 && <PetEquip equip={equip} state={pet.state} level={pet.level} history={history} />}
            {pageKey === 2 && <PetArt art={art} state={pet.state} level={pet.level} history={history} studyArtClick={studyArtClick} />}

        </div>
    )

}

export default detail;

