//  id id
//  title 标题
//  type 类型 1:战斗,2:对话,3:收集,4:猜拳,5:选择
//  tips 述述
//  level 等级,可选
//  reward 任务奖励
//  reward.article id-s,多个物品使用,分隔
//  reward.equip id-s,多个装备使用,分隔
//  reward.tael 银两奖励tael:100
//  reward.attr 属性奖励('经验:exp-1000,声望:world-100,帮会声望:gang-100,结义声望:intersect-100,功勋:exploit-100')
//  grand 地图信息
//  grand.npc 领取任务npc{address,id}
//  grand.tNpc 目标npc{address,id}(对话型任务)
//  grand.freak 目标怪物[{address,id,s:次数}](战斗型任务)
//  receive 领任务文案[]
//  done 完成任务文案[]
//  complete 完成条件
//  complete.article 完物品需求id-s,多个物品使用,分隔
//  complete.equip 装备需求id-s,多个装备使用,分隔
//  complete.freak 怪物击杀需求id-s多个怪物使用,分隔
//  nextTask 下一个任务id
module.exports = {
    1: {
        id: 1,
        title: "序章",
        tips: "拎壶冲就在隐仙村(1,1),赶紧过去和他聊聊吧",
        type: 2,
        reward: {
            attr: "exp-200"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0"
            },
        },
        receive: [
            "我穿越了千年，在无尽的岁月长河中沉睡，最终忘却了一切，只为重回千年前……",
            "神秘声音：醒醒，快点醒醒！",
            "一道声音将你从沉睡中唤醒，你睁开眼发现面前站着一个少年，而你此时正躺在一处古树下。",
            "你：&你是？"
        ],
        done: [
            "拎壶冲：靠，你不会睡傻了吧，我拎壶冲啊！！！",
            "你：拎壶冲？",
            "拎壶冲：算了，先不说这个了，你快跟我来！",
            "你：&去哪？"
        ],
        nextId: 2
    },
    2: {
        id: 2,
        title: "十里坡",
        tips: "拎壶冲就在隐仙村(1,2),赶紧过去和他聊聊吧",
        type: 2,
        reward: {
            attr: "exp-300"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0"
            },
            tNpc: {
                id: 10,
                address: "10000,0,1"
            },
        },
        receive: [
            "你被拎壶冲拉着一路朝村子东边跑过去，最后在一个山坡的巨石后面躲了起来，而巨石外面则是一群的彪形大汉拿着明晃晃的大砍刀来回巡逻。",
            "你：这不会是黑涩会吧，你带我来这里干嘛？",
            "拎壶冲：这是附近的山贼，小花就是被他们抓了！",
            "你：&小花又是谁？"
        ],
        done: [
            "拎壶冲：靠，三个月前你昏迷在村口就是小花救了你啊！",
            "你：......",
            "你：&那你带我来是准备救小花？",
        ],
        nextId: 3
    },
    3: {
        id: 3,
        title: "十里坡",
        tips: "山贼就在隐仙村(1,2),教训他们一顿后去找拎壶冲。",
        type: 1,
        reward: {
            attr: "exp-500"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,1"
            },
        },
        receive: [
            "拎壶冲：当然了，这些该死的山贼烧杀抢掠，本少侠早就想教训他们一顿了！",
            "说完拎壶冲就冲了出去与山贼打了起来，你见此不由得张了张嘴，这个世界的人都这么虎？",
            "就在这时有两个巡逻山贼似乎发现了你，一前一后的悄悄朝巨石走来。",
            "你：&遭了！",
        ],
        done: [
            "前后都被包围，无处可逃，你只能一咬牙冲向两个巡逻山贼。",
            "只是你没想到这些看着彪悍无比的山贼竟然被你一拳一个，几乎瞬间就全部解决了。",
            "拎壶冲：哟，可以嘛!",
            "你：&这是什么情况？。"
        ],
        complete: {
            freak: "20-5"
        },
        tp: '10000,0,1',
        nextId: 4
    },
    4: {
        id: 4,
        title: "全副武装",
        tips: "回到仙隐村(1,1)找拎壶冲对话。",
        type: 2,
        reward: {
            equip: "1,2,3,4,5",
            article: "1-20,2-20"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,1"
            },
            tNpc: {
                id: 10,
                address: "10000,0,0"
            },
        },
        receive: [
            "拎壶冲：看来你真的什么都忘了，算了，先不说这些，我们先回村子。",
            "你：不救人了！",
            "拎壶冲：救，不过你先看看那边。",
            "你顺着拎壶冲指得方向看去，只见密密麻麻的山贼正在赶来支援。",
            "你：&卧槽！",
        ],
        done: [
            "你与拎壶冲一路狼狈逃回村子，然后就见后者不知从什么地方找出来一堆装备与丹药。",
            "拎壶冲：穿上装备，我们打回去。",
            "你：&走，杀回去。"
        ],
        nextId: 5
    },
    5: {
        id: 5,
        title: "潜入山寨",
        tips: "十里坡全是山贼，抓几个山寨头目伪装一下潜入山寨！",
        type: 1,
        reward: {
            attr: "exp-700"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,1"
            },
            npc: {
                id: 10,
                address: "10000,0,2"
            },
        },
        complete: {
            freak: "21-2"
        },
        tp: '10000,0,1',
        receive: [
            "经过刚才的事，此时十里坡的山贼很明显多了很多。",
            "拎壶冲：我去，山贼又变多了，这该怎么办？",
            "听到拎壶冲的话，你目光停留在山贼头目的身上，决定：",
            "&伪装成山寨头目。"
        ],
        done: [
            "你与拎壶冲换上山贼头目的服装后直接一路大摇大摆的朝十里坡上走去。",
            "一路上畅通无阻，不多久一座巨大的山寨便出现在你的视线中，一支支山贼队伍在大门口谨慎的巡逻。",
            "你与拎壶冲刚靠近，立马就被拦了下来。",
            "精英山贼：暗号！",
            "拎壶冲：......",
            "你：&......"
        ],
        nextId: 6
    },
    6: {
        id: 6,
        title: "暗号",
        tips: "伪装暴露，立即击杀5名精英山贼。",
        type: 1,
        reward: {
            attr: "exp-1000"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,2"
            },
            tNpc: {
                id: 111,
                address: "10000,0,2"
            }
        },
        complete: {
            freak: "22-5"
        },
        tp: '10000,0,1',
        receive: [
            "拎壶冲：天王盖地虎。",
            "你：宝塔镇河妖。",
            "两道暗号一出，精英山贼都是一愣，随即直接拔刀砍了过来。",
            "&迎战。"
        ],
        done: [
            "山寨大门的战斗动静立即引得无数山贼过来。",
            "拎壶冲：你先去山寨找小花，我来拦住他们。",
            "你：&嗯！",
        ],
        nextId: 7
    },
    7: {
        id: 7,
        title: "大当家",
        tips: "击败黑风寨贼首大当家。",
        type: 1,
        reward: {
            attr: "exp-1500"
        },
        grand: {
            npc: {
                id: 111,
                address: "10000,0,3"
            },
        },
        complete: {
            freak: "23-1"
        },
        tp: '10000,0,2',
        receive: [
            "进入黑风寨大门，你便听到大厅中隐隐传来女子求救声。",
            "你连忙就朝着声音传来的方向而去，只见大厅内黑风寨大当家正满脸淫笑的调戏着一名穿着黄衣的女子，逼得那女子四处躲藏。",
            "你不由得脱口而出：哟呵，你这山贼还玩的挺花的。",
            "女子：......",
            "大当家：......",
            "大当家：那来的混账小子，给我死。",
            "&迎战大当家。"
        ],
        done: [
            "铛铛铛！",
            "几个回合下来，大当家很快就落了下风被你抓住破绽一招打的吐血倒飞。",
            "你立即将剑尖抵住大当家的脖子：说，小花在什么地方？",
            "你询问的话音刚落就感觉有人在拉你的衣角，只见刚才那黄衣女子正一脸委屈的看着你：我就是小花啊，你怎么不认识我了！",
            "你:......",
        ],
        nextId: 8
    },
    8: {
        id: 8,
        title: "魔化大当家",
        tips: "击败实力大增的大当家。",
        type: 1,
        reward: {
            attr: "exp-2000"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,3",
            },
            freak: [
                {
                    id: 229,
                    address: "10000,0,3",
                }
            ]
        },
        receive: [
            "这时被你击败的大当家突然暴起，身上的气势不断攀升，手中的鬼头刀再度朝你劈来。",
            "小花：小心！",
            "你顿时一惊，没想到这大当家竟然还有隐藏手段，千钧一发之时，一柄修长的剑挡在了你面前，正是拎壶冲。",
            "不过大当家此时已然魔化，实力大增，几个回合拎壶冲就落入了下风。",
            "你决定：&不讲武德，偷袭大当家。"
        ],
        done: [
            "趁着大当家与拎壶冲交手，你二话不说手掐一道法诀朝从背后偷袭！",
            "噗！",
            "大当家一时大意，没有闪，直接就吃了这一记法诀当即重伤被拎壶冲一剑斩杀。",
            "有惊无险的击杀大当家后拎壶冲给你竖了个大拇指：干得漂亮！",
            "你：&既然人救出来了，我们赶紧离开吧。",
        ],
        nextId: 9,
    },
    9: {
        id: 9,
        title: "神秘藏宝图",
        tips: "前往黑风寨后堂与拎壶冲对话！",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 10000,
            equip: "6,7",
            article: "3-20,4-20"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,3",
            },
        },
        receive: [
            "只见拎壶冲此时鬼鬼祟祟在那大当家的身上摸来摸去，似乎是在找什么一样！",
            "不多时就见拎壶冲一脸兴奋的摸出一堆东西：哈哈，找到了，果然有不少好东西！",
            "这时一张古朴的图纸从那一堆物品中掉了出来，你好奇的捡了起来只见图纸上似乎有些怪异的纹路。",
            "你：&这是？。"
        ],
        done: [
            "拎壶冲：馒...馒头，这地图竟然记载了传说中的馒头！",
            "你：馒头？",
            "拎壶冲：这里不可久留，我们赶紧回村子回到村子我们再说。",
            "......",
            "你们离开山寨不久，便有一道诡异的身影出现，看着地上大当家的尸体喃喃自语了一句：看来来晚了，馒头的下落被人先一步取走了。",
        ],
        // nextId: 10,
    }
}