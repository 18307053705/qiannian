import React, { useCallback } from 'react';
const sceneText = {
    110: '无妄海内突然出现一块诡异的石碑，引起无数骷髅生灵暴动，据说石碑的内部乃是数百年前一位强大邪修炼魂郎君的洞府，其中或许隐藏着什么阴谋。',
    111: '你答应老者的请求进入十万大山寻找他的孙女，最终你竟然查到了黑炎宗身上，于是你选择了拜访黑炎宗却发现这个宗门竟然血祭了数百万凡人妄图复活传说中的血魔。',
    112: '在南海之岸有这样一个传说，在太阳升起之时，有缘者可在天地相接之处见到传说中的龙宫入口，龙宫内拥有无数稀世的天材地宝，这日你来到南海之岸，一道金色霞光落洒落在海面，隐隐中竟然还有一座金碧辉煌的宫殿。',
    113: '你站在荒凉的山脚，便感觉到山巅传来的大妖威压，抬头看去，只见山巅之上一棵千年梧桐古树，万丈大树直入云端，枝干四面延伸，遮天蔽日，一座有些破旧的诡异道观，安静的坐落在山脚。',
    114: '你按照天机老人的指引成功找到了千年前抵御血魔一脉的超级宗门：御风宗，果然此处早已经血气弥漫，而让你没想到的是他们竟然已经完成了血祭，血魔降临无边魔气已经将整个御风宗侵蚀。',
    115: '一座藏在深海之底的恐怖魔宫，无数强大的傀儡守护在周围，隐隐中你似乎听到了来自宫殿内部海魔的咆哮，他似乎正在冲击自身封印。',
    116: '天魔宫殿内到处都是玄奥的阵法，而阵法的中心则是一尊伟岸的巨像，你一眼便认出那就是传说中的天魔，此时域外一道光束落在巨像之上，正是天魔想要借此降世。',
    117: '传说世间所有亡者的往生之地，轮回的尽头便通往时间长河，可穿梭于过去，未来，只是凡是想借此踏入时间长河者都需要通过酆都大帝的考验。',
    118: '魔族遗址内魔气铺天盖地，寻常修士踏入顷刻间便会入魔，你在这里看到了恐怖的一幕，一尊尊伟岸无比的巨像傲立于此，甚至还有被你斩杀的魔族强者竟然也在此复活了。',
}



const TaskDetail = ({ curId, taskInfo, id, receiveTaskClick }) => {
    if (curId !== id || !taskInfo) {
        return null;
    }
    const { status, complete } = taskInfo;
    if (status === 0) {
        return (
            <div>
                <div>简介：{sceneText[id]}</div>
                <div><span className='g_u_end' onClick={() => { receiveTaskClick(id, 1) }}>领取悬赏</span></div>
                <div>=================</div>
            </div>
        )
    }
    const { freak, done } = complete;
    return (
        <div>
            <div>简介：{sceneText[id]}</div>
            {
                    [...Object.values(freak || {})].map(({ name, n, s, c }: any, index) => (
                        <div key={index}>击败{c === s ? `${name || n}(已完成)` : `${name || n}(${c}/${s})`}</div>
                    ))
                }
            {
                !done && <div><span className='g_u_end' onClick={() => { receiveTaskClick(id, 2) }}>完成悬赏</span></div>
            }
            <div>=================</div>
        </div>


    )

}


export default TaskDetail;