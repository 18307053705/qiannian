import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getDetail } from '@cgi/shops';
import Equip from './equip';
import Article from './article';




const ArticleDetail = ({ history }) => {
    const [info, setInfo]: any = useState({});
    const [query, setQuery]: any = useState({});
    const { equip, article } = info;
    useEffect(() => {
        const { state } = history.location;
        setQuery(state);
        getDetail(state).then(({ data }) => {
            setInfo(data)
        })
    }, []);

    const cheng = (data) => {
        setInfo(data)
    }

    return (
        <div >
            <Equip equip={equip} query={query} cheng={cheng}/>
            <Article article={article} query={query} cheng={cheng}/>
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default ArticleDetail;