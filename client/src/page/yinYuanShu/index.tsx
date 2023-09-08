import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List } from '@components';
import { getMarriage, attached } from '@cgi/qingyuan';

export const YinYuanShu = () => {
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
    console.log(info,'YinYuanShu...')
    if (!info) {
        return null;
    }
    const { info: base, role_id, tree } = info.qingYuan;
    return (
        <div>
            <div>天定姻缘:{base.role1 === role_id ? base.name2 : base.name1}</div>
            <div>你们可以共同培育姻缘树了，不仅仅可以打造强力情缘的装备，更可获得大量的属性加成哟！！！</div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default YinYuanShu;