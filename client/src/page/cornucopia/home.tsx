import React from 'react';

const ELE_KEY = {
    1: '风',
    2: '雷',
    3: '冰',
    4: '水',
    5: '火',
}

const getExp = (lx, exp) => {
    // 计算聚宝盆等级经验等
    // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
    // 最大30级
    const level = lx / 3;
    let upExp = level * 10 + 10;
    if (level > 9) {
        upExp = level % 10 * 1000 + 1000;
    }
    if (level > 19) {
        upExp = level % 10 * 10000 + 10000;
    }
    return `${exp}/${upExp}`;

}

export default ({ valMap, materialMap, setPageInfo, clear, gatherClick, chengIdClick, data, drawClick }) => {
    const { id, lx, l, exp } = data['jbp'];
    return (
        <div>
            <div>提示:聚宝成功率随等级提升[各项材料不得少于200]</div>
            <div>=============</div>
            {
                Object.keys(valMap).map((key) => {
                    return (
                        <div key={key}>
                            <span>{ELE_KEY[key]}:{valMap[key]}</span>
                            <span className="g_u_end" onClick={() => { setPageInfo({ key: 'materialList', state: key }) }}>
                                +材料{materialMap[key].length}
                            </span>
                        </div>
                    )
                })
            }
            <div><span onClick={clear} className='g_u_end'>清空材料</span></div>
            <div>=============</div>
            <div><span onClick={gatherClick} className='g_u_end'>开始聚宝</span></div>
            <div>
                <span>聚宝盆目标:</span>
                <span className="g_u_end">{id}</span>
                <span> | </span>
                <span className="g_u_end" onClick={chengIdClick}>[换]</span></div>
            <div><span>聚宝盆等级:{lx / 3 || 0}({getExp(lx, exp)})</span></div>
            <div>
                <span>有效抽奖次数:({lx - l || 0})</span>
                <span className="g_u_end" onClick={drawClick}>[抽奖]</span></div>
            <div>提示:玩家的聚宝盆等级越高,影响获得商城道具的概率以及成功率。</div>
            <div> <span className="g_u_end" onClick={() => { setPageInfo({ key: 'guide' }) }}>材料掉落图鉴</span></div>
        </div>

    )
}
