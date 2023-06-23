import React, { useState, useEffect } from "react";
import { getDetail } from '@cgi/shops';

const Article = ({ history }) => {
    const [article, setArticle] = useState();

    useEffect(() => {
        const { state } = history.location;
        getDetail({
            id: state.id,
            in_x: state.in_x,
            kanapsackType: state.kanapsackType,
        }).then(({ data }) => {
            setArticle(data.article)
        })
    }, []);
    if (!article) {
        return null;
    }
    return (
        <div >
            <div>
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
            </div>
        </div>
    )

}

export default Article;