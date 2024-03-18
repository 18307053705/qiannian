import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils';
import { getHandbookOther, manufactureOther } from '@cgi/synthesis';
import { List, Input } from '@components';



export default () => {
    const [list, setList] = useState([]);
    const [uidInfo, setUidInfo] = useState<{ id: number, name: string }>();
    const [uid, setUid] = useState();
    useEffect(() => {
        getHandbookOther().then(({ data, code }) => {
            if (code === 0) {
                setList(data)
            }
        })
    }, [])


    const submit = (num) => {
        manufactureOther({ uid: uidInfo?.id || 0, s: num }).then(() => {
            close();
        })
    }
    const close = () => {
        setUidInfo(undefined)
    }

    const prefix = ({ name, id, tips, manufacture }) => {
        return (
            <div>
                <div>
                    <span className='g_u'><span onClick={() => { setUid(id) }}>{name}</span></span>
                    <span className='g_u'><span onClick={() => { setUidInfo({ id, name }) }}>合成</span></span>
                </div>
                {
                    id === uid && (
                        <div>
                            <div>简介：{tips}</div>
                            <div>合成材料：{`${manufacture.name}x${manufacture.s}`}</div>
                        </div>
                    )

                }
            </div>

        )
    }

    return (
        <div>
            {uidInfo && <Input label={`合成${uidInfo.name}`} layout={false} submit={submit} type='number' close={close} />}
            <List data={list} prefix={prefix} />
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}
