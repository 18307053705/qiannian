import React, { useState, useEffect } from 'react';

import { getTaskScene, taskSceneEnd } from '@cgi/taks';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';




export const TieJiangPu = () => {
    const [taskInfo, setTaskInof] = useState();

    return (
        <div>
            <div>铁匠铺</div>
            <div>简介：</div>
            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default TieJiangPu;