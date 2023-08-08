import React, { useState } from "react";
import { Input } from '@components';
import { renameEquip } from '@cgi/equip';
import { petRenameEquip } from '@cgi/pet';
// 强化组件
export const NameEquip = ({ query, setEquip, equip }) => {
    const [isRename, setIsRename] = useState(false);
    const { form } = query;
    const renameBtn = (name) => {
        const requst = form === 2 ? renameEquip({ name, pos: query.pos }) : petRenameEquip({ name, pos: query.pos, petId: query.petId });
        requst.then(({ data }) => {
            setEquip({
                ...equip,
                name: data
            })
            setIsRename(false);
        })
    }
    if (form === 2 || form === 6) {
        return (
            <div>
                {isRename ?
                    <Input
                        defaultValue={equip.text}
                        submit={renameBtn}
                        onText='改名'
                        close={() => { setIsRename(false); }} />
                    : (
                        <div>{equip.text} <span className="g_u_end" onClick={() => { setIsRename(true) }}>[改]</span></div>
                    )
                }
            </div>
        )
    }

    return (
        <div>{equip.text}</div>
    )

}





