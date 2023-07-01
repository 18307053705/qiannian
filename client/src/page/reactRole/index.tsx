import React, { useState } from "react";
import { backGrand } from '@utils/grand';
import './index.less';
import Create from './create';

const ReactRole = () => {
    const [iscreate, setIscreate] = useState(true);

    const submitCallback = ({data}) => {
        if(data){
            setIscreate(false);
        }
    }
    return (
        <div className="ceact-role-page">
            {
                iscreate ? <Create submitCallback={submitCallback} /> : (
                    <div>
                        <div>我忘却了一切，只为回到千年....</div>
                        <div><span className='g_u_end' onClick={backGrand}>进入游戏</span></div>
                    </div>
                )
            }

        </div>
    )

}

export default ReactRole;