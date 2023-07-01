import React, { useState, useCallback, useContext } from "react";
import { backGrand } from '@utils/grand'
import './index.less';


const Preface = () => {
    const [page, setPage] = useState(0);
    if (page === 0) {
        <div>
            <div>我忘却了一切，只为回到千年....</div>
            <div><span className='g_u_end' onClick={backGrand}>继续</span></div>
        </div>
    }
    return (
        <div>
            <div>隐仙村</div>
            <div>十八年前，你随着一场大雪从天而来,落在这里古老的村子中。</div>
            <div>大雪纷纷，还好你被村中的长者发现，不然就要</div>
            <div><span className='g_u_end' onClick={backGrand}>继续</span></div>
        </div>
    )

}

export default Preface;