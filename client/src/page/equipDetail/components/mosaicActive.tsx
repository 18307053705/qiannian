import React, { useState, useEffect } from "react";
import { mosaicEquip, getGemList } from '@cgi/equip';
import { List } from '@components';


// 宝石组件
export const MosaicActive = ({ query, getEquipDetail, setIsMosaic }) => {
    const [gemList, setGemList] = useState([]);
    // const { firm } = equip;
    useEffect(() => {
        getGemList().then((({ data }) => {
            setGemList(data);
        }))
    }, []);

    const mosaicEquipClick = (material_inx) => {
        mosaicEquip({
            material_inx,
            in_x: query.in_x
        }).then(({ data }) => {
            if (data !== undefined) {
                getEquipDetail(data);
                setIsMosaic(false);
            }
        })
    }

    const prefix = ({ in_x, s, name }, index) => {
        return (
            <div key={in_x}>
                {index}.
                <span>{name}x{s}</span>
                {' | '}
                <span className="g_u_end" onClick={() => { mosaicEquipClick(in_x) }}>镶嵌</span>
            </div>
        )
    }

    return (
        <div>
            <div>镶嵌宝石可获得大量的属性加成，各位道友快来试试吧！！！</div>
            <List data={gemList} prefix={prefix} />
            <div>
                <span className="g_u_end" onClick={() => { setIsMosaic(false) }}>返回上页</span>
            </div>
        </div>
    )

}





