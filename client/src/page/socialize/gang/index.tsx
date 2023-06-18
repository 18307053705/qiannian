import React, { useState, useEffect } from 'react';

import Detail from './detail';
import Material from './material';


type PageType = 'detail' | 'tael' | 'material';

export const Gang = ({ updata, socialize, setPageName }) => {
    const [page, setPage] = useState<PageType>('detail');
    if (!socialize) {
        return null;
    }
    useEffect(() => {
        setPage('detail');
    }, [updata])
    return (
        <div>
            {page === 'detail' && <Detail socialize={socialize} setPageName={setPageName} setPage={setPage} />}
            {page === 'material' && <Material  />}

        </div>
    )


}

export default Gang;