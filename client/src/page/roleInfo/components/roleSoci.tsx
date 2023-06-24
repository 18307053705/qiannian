import React from "react";

const RoleSoci = ({ roleInfo }) => {
    const { socialize_pool:socialize } = roleInfo;
    return (
        <>
            <div className="g_fgx"></div>
            <div><span className="g_b">帮会势力</span>：<span>{socialize.gang ? socialize.gang.name : "无"}</span></div>
            <div><span className="g_b">结义庄园</span>：<span>{socialize.intersect ? socialize.intersect.name : "无"}</span></div>
            <div><span className="g_b">所在队伍</span>：<span>{socialize.ranks ? socialize.ranks.name : "无"}</span></div>
        </>
    )

}

export default RoleSoci;