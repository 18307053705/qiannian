import React, { useState, useEffect, useCallback } from "react";
import { detailPet } from '@cgi/pet';
import { Tab } from '@components';
import { backGrand } from '@utils/grand';
import { PetState, PetFlair, PetEquip, PetAttr, PetArt } from './components';

const tabList = [
    { value: 0, label: "属性" },
    { value: 1, label: "装备" },
    { value: 2, label: "技能" }
];


const PetDetail = ({ id, history }) => {
    // const { state } = history.location;
    const { petId, petRoomInfo } = history.location.state;
    const [petInfo, setPetInfo] = useState();
    const [updata, setUpdata] = useState(false);
    const [pageKey, setPageKey] = useState(0);
    useEffect(() => {
        detailPet({ petId }).then(({ data }) => {
            setPetInfo(data);
        })
    }, [updata])

    const callback = useCallback(() => {
        detailPet({ petId }).then(({ data }) => {
            setPetInfo(data);
        })
    }, [petId])

    if (!petInfo) {
        return null;
    }

    const { attr, art, equip } = petInfo;
    const { c, l } = petRoomInfo || {};
    const petRoom = l.find(({ id }) => id === petId);
    return (
        <div>
            <div>{petInfo.name}</div>
            <PetState petId={petId} callback={callback} petInfo={petInfo} />
            <PetFlair petRoom={petRoom} petInfo={petInfo} callback={callback} />
            <div><span>等级：{`${petInfo.level}级(${petInfo.exp})`}</span></div>
            <Tab list={tabList} onCheng={setPageKey} />
            {pageKey === 0 && <PetAttr attr={attr} />}
            {pageKey === 1 && (
                <PetEquip
             
                    petInfo={petInfo}
                    history={history}
                />
            )}
            {pageKey === 2 && (
                <PetArt
       
                    petInfo={petInfo}
                    callback={callback}
                    // art={art}
                    // isFight={isFight}
                    // level={petInfo.level}
                // studyArtClick={studyArtClick}
                />
            )}
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default PetDetail;

