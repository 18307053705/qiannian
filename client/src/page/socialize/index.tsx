import React, { useState, useEffect } from 'react';
import { getsocializeList, getsocializeDetail } from '@cgi/socialize';

import Gang from './gang';
import Intersect from './intersect';
import Ranks from './ranks';

export const Socialize = ({ history }) => {
    const [type, setType] = useState(1);
    const [list, setList] = useState([]);
    const [socialize, setSocializea] = useState('');
    useEffect(() => {
        const { state } = history.location;
        setType(state.type);
        getsocializeDetail({ type: state.type }).then(({ data }) => {
            setSocializea(data)
        })
        getsocializeList({ type: state.type }).then(({ data }) => {
            setList(data);
        })
    }, [])

    return (
        <div>
            {type == 1 && <Gang history={history} data={list} socialize={socialize} />}
            {type == 2 && <Intersect history={history} data={list} socialize={socialize} />}
            {type == 3 && <Ranks history={history} data={list} socialize={socialize} />}
        </div>
    )
}

export default Socialize;