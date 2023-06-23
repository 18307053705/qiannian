import React from "react";
import { backGrand } from '@utils/grand';
import Equip from './equip';
import Article from './article';

const ArticleDetail = ({ history }) => {
    const { state } = history.location;
    return (
        <div >
            {state.p === 3 ?
                <Equip history={history} />
                : <Article history={history} />}
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default ArticleDetail;