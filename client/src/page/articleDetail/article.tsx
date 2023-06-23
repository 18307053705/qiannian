import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getDetail } from '@cgi/shops';
import { getEquipName, getEquipInfo } from '@utils/equip'



const Article = ({ article,query }) => {
    if (!article) {
        return null;
    }
    console.log(query,'article...');
    
    return (
        <div >
            <div>
                <div><span className="g_b">{article.n}</span></div>
                <div><span className="g_b">数量</span>：<span>{article.s}</span></div>
                <div><span className="g_b">单价</span>：<span>{article.sell}银两</span></div>
                <div><span className="g_b">简介</span>：<span>{article.tips}</span></div>
            </div>
        </div>
    )

}

export default Article;