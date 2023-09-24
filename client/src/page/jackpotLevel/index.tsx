import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { jackpotLevel } from '@cgi/jackpot';
import { getRoleInfo } from '@cgi/roleInfo';
import Styles from './index.less';
export const JackpotLevel = () => {
    const [level, setLevel] = useState(0);
    const [list, setList] = useState([]);
    const drawPetClick = () => {
        jackpotLevel().then(({ data }) => {
            if (data) {
                setLevel((data.num * 10) + 50);
                setList(data.textList);
            }
        })
    }
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            const { level = 0 } = data.jackpot;
            setLevel((level * 10) + 50);
        })
    }, []);
    return (
        <div>
            <div className={Styles.tips}>
                全天冲级活动火热进行中，玩家达到50级，60级，70级，80级，90级，100级即可获得一次抽奖机会。
            </div>
            {
                list.map(({ name, value }, index) => <div key={index}>{name}+{value}</div>)
            }
            {
                level < 110 && <div><span className="g_u_end" onClick={drawPetClick}>【{level}级抽奖】</span></div>
            }

            <div className={Styles.tips}>
                50级后，每升10级即可获得一次抽奖机会，运气好甚至可获得2000元宝，5000元宝，10000元宝的超级大奖。
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default JackpotLevel;

