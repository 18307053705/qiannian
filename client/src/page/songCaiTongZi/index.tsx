import React from "react";
import { backGrand } from '@utils/grand';
import { invest, receiveInvest } from '@cgi/yinHang';
import Styles from './index.less';
export const SongCaiTongZi = () => {

    return (
        <div>
            <div className={Styles.tips}>理财活动火热进行中，30级前存入200元宝最高可获得5000%的回报！！！</div>
            <div><span className="g_u_end" onClick={invest}>存入元宝</span></div>
            <div><span className="g_u_end" onClick={receiveInvest}>领取元宝</span></div>
            <div className={Styles.tips}>
                50级可领取300%元宝，60级可领取500%元宝，70级可领取1200%，80级可领取3000%！
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default SongCaiTongZi;

