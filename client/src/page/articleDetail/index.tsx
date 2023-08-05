import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getArticleDetail } from '@cgi/knapsack';

const ArticleDetail = ({ history }) => {
    const [article, setArticle] = useState();
    useEffect(() => {
        const { state } = history.location;
        getArticleDetail(state).then(({ data }) => {
            setArticle(data)
        })
    }, []);
    if (!article) {
        return null;
    }
    return (
        <div >
            <div><span>{article.n}</span></div>
            <div><span>数量</span>：<span>{article.s}</span></div>
            {
                article.price && (
                    <div>
                        <span>单价</span>：
                            <span>{article.price}{article.unit === 'yuanbo' ? '元宝' : '银两'}</span>
                    </div>
                )
            }

            <div><span>简介</span>：<span>{article.tips}</span></div>
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default ArticleDetail;