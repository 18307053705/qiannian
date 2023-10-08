import React from 'react';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
type TpBtnType = {
    name: string;
    dir: string;
}
export const TpBtn = ({ name, dir }: TpBtnType) => {
    const tpClick = () => {
        if(dir){
            tpDir({ dir }).then(backGrand)
        }
       
    }
    return (
        <span className='g_u_end' onClick={tpClick}>{name}</span>
    )
}
export default TpBtn;