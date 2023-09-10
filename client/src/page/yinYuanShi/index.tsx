import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List } from '@components';
import { getMarriage, attached, finish } from '@cgi/qingyuan';

export const YinYuanShi = () => {
    const [info, setInfo]: any = useState();
    const [isAction, setIsAction] = useState(false);
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

    const finishClick = () => {
        setIsAction(false);
        finish().then(() => {
            getMarriage().then(({ data }) => {
                setInfo(data);
            })
        })
    }


    if (!info) {
        return null;
    }
    if (info.qingYuan) {
        const { info: base, role_id } = info.qingYuan;
        const { role1, name1, name2, level, exp } = base;
        const isRole1 = role1 === role_id;
        return (
            <div>

                <div>
                    <span>天定姻缘:{isRole1 ? name2 : name1}</span>
                    {' '}
                    <span className="g_u_end" onClick={() => { setIsAction(true) }}>解缘</span>
                </div>
                <div>姻缘值：{level}({exp})</div>
                {
                    isAction && (
                        <div>
                            <span className="g_error">解除此份姻缘需要消耗{level * 200}元宝，是否确定解除：</span>
                            <span className="g_error_bnt" onClick={finishClick}>是</span>
                            <span className="g_error_bnt" onClick={() => { setIsAction(false) }}>否</span>
                        </div>
                    )
                }
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