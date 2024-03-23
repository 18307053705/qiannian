import React from "react";
const getUinxDay = (uinx: any) => {
    const time = uinx - new Date();
    if (time <= 0) {
        return '';
    }
    let m = time / 60000;
    let h = 0;
    let d = 0;
    let text = "剩余";
    if (m > 60) {
        h = m / 60;
        m = m % 60;
    }
    if (h > 24) {
        d = h / 24;
        h = h % 24;
    }
    if (d) {
        text += `${parseInt(d)}天`;
    }
    if (h) {
        text += `${parseInt(h)}时`;
    }
    text += `${parseInt(m)}分。`;
    return text;
};

const VIP_MUEN = {
    month: "月卡时间",
    exp2: "双倍经验",
    exp3: "三倍经验",
    exp5: "五倍经验",
    money2: "双倍金钱",
    money3: "三倍金钱",
    money5: "五倍金钱",
}

const RoleBuff = ({ roleInfo }) => {
    const { buff } = roleInfo;
    const { attr, vip } = buff;
    return (
        <>
            <div className="g_fgx"></div>
            {
                Object.keys(VIP_MUEN).map((key, index) => {
                    const timer = vip[key] ? getUinxDay(vip[key]['d']) : '';
                    return (
                        <div key={`${index}_1`}>
                            <span className="g_b">{VIP_MUEN[key]}</span>：
                            <span>{timer ? `剩余${timer}` : '已过期'}</span>
                        </div>
                    )
                })
            }
            {
                attr.map(({ text, d }, index) => {
                    const timer = getUinxDay(d);
                    return (
                        <div key={index}>
                            <span>{text}</span>,
                            <span>{timer ? timer : '已过期'}</span>
                        </div>
                    )
                })
            }
        </>
    )

}

export default RoleBuff;