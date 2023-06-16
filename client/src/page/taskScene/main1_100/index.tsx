
import React, { useEffect } from 'react';

const MainId1 = ({ state, scne, scneClick }) => {
    const { page } = scne;
    useEffect(() => {
        if (state === 0) {
            scneClick('size', 2)
        }
    }, [state]);

    const pageClick = () => { scneClick('page'); }
    if (state === 0) {
        return page === 1 ? (
            <div>
                <div>序章：魔尊苏醒。</div>
                <div><span className="g_u_end" onClick={pageClick}>下一页</span></div>
            </div>
        ) : (
                <div>
                    <div>传说魔尊苏醒了，看来这片天地要不安宁了。</div>
                </div>
            )
    }

    return (
        <div>
            <div>不好魔尊分身逃走了,道君赶紧追过去，千万不能放虎归山。</div>
            <div>魔尊逃往魔族深处了，道君你赶紧去消灭他。</div>
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


// export const MainScene1_100 = ({...id,props})=>{

// }