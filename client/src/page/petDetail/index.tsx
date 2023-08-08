import React, { useState, useEffect } from "react";
import { detailPet } from '@cgi/pet';
import { Tab } from '@components';
import { backGrand } from '@utils/grand';
import PetAttr from './components/petAttr';
import PetEquip from './components/petEquip';
import PetArt from './components/petArt';
import { PetState, PetFlair } from './components';

const tabList = [
    { value: 0, label: "属性" },
    { value: 1, label: "装备" },
    { value: 2, label: "技能" }
];


const PET_STATE = {
    0: '休战',
    1: '参战',
    2: '附体',
    3: '出售',
}

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
    }, [])

    if (!petInfo) {
        return null;
    }

    const { attr, art, equip } = petInfo;



    // resuslt
    // const resuslt = ({ data }) => {
    //     if (data) {
    //         setUpdata(!updata);
    //     }
    // }
    // // 学习技能
    // const studyArtClick = (in_x) => {
    //     studyArt({ id, in_x }).then(resuslt)
    // }
    // // 状态切换
    // const chengClick = (state) => {
    //     cheng({ id: pet.id, state }).then(resuslt)
    // }
    // // 参战或附体，无法进行任何操作
    // const isFight = pet.state === 1 || pet.state === 2;
    // // 是否可附体
    // const appendage = pet.state === 1 && art[1].l !== -1;
    // // 是否转世
    // const reincarnation = pet.flair_x === pet.flair && pet.reborn < 3;
    const { c, l } = petRoomInfo || {};
    const petRoom = l.find(({ id }) => id === petId);
    return (
        <div>
            <div>{petInfo.name}</div>
            <PetState petId={petId} petRoom={petRoom} />
            <PetFlair petRoom={petRoom} petInfo={petInfo} />
            <div><span>等级：{`${petInfo.level}级(${petInfo.exp})`}</span></div>
            <Tab list={tabList} onCheng={setPageKey} />
            {pageKey === 0 && <PetAttr attr={attr} />}
            {pageKey === 1 && (
                <PetEquip
                    petRoom={petRoom}
                    petInfo={petInfo}
                    id={id}
                    equip={equip}
                    isFight={true}
                    level={petInfo.level}
                    history={history}
                    setUpdata={setUpdata}
                />
            )}
            {pageKey === 2 && (
                <PetArt
                    art={art}
                    // isFight={isFight}
                    level={petInfo.level}
                // studyArtClick={studyArtClick}
                />
            )}
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default PetDetail;

