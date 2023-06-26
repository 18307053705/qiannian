import React, { useState, useCallback } from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { EquipList } from '@components';
import { equipActive } from '@cgi/pet';

const detail = ({ equip, level, isFight, history, setUpdata, id }) => {
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
    // 
    const equipClick = (equip, in_x) => {
        history.push('/articleDetail', { id: equip['id'], in_x, kanapsackType: 6, p: 3 });
    }

    const operateClick = (itme) => {
        equipActive({
            type: 1,
            in_x: itme.in_x,
            posKey: posInfo.pos
        }).then(({ data }) => {
            if (data) {
                setPage('info');
                setUpdata((prve) => !prve);
            }
        })
    }


    return (
        <div>
            {
                page === 'info' && EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                    if (level < condition) {
                        return null;
                    }
                    return (
                        <div key={index}>
                            <span>{label}：</span>
                            {equip[value] ? <span
                                onClick={() => { equipClick(equip[value], index + 1); }}
                                className="g_u_end"
                            >
                                {getEquipName(equip[value].ext, equip[value].name)}
                            </span> : '无'}
                            {isFight && (
                                <span><span> | </span>
                                    <span
                                        className="g_u_end"
                                        onClick={() => { pageCheng('list', index + 1, value) }}
                                    >换</span></span>
                            )}
                        </div>
                    )
                })
            }
            {
                page === 'list' && <EquipList operate={operateClick} pos={posInfo.pos} history={history} />
            }
            {
                page === 'list' && <div><span className="g_u_end" onClick={() => { setPage('info') }}>返回装备</span></div>
            }
        </div>
    )

}

export default detail;

