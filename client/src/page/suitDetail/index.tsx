import React, { useState, useEffect } from "react";
import { getSuitDetail } from '@cgi/equip';
import { backGrand, goBack } from '@utils/grand';
import { ATTR_TEXT } from '@meun';

const getAttrMap = (attr) => {
    const attrMap = {};
    Object.keys(attr).forEach((key) => {
        if (['life_max', 'mana_max'].includes(key)) {
            let str = key.replace('_min', '').replace('_max', '');
            attrMap[ATTR_TEXT[str]] = attr[key]
            return;
        }
        if (['hit', 'dodge', 'sudden'].includes(key)) {
            attrMap[ATTR_TEXT[key]] = attr[key];
            return;
        }
        let str = key.replace('_min', '').replace('_max', '');
        const min = `${str}_min`;
        const max = `${str}_max`;
        attrMap[ATTR_TEXT[str]] = `${attr[min]}~${attr[max]}`;
    })
    return attrMap;
}


export const SuitDetail = ({ history }) => {
    const { state } = history.location;
    const [suit, setSuit] = useState([]);
    useEffect(() => {
        getSuitDetail({ id: state.id }).then(({ data }) => {
            setSuit(data)
        })
    }, [])

    return (
        <div>
            {
                suit.map(({ name, attr }, index) => {
                    const textMap = getAttrMap(attr);
                    return (
                        <div key={index}>
                            <div>{name}</div>
                            <div>
                                {
                                    Object.keys(textMap).map((key) => <div key={key}>{key}:{textMap[key]}</div>)
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div><span className='g_u_end' onClick={goBack}>返回上页</span></div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default SuitDetail;

