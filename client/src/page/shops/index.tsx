import React, { useState, useEffect } from 'react';
import { List, Tab } from '@components/index';
import { getShopList } from '@cgi/shopping';
import { backGrand } from '@utils/grand'


const tabList = [
    { value: 0, label: "元宝商店" },
    { value: 1, label: "银两商店" },
];
export const Shops = ({ history }) => {
    const [tabKey, seTabKey] = useState(0);
    // const [list, setList] = useState([]);
    // useEffect(() => {
    //     // 店铺列表
    //     getShopList().then(({ data }) => {
    //         setList(data)
    //     })
    // }, [])



    return (
        <div>
            <Tab list={tabList} currentKey={tabKey} onCheng={seTabKey} />
            <List data={[]} prefix={() => ''} />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shops;