import React, { useState, useEffect, useCallback } from "react";
import { backGrand, goBack } from '@utils/grand';
import { jumpDetail } from '@utils/jumpPage';
import { getIntegralList, shopIntegral } from '@cgi/shops';
import { getRoleInfo } from '@cgi/roleInfo';
import { List } from '@components';

export const ShopIntegral = ({ history }) => {
    const [data, setData] = useState([]);
    const [integral, setIntegral] = useState(0);

    const getIntegral = useCallback(() => {
        getRoleInfo().then(({ data }) => {
            const { shenZhuang } = data.role_integral;
            setIntegral(shenZhuang)
        })
    }, [])

    useEffect(() => {
        getIntegral();
        const list = sessionStorage.getItem('IntegralList');
        if (list) {
            setData(JSON.parse(list));
        } else {
            getIntegralList().then(({ data }) => {
                sessionStorage.setItem('IntegralList', JSON.stringify(data));
                setData(data)
            });
        }

    }, []);

    const shopIntegralClick = (id, type) => {
        shopIntegral({ id, p: type }).then(({ success }) => {
            if (success) { getIntegral() }
        })
    }
    const prefix = ({ name, type,id }) => (
        <span className="g_u_end" onClick={() => { jumpDetail(history, { p: type, form: 7,id }) }}>{name}</span>
    );

    const active = ({ id, type, integral }) => {
        return <span className="g_u_end" onClick={() => { shopIntegralClick(id, type) }}>兑换({integral})</span>
    }
    return (
        <div>
            <div>积分商店中拥有大量绝品神装与珍稀道具,玩家可使用积分兑换,剩余积分：{integral}</div>
            <List data={data} prefix={prefix} active={active} size={100} />
            <div><span className="g_u_end" onClick={goBack}>返回上页</span></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default ShopIntegral;

