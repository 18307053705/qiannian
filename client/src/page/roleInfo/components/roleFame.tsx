import React from "react";

const RoleFame = ({ roleInfo }) => {
    const { reputation_pool } = roleInfo;
    const reputation = reputation_pool ? JSON.parse(reputation_pool) : {};
    return (
        <>
            <div className="g_fgx"></div>
            <div><span className="g_b">世界声望</span>：<span>{reputation.world || 0}</span></div>
            <div><span className="g_b">帮会声望</span>：<span>{reputation.secret || 0}</span></div>
            <div><span className="g_b">结义声望</span>：<span>{reputation.brother || 0}</span></div>
            <div><span className="g_b">世界功勋</span>：<span>{reputation.exploit || 0}</span></div>
            <div><span className="g_b">世界名气</span>：<span>{reputation.fame || 0}</span></div>
        </>
    )

}

export default RoleFame;