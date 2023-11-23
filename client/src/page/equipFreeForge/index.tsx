import React from 'react';
import { backGrand } from '@utils/grand';
import { Equiplist } from './forgeEquiplist';
import { ForgeEquip } from './forgeEquip';
import { EquipHome } from './equipHome';

export const equipFreeForge = ({ history }) => {
    const { state, pathname } = history.location;
    const { pageKey='home' } = state;
    const historyClick = ({ uid, pageKey }) => {
        if (uid === -1) {
            pageKey = 'home';
        }
        history.push(pathname, { uid, pageKey: pageKey || state.pageKey });
    }
    return (
        <div>
            {pageKey === 'home' && <EquipHome historyClick={historyClick} />}
            {pageKey === 'list' && <Equiplist historyClick={historyClick} />}
            {pageKey === 'forge' && <ForgeEquip history={history} historyClick={historyClick} />}
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default equipFreeForge;