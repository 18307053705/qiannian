import React from "react";

const RoleSoci = ({ roleInfo }) => {
    const { socialize_pool:socialize } = roleInfo;
    return (
        <>
            <div className="g_fgx"></div>
            {socialize.gang && <div><span className="g_b">帮会势力</span>：<span>{socialize.gang.name}</span></div>}
            {socialize.intersect && <div><span className="g_b">结义庄园</span>：<span>{socialize.intersect.name}</span></div>}
            {socialize.ranks && <div><span className="g_b">所在队伍</span>：<span>{socialize.ranks.name}</span></div>}
        </>
    )

}

export default RoleSoci;