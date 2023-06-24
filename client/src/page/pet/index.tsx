import React from "react";
import { backGrand } from '@utils/grand';


const Pet = ({ history }) => {
    const { state } = history.location;
    return (
        <div>
            <div>宠物列表</div>
            <div>获取宠物....</div>
            <div><span className="g_u_end" onClick={() => { history.goBack() }}>返回上页</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default Pet;

