import React, { useState, useCallback } from 'react';
import EquipInfo from './equipInfo';
import EquipList from './equipList';
export const Equip = ({history}) => {
    const [page, setPage] = useState('info');
    const [posInfo, setPosInfo] = useState({
        pos: 0,
        key: ''
    });
    const pageCheng = useCallback((name, pos, key) => {
        setPage(name);
        if (pos) {
            setPosInfo({ pos, key })
        }
    }, [])
    return (
        <div>
            {
                page === 'info' && <EquipInfo pageCheng={pageCheng} history={history} />
            }
            {
                page === 'list' && <EquipList pageCheng={pageCheng} posInfo={posInfo} history={history}/>
            }
        </div>
    )
}

export default Equip;