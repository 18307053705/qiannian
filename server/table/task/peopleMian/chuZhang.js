module.exports = {
    1: {
        id: 1,
        title: "序章",
        tips: "拎壶冲就在隐仙村(1,1),赶紧过去和他聊聊吧",
        type: 2,
        reward: {
            attr: "exp-200",
            article: "1-20,2-20",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0"
            },
        },
        receive: [
            "我穿越了千年,在无尽的岁月长河中沉睡,最终忘却了一切,只为重回千年前……",
            "神秘声音：醒醒,快点醒醒!",
            "一道声音将你从沉睡中唤醒,你睁开眼发现面前站着一个少年,而你此时正躺在一处古树下。",
            "你：&你是?"
        ],
        done: [
            "拎壶冲：靠,你不会睡傻了吧,我拎壶冲啊!!!",
            "你：拎壶冲?",
            "拎壶冲：算了,先不说这个了,你快跟我来!",
            "你：&去哪?"
        ],
        nextId: 2
    },
    2: {
        id: 2,
        title: "十里坡",
        tips: "拎壶冲就在隐仙村(1,2),赶紧过去和他聊聊吧",
        type: 2,
        reward: {
            attr: "exp-300",
            tael: 200,
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
            "你被拎壶冲拉着一路朝村子东边跑过去,最后在一个山坡的巨石后面躲了起来,而巨石外面则是一群的彪形大汉拿着明晃晃的大砍刀来回巡逻。",
            "你：这不会是黑涩会吧,你带我来这里干嘛?",
            "拎壶冲：这是附近的山贼,小花就是被他们抓了!",
            "你：&小花又是谁?"
        ],
        done: [
            "拎壶冲：靠,三个月前你昏迷在村口就是小花救了你啊!",
            "你：......",
            "你：&那你带我来是准备救小花?",
        ],
        nextId: 3
    },
    3: {
        id: 3,
        title: "十里坡",
        tips: "巡逻山贼就在隐仙村(1,2),教训他们一顿后去找拎壶冲。",
        type: 1,
        reward: {
            attr: "exp-500",
            tael: 300,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,1"
            },
        },
        receive: [
            "拎壶冲：当然了,这些该死的山贼烧杀抢掠,本少侠早就想教训他们一顿了!",
            "说完拎壶冲就冲了出去与山贼打了起来,你见此不由得张了张嘴,这个世界的人都这么虎?",
            "就在这时有两个巡逻山贼似乎发现了你,一前一后的悄悄朝巨石走来。",
            "你：&遭了!",
        ],
        done: [
            "前后都被包围,无处可逃,你只能一咬牙冲向两个巡逻山贼。",
            "只是你没想到这些看着彪悍无比的山贼竟然被你一拳一个,几乎瞬间就全部解决了。",
            "拎壶冲：哟,可以嘛!",
            "你：&这是什么情况?。"
        ],
        complete: {
            freak: "2000-2"
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
            tael: 1000,
            equip: "1,2,3,4,5",
            article: "1-20,2-20",
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
            "拎壶冲：看来你真的什么都忘了,算了,先不说这些,我们先回村子。",
            "你：不救人了!",
            "拎壶冲：救,不过你先看看那边。",
            "你顺着拎壶冲指得方向看去,只见密密麻麻的山贼正在赶来支援。",
            "你：&卧槽!",
        ],
        done: [
            "你与拎壶冲一路狼狈逃回村子,然后就见后者不知从什么地方找出来一堆装备与丹药。",
            "拎壶冲：穿上装备,我们打回去。",
            "你：&走,杀回去。"
        ],
        nextId: 5
    },
    5: {
        id: 5,
        title: "潜入山寨",
        tips: "十里坡全是山贼,抓几个山寨头目伪装一下潜入山寨!",
        type: 1,
        reward: {
            attr: "exp-1000",
            tael: 300,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,1"
            },
        },
        complete: {
            freak: "2001-2"
        },
        tp: '10000,0,1',
        receive: [
            "经过刚才的事,此时十里坡的山贼很明显多了很多。",
            "拎壶冲：我去,山贼又变多了,这该怎么办?",
            "听到拎壶冲的话,你目光停留在山贼头目的身上,决定：",
            "&伪装成山寨头目。"
        ],
        done: [
            "你与拎壶冲换上山贼头目的服装后直接一路大摇大摆的朝十里坡上走去。",
            "一路上畅通无阻,不多久一座巨大的山寨便出现在你的视线中,一支支山贼队伍在大门口谨慎的巡逻。",
            "你与拎壶冲刚靠近,立马就被拦了下来。",
            "精英山贼：暗号!",
            "拎壶冲：......",
            "你：&......"
        ],
        nextId: 6
    },
    6: {
        id: 6,
        title: "暗号",
        tips: "伪装暴露,立即击杀3名精英山贼。",
        type: 1,
        reward: {
            attr: "exp-1000",
            tael: 500,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,2"
            },
        },
        complete: {
            freak: "2002-3"
        },
        tp: '10000,0,2',
        receive: [
            "拎壶冲：天王盖地虎。",
            "你：宝塔镇河妖。",
            "两道暗号一出,精英山贼都是一愣,随即直接拔刀砍了过来。",
            "&迎战。"
        ],
        done: [
            "山寨大门的战斗动静立即引得无数山贼过来。",
            "拎壶冲：你先去山寨找小花,我来拦住他们。",
            "你：&嗯!",
        ],
        nextId: 7
    },
    7: {
        id: 7,
        title: "大当家",
        tips: "击败黑风寨贼首大当家。",
        type: 1,
        reward: {
            attr: "exp-1000",
            tael: 500,
        },
        grand: {
            npc: {
                id: 23,
                address: "10000,0,3"
            },
            freak: [
                {
                    id: 2003,
                    address: "10000,0,3",
                }
            ]
        },
        receive: [
            "进入黑风寨大门,你便听到大厅中隐隐传来女子求救声。",
            "你连忙就朝着声音传来的方向而去,只见大厅内黑风寨大当家正满脸淫笑的调戏着一名穿着黄衣的女子,逼得那女子四处躲藏。",
            "你不由得脱口而出：哟呵,你这山贼还玩的挺花的。",
            "女子：......",
            "大当家：......",
            "大当家：那来的混账小子,给我死。",
            "&迎战大当家。"
        ],
        done: [
            "铛铛铛!",
            "几个回合下来,大当家很快就落了下风被你抓住破绽一招打的吐血倒飞。",
            "你立即将剑尖抵住大当家的脖子：说,小花在什么地方?",
            "你询问的话音刚落就感觉有人在拉你的衣角,只见刚才那黄衣女子正一脸委屈的看着你：我就是小花啊,你怎么不认识我了!",
            "你:&......",
        ],
        nextId: 8
    },
    8: {
        id: 8,
        title: "魔化大当家",
        tips: "击败实力大增的大当家。",
        type: 1,
        reward: {
            attr: "exp-1500",
            tael: 500,
        },
        grand: {
            npc: {
                id: 20015,
                address: "10000,0,3",
            },
            freak: [
                {
                    id: 20015,
                    address: "10000,0,3",
                }
            ],
            tNpc: {
                id: 10,
                address: "10000,0,3",
            },
        },
        receive: [
            "这时被你击败的大当家突然暴起,身上的气势不断攀升,手中的鬼头刀再度朝你劈来。",
            "小花：小心!",
            "你顿时一惊,没想到这大当家竟然还有隐藏手段,千钧一发之时,一柄修长的剑挡在了你面前,正是拎壶冲。",
            "不过大当家此时已然魔化,实力大增,几个回合拎壶冲就落入了下风。",
            "你决定：&不讲武德,偷袭大当家。"
        ],
        done: [
            "趁着大当家与拎壶冲交手,你二话不说手掐一道法诀朝从背后偷袭!",
            "噗!",
            "大当家一时大意,没有闪,直接就吃了这一记法诀当即重伤被拎壶冲一剑斩杀。",
            "有惊无险的击杀大当家后拎壶冲给你竖了个大拇指：干得漂亮!",
            "你：&既然人救出来了,我们赶紧离开吧。",
        ],
        nextId: 9,
    },
    9: {
        id: 9,
        title: "神秘藏宝图",
        tips: "前往黑风寨与拎壶冲对话!",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 50000,
            equip: "6,7",
            article: "3-50,4-50"
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,3",
            },
        },
        receive: [
            "只见拎壶冲此时鬼鬼祟祟在那大当家的身上摸来摸去,似乎是在找什么一样!",
            "不多时就见拎壶冲一脸兴奋的摸出一堆东西：哈哈,找到了,果然有不少好东西!",
            "这时一张古朴的图纸从那一堆物品中掉了出来,你好奇的捡了起来只见图纸上似乎有些怪异的纹路。",
            "你：&这是?。"
        ],
        done: [
            "拎壶冲：馒...馒头,这地图竟然记载了传说中的馒头!",
            "你：馒头?",
            "拎壶冲：这里不可久留,我们赶紧回村子回到村子我们再说。",
            "......",
            "你们离开山寨不久,便有一道诡异的身影出现,看着地上大当家的尸体喃喃自语了一句：看来来晚了,馒头的下落被人先一步取走了。",
            "&隐仙村。",
        ],
        nextId: 10,
    },
    10: {
        id: 10,
        title: "馒头传说",
        tips: "回到隐仙村找拎壶冲了解馒头的传说。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 200,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0",
            },
        },
        receive: [
            "你与拎壶冲一路将小花送回村长家后便有来到了村口的大树底下。",
            "你拿出藏宝图递给拎壶冲,后者接过藏宝图后又是仔细的看了几遍,砸了砸嘴：没想传说中的馒头竟然会在一个山贼窝找到线索。",
            "你：&这馒头究竟是什么?"
        ],
        done: [
            "最终在拎壶冲的解释后,你也大概的了解这所谓的馒头。",
            "数千年前一位名为东坡先生的大能制造出来四个馒头,分别送给人,妖,仙三族的族长。",
            "三族族长在服用馒头后竟然发现自身法力大增滋生出称霸三族的野心,然而三族族长谁也奈何不了对方,于是都将目光放在最后一个馒头上,于是爆发了一场持续千年的大战。",
            "最后各族高手死伤七八成,损失惨重,然而最后一个馒头却是不翼而飞了。",
            "听完拎壶冲的话,你心中只有无语,没想到三族竟然为了一个馒头打的头破血流。",
            "&继续",
        ],
        nextId: 11,
    },
    11: {
        id: 11,
        title: "妖族探子",
        tips: "擒住逃走的妖族探子,避免他将馒头的消息传出去。",
        type: 1,
        reward: {
            attr: "exp-2000",
            tael: 200,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0",
            },
            freak: [
                {
                    id: 20016,
                    address: "10000,0,0",
                }
            ]
        },
        receive: [
            "这时一道暗器突然从不远处飞了过来。",
            "拎壶冲：啊!",
            "只见拎壶冲闪躲不及暗器一下就扎到了他的屁股上,当即就发出惨叫",
            "你：你没事吧?",
            "拎壶冲：是妖族探子,决定不能让他跑了。",
            "你：&我去追。",
        ],
        done: [
            "几招下来那妖族探子便被你擒了下来,不过很快你就发现村子外还隐藏了数道身影。",
            "他们似乎被你的实力吓到了,纷纷四散而逃,你也不可能全部追到。",
            "拎壶冲一扭一拐的走过来：我去,这么探子,看来馒头的消息也藏不住了。",
            "你：&那现在怎么办?",
        ],
        nextId: 12
    },
    12: {
        id: 12,
        title: "前往剑舞城",
        tips: "动身前往人族主城剑舞城。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 200,
        },
        grand: {
            npc: {
                id: 10,
                address: "10000,0,0",
            },
            tNpc: {
                id: 10,
                address: "10001,0,0",
            },
        },
        receive: [
            "拎壶冲：如今只能先去剑舞城了。",
            "你：剑舞城是什么地方?",
            "拎壶冲：那是我人族的主城拥有无数强者,我们先去那里想办法找到藏宝图上的埋藏馒头的地方。",
            "你：&那现在就出发!"
        ],
        done: [
            "经过数日的赶路终于在视线中出现一座气势宏伟的古城。",
            "你能感受到城池中一道道强大的气息,心想不愧是人族主城。",
            "拎壶冲:呼,终于到了,我们赶紧进去吧。",
            "&继续",
        ],
        nextId: 13
    },
    13: {
        id: 13,
        title: "了解剑舞城",
        tips: "了解剑舞城的各个区域。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            },
            tNpc: {
                id: 17,
                address: "10001,0,0",
            },
        },
        replace: true,
        receive: [
            "拎壶冲：我要去找个人,${role_name}你先在城里逛一逛吧。",
            "你：找人?",
            "拎壶冲：一位精通地图的人族前辈,至于找他为何晚点我告诉你。",
            "你：&行,那我就去逛逛!"
        ],
        done: [
            "你刚与拎壶冲分开不久就被一个书生摸样的男子拉住。",
            "百晓生：这位公子是初来剑舞城吧。",
            "你:你怎么知道?",
            "百晓生：在剑舞城还没有我百晓生不知道的事,怎么样公子需要导游不?",
            "原来是导游,你轻轻一笑拿出一锭银两：&带路吧!",
        ],
        nextId: 14
    },
    14: {
        id: 14,
        title: "交易区",
        tips: "跟着百晓生了解交易区。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 17,
                address: "10001,0,1",
            },
        },
        receive: [
            "交易区玩家可以购买物品装备,拍卖行可以进行物品拍卖,若是运气好说不定可以拍出天价。",
            "30级前还可以找送财童子理财最高可获得5000%的回报。",
            "&继续",
        ],
        done: [
            "百晓生：交易区介绍完了,接下来便是住宅区。",
            "&住宅区",
        ],
        nextId: 15,
    },
    15: {
        id: 15,
        title: "住宅区",
        tips: "跟着百晓生了解住宅区。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 17,
                address: "10001,0,2",
            },
        },
        receive: [
            "住宅区玩家可以在这里加入帮会,庄园,队伍。",
            "若有钟意的道侣你还可以和他一起进入情缘之地缔结情缘。",
            "&继续",
        ],
        done: [
            "百晓生：住宅区介绍完了,接下来便是异界裂缝。",
            "&异界裂缝",
        ],
        nextId: 16,
    },
    16: {
        id: 16,
        title: "异界裂缝",
        tips: "跟着百晓生了解异界裂缝。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 17,
                address: "10001,0,3",
            },
        },
        receive: [
            "你可以通过异界裂缝进入极北深渊,极北深渊除了可以获得大量经验外,还可以获得大量积分兑换各种珍稀道具。",
            "若是你有仇人也可这里发布追杀令。",
            "&继续",
        ],
        done: [
            "你正跟着百晓生了解剑舞城,这时你收到一道急促传讯。",
            "传讯之人名为唐三彩,内容便是拎壶冲危,前往主城一见。",
            "&立即前往",
        ],
        nextId: 17,
    },
    17: {
        id: 17,
        title: "拎壶冲危机",
        tips: "拎壶冲似乎遇到了危险,赶紧去剑舞城(1,1)看看。",
        type: 2,
        reward: {
            attr: "exp-2000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 111,
                address: "10001,0,0",
            },
        },
        replace: true,
        receive: [
            "你来到传讯中的地址发现一名看起来有些年迈白发老者早已经在等你了,后者见到你后立即就迎了上来 。",
            "唐三彩：你就是${role_name}吧?",
            "你：正是晚辈,不拎壶冲那家伙出什么事?",
            "唐三彩：他中了狼毒了。",
            "你：&中毒!!!",
        ],
        done: [
            "随即你跟着唐三彩进入一间院子,只见此时拎壶冲正昏迷不醒的躺在床上。",
            "你：他什么时候中毒?",
            "唐三彩没有回答而是指了指拎壶冲屁股上的伤口,只见那伤口处流出来的血竟然是黑色的,你这才明白原来是在之前那妖族探子的暗器中有毒。",
            "你：前辈,有什么办法可以解毒?",
            "唐三彩：云荒大陆有一种名为灵异小妖,它们身上有一种灵异水的东西可以压制狼毒,只是那里三族强者众多,极为危险。",
            "你没有丝毫犹豫：&我这就去。",
        ],
        nextId: 18,
    },
    18: {
        id: 18,
        title: "惩戒孤魂",
        tips: "孤魂就在云荒大陆(1,2),快去帮小红教训它们一顿吧。",
        type: 1,
        reward: {
            attr: "exp-2500",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 112,
                address: "40000,0,0",
            },
        },
        complete: {
            freak: "2040-5"
        },
        tp: "40000,0,1",
        replace: true,
        receive: [
            "云荒大陆,浩瀚无边,一时间你也不知道去什么地方找灵异下妖,这时你在路边看到一个穿着红衣的少女!",
            "你当即上去问道：在下${role_name},请问这位姑娘可知道何处有灵异小妖?",
            "小红：知道,不过我为什么要告诉你?",
            "你：姑娘有什么要求可以提。",
            "小红：你这人倒是上道,附近最近来了不少孤魂打扰我睡觉,你先去帮我教训他们一顿。",
            "&教训孤魂",
        ],
        done: [
            "小红：哟,身手不错嘛,这么快就回来了。",
            "&继续?",
        ],
        nextId: 19,
    },
    19: {
        id: 19,
        title: "惩戒野鬼",
        tips: "野鬼就在云荒大陆(1,2),快去帮小红教训它们一顿吧。",
        type: 1,
        reward: {
            attr: "exp-3000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 112,
                address: "40000,0,0",
            },
        },
        complete: {
            freak: "2041-5"
        },
        tp: "40000,0,1",
        replace: true,
        receive: [
            "小红：还不错,不过孤魂虽然被你赶走了,周围还有不少野鬼也喜欢晚上鬼叫。",
            "你：&明白。",
        ],
        done: [
            "小红：终于清净了,不过我还不能告诉你灵异小妖的消息。",
            "你：&为何?",

        ],
        nextId: 20,
    },
    20: {
        id: 20,
        title: "惩戒皮皮猴",
        tips: "皮皮猴就在云荒大陆(1,3),先去警告它们。",
        type: 1,
        reward: {
            attr: "exp-3500",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 112,
                address: "40000,0,0",
            },
        },
        complete: {
            freak: "2042-5"
        },
        tp: "40000,0,2",
        receive: [
            "小红：这附近有一种叫皮皮猴的猴子,它们的耳朵极为敏锐,又喜欢散播谣言,这事若是被它们听去了必然会传到灵异小妖耳中。",
            "你：&那我先去警告它们!",
        ],
        done: [
            "小红：嘻嘻,终于有人能教训这群喜欢八卦的猴子了。",
            "你：......",
            "小红：现在我可以告诉你灵异小妖的下落了。",
            "&继续",
        ],
        nextId: 21,
    },
    21: {
        id: 21,
        title: "清理树妖",
        tips: "树妖就在云荒大陆(1,3),为了避免被它们偷袭最好先下手为强。",
        type: 1,
        reward: {
            attr: "exp-4000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 112,
                address: "40000,0,0",
            },
            tNpc: {
                id: 112,
                address: "40000,0,2",
            },
        },
        complete: {
            freak: "2044-5"
        },
        tp: "40000,0,2",
        receive: [
            "小红：灵异小妖就在云荒大陆(1,4),不过路上你要小心树妖,它们会隐藏在暗处攻击人,你最好先将它们处理了。",
            "你：&我去前面开路。",
        ],
        done: [
            "小红：这些树妖不知道伤了多少人,没想到竟然都栽在你手中了。",
            "你：树妖处理了,我们继续赶路吧。",
            "&继续",
        ],
        nextId: 22,
    },
    22: {
        id: 22,
        title: "收集灵异水",
        tips: "找到灵异小妖,赶紧收集灵异水去剑舞城找唐三彩。",
        type: 3,
        reward: {
            attr: "exp-4500",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 112,
                address: "40000,0,3",
            },
            tNpc: {
                id: 111,
                address: "10001,0,0",
            },
        },
        complete: {
            article: "312-2"
        },
        tp: "40000,0,3",
        receive: [
            "小红：咯,灵异小妖就在这里生活,我先走了。",
            "你：多谢姑娘了。",
            "&收集灵异水",
        ],
        done: [
            "唐三彩：你终于回来了,拎壶冲快不行了,你找到灵异水了?",
            "你：找到了,前辈这就是灵异水。",
            "&继续",
        ],
        nextId: 23,
    },
    23: {
        id: 23,
        title: "拎壶冲苏醒",
        tips: "拎壶冲醒了,快去找他聊聊吧。",
        type: 2,
        reward: {
            attr: "exp-5000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            }
        },
        receive: [
            "拎壶冲服下灵异水之后脸色瞬间好转,迷迷糊糊的醒了过来。",
            "你：怎么样,你这家伙没事了吧。",
            "拎壶冲：我没事了。",
            "&继续",
        ],
        done: [
            "拎壶冲随即拿出之前在黑风寨获得的藏宝图递给唐三彩。",
            "唐三彩：这是?",
            "拎壶冲：没错,上面记载了传说中的馒头的下落,唐前辈可否破解其中秘密。",
            "唐三彩：破解倒是没什么问题,不过我需要腾蛇血。",
            "你：&这腾蛇血要去什么地方找呢?"
        ],
        nextId: 24,
    },
    24: {
        id: 24,
        title: "破解藏宝图",
        tips: "前往大泽谷寻找腾蛇血破解藏宝图中的秘密。",
        type: 3,
        reward: {
            attr: "exp-5000",
            tael: 2000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            }
        },
        complete: {
            article: "2004-2"
        },
        tp: "10002,0,0",
        replace: true,
        receive: [
            "唐三彩：大泽谷中有一种名为大泽腾蛇的妖兽它们的血就可以,不过那里暗无天日,到处都是迷雾极为危险。",
            "拎壶冲：${role_name},恐怕还要麻烦你跑一趟了。",
            "你：&......",
        ],
        done: [
            "取到腾蛇血后你便回到剑舞城,唐三彩手指沾了几点血,在藏宝图上画了几道符文。",
            "只见藏宝图上浮现出一道道奇异的纹路,最终仿佛形成了一片无边无际的大海。",
            "拎壶冲：这是传说中的无妄海!",
            "你：&那还等什么,我们现在就去无妄海找宝藏吧。",
        ],
        nextId: 25,
    },
    25: {
        id: 25,
        title: "准备前往无妄海",
        tips: "去大泽谷找传说中的人族神匠提升实力。",
        type: 2,
        reward: {
            attr: "exp-5000",
            tael: 2000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            },
            tNpc: {
                id: 16,
                address: "10002,1,0",
            },
        },
        replace: true,
        receive: [
            "拎壶冲：还不行。",
            "你：为什么?",
            "拎壶冲：无妄海到处都是实力恐怖的死灵,以你现在的修为绝对是寸步难行。",
            "你：......",
            "唐三彩这时拿着一枚玉牌走过来：这个简单,你拿着此物去大泽谷找欧冶子。",
            "拎壶冲：难道欧冶子大师隐居在大泽谷。",
            "唐三彩点了点头：没错。",
            "拎壶冲：如此${role_name}你便先去大泽谷历练一番吧,正好我也需要准备一下。",
            "你：&行吧。",
        ],
        done: [
            "你再度来到大泽谷玉牌便自动漂浮出来,顺着指引你一路穿过各种迷雾最终来到一处茅草屋外,不过此处却是空无一人。",
            "小家伙你来这里做什么?",
            "这时一道声音传来,你转身看去只见一个粗狂的布衣汉子正在你身后。",
            "你：&晚辈${role_name},前辈可是欧冶子大师。",
        ],
        nextId: 26,
    },
    26: {
        id: 26,
        title: "欧冶子的考验(一)",
        tips: "前往大泽谷击杀金甲鳄鱼,完成欧冶子的考验。",
        type: 1,
        reward: {
            attr: "exp-5000",
            tael: 2000,
            article: "106-5,110-5,114-5",
        },
        grand: {
            npc: {
                id: 16,
                address: "10002,1,0",
            }
        },
        complete: {
            freak: "2005-8"
        },
        tp: '10002,0,1',
        receive: [
            "欧冶子目光落在玉牌上：是唐三彩那个老不死的让你来的?",
            "听到这话你微微一笑：晚辈准备前往无妄海,来此便是请前辈指点。",
            "欧冶子：原来如此,你先去打几条鱼来给我解解馋吧。",
            "你：&前辈稍等",
        ],
        done: [
            "欧冶子：哟,小伙子效率不错,这些是老夫的收藏就先送你。",
            "你：这是?",
            "欧冶子：你身上的装备都能用这些石头进行锻造从而获得大量的属性,如果你没有石头也可以用老夫门口的炼器炉精炼,不过精炼失败会损坏装备。",
            "你：&多谢前辈指点。",
        ],
        nextId: 27,
    },
    27: {
        id: 27,
        title: "欧冶子的考验(二)",
        tips: "前往大泽谷击杀黑白圣熊,完成欧冶子的考验。",
        type: 1,
        reward: {
            attr: "exp-6000",
            article: "106-5,110-5,114-5",
        },
        grand: {
            npc: {
                id: 16,
                address: "10002,1,0",
            }
        },
        complete: {
            freak: "2006-8"
        },
        tp: '10002,0,2',
        receive: [
            "欧冶子：老夫说的有些嘴干了,先去把煮鱼了。",
            "一阵狂吃后,欧冶子拍了拍圆滚滚的肚子道:吃了个半饱,你在去帮我打几头熊来尝尝。",
            "你：&(这是真能吃啊)",
        ],
        done: [
            "欧冶子：嗯,不错不错,老夫还有一些珍藏送你了。",
            "只见欧冶子又拿出一堆锻造石头给你,你见此眼睛瞬间放光,经过这些石头锻造的装备确实有了大幅度提升。",
            "你：&嘿嘿,欧冶子前辈要不多给一点"
        ],
        nextId: 28,
    },
    28: {
        id: 28,
        title: "欧冶子的考验(三)",
        tips: "前往大泽谷击杀大地圣熊,完成欧冶子的考验。",
        type: 1,
        reward: {
            attr: "exp-7000",
            article: "106-5,110-5,114-5",
        },
        grand: {
            npc: {
                id: 16,
                address: "10002,1,0",
            }
        },
        complete: {
            freak: "2007-8"
        },
        tp: '10002,0,2',
        receive: [
            "当即欧冶子就一脸抠搜搜的道：滚滚滚,老头子就这点家底了,不过我可以告诉你如何获得这些石头。",
            "你眼睛一亮：请前辈指教。",
            "欧冶子嘿嘿一笑：大泽谷中有一种名为大地圣熊的妖兽,老夫还没尝过。",
            "你会心一笑：&前辈稍等",
        ],
        done: [
            "望着你抬回来的几百斤重的大地圣熊,欧冶子砸了砸嘴：小伙子,很有前途。",
            "你轻轻一笑：前辈喜欢就好。",
            "欧冶子：你杀了这么多妖兽应该爆了不少装备吧,你可以用炼器炉将他们精炼到10级,这样就可以分解出石头了。",
            "你：&原来如此"
        ],
        nextId: 29,
    },
    29: {
        id: 29,
        title: "欧冶子的考验(四)",
        tips: "前往大泽谷击杀沼泽魔蟹,完成欧冶子的考验。",
        type: 1,
        reward: {
            attr: "exp-7000",
            article: "106-10,110-10,114-10",
        },
        grand: {
            npc: {
                id: 16,
                address: "10002,1,0",
            }
        },
        complete: {
            freak: "2008-8"
        },
        tp: '10002,0,3',
        receive: [
            "数日之后,你正在炼器炉精炼装备。",
            "欧冶子：小家伙,你来大泽谷也有一阵时间,今日老夫便看看你最近的收获。",
            "你：不知前辈有何吩咐?",
            "欧冶子嘿嘿一笑：大泽谷深处的有一种名为沼泽魔蟹的妖兽,正好让你试试身上。",
            "你自信一笑：&收到",
        ],
        done: [
            "咦,小子,我只是让你去历练,你怎么还把它们带回来啊!",
            "你将巨大的沼泽魔蟹带回茅草屋,欧冶子立马就双眼放光,不过脸上却是装出一副意外的摸样。",
            "见此你轻轻一笑：哦,原来前辈真的是让我去历练啊,那我把它们扔回去。",
            "欧冶子立马就急了：别别别,你都带回来了,扔了多可惜,老夫就凑合着吃了。",
            "&继续"
        ],
        nextId: 30,
    },
    30: {
        id: 30,
        title: "欧冶子的考验(终)",
        tips: "前往大泽谷击杀沼泽巨蟒,完成前往无妄海最后的准备。",
        type: 1,
        reward: {
            attr: "exp-50000",
            tael: 20000,
            yuanbao: 200,
            article: "3-100,4-100,106-10,110-10,114-10",
        },
        grand: {
            npc: {
                id: 16,
                address: "10002,1,0",
            }
        },
        complete: {
            freak: "2009-8"
        },
        tp: '10002,0,3',
        receive: [
            "数日后,一道传讯出现,正是拎壶冲的信息。",
            "你看了眼身上的装备都锻造的差不多了,不过首饰却不怎么样,前些日听到欧冶子前辈提起过大泽谷的沼泽魔莽似乎会掉落首饰。",
            "&前往大泽谷(1,4)",
        ],
        done: [
            "你将近百米长的巨蟒抬到茅草屋,正巧欧冶子悠闲的在院子中躺着。",
            "你上前拱手道：欧冶子前辈,晚辈准备离开了,这些日多谢前辈的指点。",
            "欧冶子笑着拿出一堆东西道：小家伙不错,不过无妄海危险无比,老头子我也没什么可再教你的,这些算是我给你最后的帮助。",
            "你：&多谢前辈,晚辈告辞。",
        ],
        nextId: 31,
    },
    31: {
        id: 31,
        title: "汇合",
        tips: "一切准备就绪,前往剑舞城与拎壶冲汇合。",
        type: 2,
        reward: {
            attr: "exp-10000",
            tael: 2000,
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            }
        },
        receive: [
            "从大泽谷回到剑舞城,此时拎壶冲正在等你,见到你后立即就迎了上来。",
            "拎壶冲靠近你的瞬间就感觉到了一股强大的威压,当即就愣住了：你这家伙如今究竟变得多强了!",
            "你轻轻一笑也不知道自身修为究竟达到了什么地步,只知道当初与拎壶冲联手拼了命才击败的大当家现在的你一招可败。",
            "&继续",
        ],
        done: [
            "你：对了,我们现在是不是可以前往无妄海了。",
            "拎壶冲：当然了,不过为了不生变故,还需要准备一下。",
            "说着就见拎壶冲手中出现三四一模一样的张藏宝图。",
            "你一愣：&这是?",
        ],
        nextId: 32,
    },
    32: {
        id: 32,
        title: "伪造藏宝图",
        tips: "前往云荒大陆赤炎蛛丝伪造藏宝图分散妖族与仙族的注意。",
        type: 3,
        reward: {
            attr: "exp-10000",
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,0",
            }
        },
        complete: {
            article: "314-4"
        },
        tp: "40000,0,3",
        receive: [
            "拎壶冲：这些日子我发现已经有不少妖族与仙族的探子潜入剑舞城,我们怕是很难甩开他们直接去无妄海。",
            "你恍然大悟：所以这些都是你伪造的藏宝图,想要用它们来欺骗仙族与妖族。",
            "拎壶冲：聪明,不过这藏宝图要想达到以假乱真的效果,还差最后的一种材料赤炎蛛丝,暂时不知去什么地方找来。",
            "你突然想起云荒大陆的赤炎蜘蛛,当即开口道：&等我回来。",
        ],
        done: [
            "回到剑舞城,你将赤炎蛛丝交给拎壶冲与唐三彩,在两人一阵操作下蛛丝嵌入藏宝图中勾勒出一道道纹路。",
            "看着这些藏宝图被伪造到与真的一模一样,你不由得砸了砸嘴。",
            "拎壶冲：走吧,我俩去城里逛几圈。",
            "你轻轻一笑：&送藏宝图去咯!",
        ],
        nextId: 33,
    },
    33: {
        id: 33,
        title: "仙族探子",
        tips: "将伪造的藏宝图送给隐藏在剑舞城的仙族探子。",
        type: 2,
        reward: {
            attr: "exp-10000",
            tael: 1000,
        },
        grand: {
            npc: {
                id: 120,
                address: "10001,0,1",
            }
        },
        receive: [
            "你与拎壶冲走在路上,突然一个人直接朝你们撞了过来。",
            "拎壶冲怒骂道：哎哟,你是不是眼瞎了,看不到人?",
            "仙族探子：对不起,对不起,这是赔偿给你们的!",
            "&继续",
        ],
        done: [
            "只见仙族探子赔了银子,道完歉后就急匆匆的的离开。",
            "看着手中白花花的银子你与拎壶冲相视一笑,没想到送个假藏宝图还有意外收获。",
            "&继续",
        ],
        nextId: 34,
    },
    34: {
        id: 34,
        title: "妖族探子",
        tips: "将伪造的藏宝图送给隐藏在剑舞城的妖族探子。",
        type: 2,
        reward: {
            attr: "exp-10000",
        },
        grand: {
            npc: {
                id: 119,
                address: "10001,0,1",
            }
        },
        receive: [
            "你与拎壶冲换了个方向闲逛,突然又一个人直接朝你们撞了过来。",
            "拎壶冲被直接撞到在地当即怒骂道：哎哟,老子今天倒大霉了。",
            "&继续",
        ],
        done: [
            "不过妖族探子却没有理会拎壶冲的谩骂,瞬间就消失的无影无踪。",
            "拎壶冲：......",
            "你：......",
            "&继续",
        ],
        nextId: 35,
    },
    35: {
        id: 35,
        title: "前往无妄海",
        tips: "一切准备就绪,前往无妄海与拎壶冲汇合。",
        type: 2,
        reward: {
            attr: "exp-10000",
        },
        grand: {
            npc: {
                id: 10,
                address: "10001,0,1",
            },
            tNpc: {
                id: 10,
                address: "40001,0,0",
            }
        },
        receive: [
            "拎壶冲：好了,伪造的藏宝图已经送出去了,妖族与仙族估计接下来估计要想办法破解其中秘密。",
            "你：终于可以前往无妄海了。",
            "拎壶冲：虽然现在妖族与仙族目光没有全部在我们身上,不过为了谨慎起见我们还是分开行动,我先去无妄海等你。",
            "你：&好。",
        ],
        done: [
            "拎壶冲：你终于来了,无妄海这边出事了。",
            "你：&又出什么问题了?",
        ],
        nextId: 36,
    },
}

