import React, { useState, useCallback } from 'react';
import EquipInfo from './equipInfo';
import { EquipList } from '@components';
import { operate } from '@cgi/knapsack';
import { backGrand } from '@utils/grand';
export const Equip = ({ history }) => {
    const [page, setPage] = useState('info');
    const [posInfo, setPosInfo] = useState({
        pos: 0,
        key: ''
    });
    const pageCheng = useCallback((name, pos = '', key = '') => {
        setPage(name);
        if (pos) {
            setPosInfo({ pos, key })
        }
    }, []);
    const operateClick = (equip) => {
        operate({
            id: equip.id,
            in_x: equip.in_x,
            s: 1,
            p: 3,
            type: 1,
            posKey: posInfo.key
        }).then(() => {
            pageCheng('info')
        })
    }
    return (
        <div>
            {
                page === 'info' && <EquipInfo pageCheng={pageCheng} history={history} />
            }
            {
                page === 'list' && <EquipList operate={operateClick} pos={posInfo.pos} history={history} />
            }
            {
                page === 'list' && <div><span className="g_u_end" onClick={() => { pageCheng('info') }}>返回装备</span></div>
            }
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Equip;