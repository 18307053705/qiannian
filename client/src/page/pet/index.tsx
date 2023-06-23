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

const petInfo = {
    id: 19999,
    xf: 100, // 先天资质
    f: 100, // 后天资质
    l: 100, // 等级
    p: 1,// 类型
    art: {
        // 技能信息
    },
    equip: {

    },
    addition: {

    }
}


