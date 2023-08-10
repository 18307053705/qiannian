import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getRoleInfo } from '@cgi/roleInfo';
import { petRoom, petStatu } from '@cgi/pet';
import { List } from '@components';

const PET_STATE = {
    0: '休战中',
    1: '参战中',
    2: '参战中',
    3: '出售中',
}

const PET_ACTIVE_STATE = {
    0: '参战',
    1: '休战',
    2: '休战',
    3: '',
}

const Pet = ({ history }) => {
    const [petRoomInfo, setPetRoomInfo]: any = useState({ c: {}, l: [], x: 4 });
    const [updata, setUpdata]: any = useState(true);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setPetRoomInfo(data.pet_pool)
        })
    }, [updata])
    const { l, x } = petRoomInfo;
    const data = [...new Array(x)];
    const chengClick = (s, petId) => {
        if (s === 3) {
            return;
        }
        petStatu({
            state: s === 0 ? 1 : 0,
            petId
        }).then(({ data }) => {
            if (data) {
                setUpdata(!updata);
            }
        })
    }
    const prefix = (_, index) => {
        const { id, n, s } = l[index - 1] || {};
        if (!id) {
            return '[空房间]';
        }
        return (
            <div>
                <span className='g_u'>
                    <span
                        onClick={() => {
                            history.push('/petDetail', { petId: id, petRoomInfo });
                        }}
                    >{n}({PET_STATE[s]})
                    </span>
                </span>
                {s !== 3 && <span className='g_u'><span onClick={() => { chengClick(s, id) }}>{PET_ACTIVE_STATE[s]}</span></span>}
            </div>
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
            <List data={data} prefix={prefix} hiddenFooter={true} />
            <div><span className="g_u_end" onClick={petRoomClick}>扩充宠物房</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default Pet;

