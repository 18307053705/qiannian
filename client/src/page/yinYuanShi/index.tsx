import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List } from '@components';
import { getMarriage, attached } from '@cgi/qingyuan';

export const YinYuanShi = () => {
    const [info, setInfo]: any = useState();
    useEffect(() => {
        getMarriage().then(({ data }) => {
            setInfo(data);
        })
    }, [])

    const attachedClick = (role_id, type) => {
        attached({
            role_id,
            type
        }).then(({ data, message }) => {
            if (!message) {
                setInfo(data);
            }

        })
    }
    console.log(info)
    if (!info) {
        return null;
    }
    if (info.qingYuan) {
        const { info: base, role_id } = info.qingYuan;
        return (
            <div>
                <div>天定姻缘:{base.role1 === role_id ? base.name2 : base.name1}</div>
                <div>你们可以共同培育姻缘树了，不仅仅可以打造强力情缘的装备，更可获得大量的属性加成哟！！！</div>
                <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }


    if (info.role) {
        const { n, r_id, i } = info.role;
        return (
            <div>
                {
                    i ? (
                        <div>
                            <div>你的结缘以发出,请耐心等待{n}的确定。</div>
                            <div><span className="g_u_end" onClick={() => { attachedClick(r_id, 2) }}>撤回结缘</span></div>
                        </div>

                    ) : (
                            <div>
                                <div>{n}向你发出了结缘。</div>
                                <div>
                                    <span className="g_u"><span onClick={() => { attachedClick(r_id, 1) }}>同意</span></span>
                                    <span className="g_u"><span onClick={() => { attachedClick(r_id, 2) }}>拒绝</span></span>
                                </div>
                            </div>
                        )
                }
                <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
            </div>
        )
    }

    const prefix = ({ role_name }) => (<span className='g_u_end'>{role_name}</span>)
    const active = ({ role_id }) => (<span className='g_u_end' onClick={() => { attachedClick(role_id, 0) }}>结缘</span>)
    return (
        <div>
            <div>缔结姻缘：无</div>
            <List
                data={info.player}
                prefix={prefix}
                active={active}
            />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default YinYuanShi;