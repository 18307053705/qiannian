import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List } from '@components';
import { getMarriage, treeManage } from '@cgi/qingyuan';
import { jumpMakeEquip } from '@utils/jumpPage';
import { type } from 'os';


const getTreeNmae = (level) => {
    switch (Math.floor(level / 10)) {
        case 0:
            return '姻缘树幼苗';
        case 1:
            return '普通姻缘树';
        case 2:
            return '黑铁★姻缘树';
        case 3:
            return '青铜★姻缘树';
        case 4:
            return '白银★姻缘树';
        case 5:
            return '黄金★姻缘树';
        case 6:
            return '紫金★姻缘树';
        case 7:
            return '永恒★姻缘树';
        case 8:
            return '上古★姻缘树';
        case 9:
            return '太古★姻缘树';
        default:
            return '千年★姻缘树';
    }
}

const activeText = (num) => {
    let drain = 0;
    if (num > 3) {
        drain = 1000 * (2 ** (num - 3));
    }
    return drain ? `银两${drain}` : '无消耗';
}

export const YinYuanShu = ({ history }) => {
    const [info, setInfo]: any = useState();
    useEffect(() => {
        getMarriage().then(({ data }) => {
            setInfo(data);
        })
    }, [])


    const treeManageClick = (type) => {
        treeManage({ type }).then(({ data }) => {
            if (data) {
                getMarriage().then(({ data }) => {
                    setInfo(data);
                })
            }
        })
    }

    if (!info) {
        return null;
    }
    const { info: base, role_id, tree } = info.qingYuan;
    const { role1, name1, name2, level, exp, causality } = base;
    console.log(info, 'YinYuanShu...');
    return (
        <div>
            <div>〓{getTreeNmae(level)}〓</div>
            <div>天定姻缘:{role1 === role_id ? name2 : name1}</div>
            <div>姻缘值：{level}({exp})</div>
            <div>姻缘果：{causality} <span className="g_u_end">采摘</span></div>
            <div>
                <span className="g_u_end" onClick={() => { treeManageClick(1) }}>浇水({activeText(tree.j)})</span>
                {' | '}
                <span className="g_u_end" onClick={() => { treeManageClick(2) }}>除草({activeText(tree.c)})</span>
            </div>
            <div><span className="g_u_end" onClick={() => { jumpMakeEquip('marriage') }}>情缘装备</span></div>
            <div><span className="g_u_end">情缘副本</span></div>
            <div>你们可以共同培育姻缘树了，不仅仅可以打造强力情缘的装备，更可获得大量的属性加成哟！！！</div>

            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default YinYuanShu;