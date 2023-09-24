import React from 'react';
import { createFightDir } from '@cgi/grand';
export const PlayersList = ({ players }) => {
    return (
        <div>
            <div>
                {
                    players.map(({ role_name, role_id, zhangChang }) => (
                        <span key={role_id} className="g_u" onClick={() => {
                            if (zhangChang) {
                                createFightDir({ role_id, type: 3 })
                            } else {
                                window.QN.history.push('/player', { role_id, role_name })
                            }
                        }} ><span>{role_name}</span></span>
                    ))
                }
            </div>
            <div>返回游戏</div>
        </div>
    )
}

export default PlayersList;