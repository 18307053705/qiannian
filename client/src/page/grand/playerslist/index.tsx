import React from 'react';

export const PlayersList = ({ players }) => {
    return (
        <div>
            <div>
                {
                    players.map(({ role_name, role_id }) => (<span key={role_id} className="g_u" ><span>{role_name}</span></span>))
                }
            </div>
            <div>返回游戏</div>
        </div>
    )
}

export default PlayersList;