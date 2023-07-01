
import React from 'react';

const MainId1 = ({ state, name }) => {
    if (state === 0) {
        return (
            <div className='g_inden'>
                <div>"{name},不好了,出大了事了。"</div>
                <div>远处村口一道极为狼狈的身影慌慌张张的跑的了古树下,正是与你一同在隐仙村长大的拎壶冲。</div>
                <div>见到满头大汗的拎壶冲,你连忙从古树上跳了下来：“出什么事了？”</div>
                <div>"小...小花被十里坡的山贼抓走了！"</div>
                <div>"什么,前面带路。"</div>
                <div>你顿时一惊,小花正是村长的孙女。</div>
                <div>十里坡的山贼你也略有所闻，据说全是一群亡命徒,若真让小花被抓走了,下场如何你已经不敢想下去了，不等拎壶冲反应便拉着他朝村外的十里坡跑去。</div>
            </div>
        )
    }

    return (
        <div className='g_inden'>
            <div>"不好，我们来晚了，小花已经被抓到山上去了。"</div>
            <div>你一路拉着拎壶冲跑到追赶山贼，直接就追到了十里坡老巢，不过还是晚了一步。</div>
            <div>"那就打上山寨。"见此你眉头一皱果断道。</div>
            <div>"啥,要不再想想...，卧槽..快回来！"</div>
            <div>看着十里坡密密麻麻的巡逻山贼，拎壶冲都怀疑是不是听错了，正要劝你再想想其他办法，一回头却发现你已经冲出去了。</div>
            <div>拎壶冲的惊呼声顿时引起了周围山贼的注意，瞬间全部朝你冲了过来。</div>
        </div>
    )

    // return (
    //     <div>
    //         我穿越千年的岁月，忘却了修为，只为寻找....
    //         <div><span className="g_u_end">继续</span></div>
    //     </div>
    // )
}

const MainId2 = ({ state, scne, scneClick }) => {
    if (state === 0) {
        return <div>序章：魔尊苏醒2。</div>
    }
    return (
        <div>
            <div>不好魔尊分身逃走了,道君赶紧追过去，千万不能放虎归山222222222222。</div>
            <div>魔尊逃往魔族深处了，道君你赶紧去消灭他22222222222。</div>
        </div>
    )
}

const MainId3 = ({ state, scne, scneClick }) => {
    if (state === 0) {
        return <div>序章：魔尊苏醒3。</div>
    }
    return (
        <div>
            <div>不好魔尊分身逃走了,道君赶紧追过去，千万不能放虎归山333333333332。</div>
            <div>魔尊逃往魔族深处了，道君你赶紧去消灭他33333333333。</div>
        </div>
    )
}


export const MAIN1_100_SCENE = {
    1: MainId1,
    2: MainId2,
    3: MainId3
}
