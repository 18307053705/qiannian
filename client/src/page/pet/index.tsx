import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getRoleInfo } from '@cgi/roleInfo';
import { petRoom, drawPet } from '@cgi/pet';
import { List } from '@components';

const PET_STATE = {
    0: '休战',
    1: '参战',
    2: '参战',
    3: '出售',
}

const Pet = ({ history }) => {
    const [petRoomInfo, setPetRoomInfo]: any = useState({ c: {}, l: [], x: 4 });
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setPetRoomInfo(data.pet_pool)
        })
    }, [])
    const { l, x } = petRoomInfo;
    const data = [...new Array(x)];

    const prefix = (_, index) => {
        const { id, n, s } = l[index - 1] || {};
        if (!id) {
            return '[空房间]';
        }
        return (
            <span
                className='g_u_end'
                onClick={() => { history.push('/petDetail', { petId: id, petRoomInfo }) }} >
                {n}
                ({PET_STATE[s]})
            </span>
        )
    }
    const petRoomClick = () => {
        petRoom().then(({ data }) => {
            if (data) {
                setPetRoomInfo(
                    {
                        ...petRoomInfo,
                        x: x + 1
                    }
                )
            }
        })
    }
    return (
        <div>
            <div>宠物房目前有{x}个房间。</div>
            <div><span className="g_b_u" onClick={()=>{drawPet().then((res)=>{console.log(res)})}}>灵兽山砸宠</span></div>
            <List data={data} prefix={prefix} hiddenFooter={true} />
            <div><span className="g_u_end" onClick={petRoomClick}>扩充宠物房</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default Pet;

