import React from "react";

const INTEGRA_MEUN = {
    world: "世界声望",
    gang: "帮会声望",
    intersect: "结义声望",
    exploit: "世界功勋",
    fame: "世界名气",
}

const RoleFame = ({ roleInfo }) => {
    const { role_integral } = roleInfo;
    return (
        <>
            <div className="g_fgx"></div>
            {
                Object.keys(INTEGRA_MEUN).map((key, index) => (
                    <div key={index}>
                        <span className="g_b">{INTEGRA_MEUN[key]}</span>：
                        <span>{role_integral[key] || 0}</span>
                    </div>
                ))
            }
        </>
    )

}

export default RoleFame;
