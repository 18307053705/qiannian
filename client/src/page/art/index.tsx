import React, { useState } from 'react';
import { backGrand } from '@utils/grand';
import ArtList from './list';
import ArtDetail from './detail';


export const Art = () => {
    const [page, setPage] = useState('list');
    const [id, setId] = useState(0);

    const chengId = (id) => {
        setId(id);
        setPage(id ? 'detail' : 'list');
    }


    return (
        <div>
            {page === 'list' && <ArtList chengId={chengId} />}
            {page === 'detail' && <ArtDetail chengId={chengId}  id={id}/>}
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Art;