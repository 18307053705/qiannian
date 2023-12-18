const scene_list = {
    100: {
        title: "序章",
        tips: "灰色古籍就在仙隐村(1,1)，翻开看看吧。",
        receive: [
            "我穿越了千年,在无尽的岁月长河中沉睡,最终忘却了一切,只为重回千年前……",
            "神秘声音：醒醒,快点醒醒!",
            "一道犹如风铃般的声音将你从沉睡中唤醒,你睁开眼发现面前是一卷灰色古籍。",
            "&翻开灰色古籍",
        ],
        done: [
            "古籍中记载了一段千年前的隐秘......",
            "千年前一位名为东坡先生的大能制作出四个馒头，分别献给了人，仙，妖三族族长。",
            "三族族长吃下馒头后实力暴涨，心中皆是衍生出称霸三族的念头。",
            "不过三族族长都吃过馒头，实力不相上下，于是都想将最后一个馒头占为己有，一场惊世大战因此爆发。",
            "神秘声音：&醒醒，快点醒醒！",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1010,
                address: "10000,0,0"
            },
        },
        nextId: 101
    },
    101: {
        title: "初识狐晶丽",
        tips: "神秘少女就在仙隐村(1,1)，去和她聊聊。",
        replace: true,
        receive: [
            "你再度睁开眼这才发现自己正躺在一棵古树下，身前则是一个看起来像是狐族的少女。",
            "少女见你醒后：你终于醒了，我们赶紧动身吧!",
            "你明明记得自己是被车撞了，此时应该是躺在医院才对，当即就是灵魂三问：&你是谁，这是什么地方，我们要去干什么？",
        ],
        done: [
            "少女：我叫狐晶丽，这里是仙隐村，现在要去剿灭黑风寨。",
            "你一句都没听懂，这时已经被少女拉到了村外，一群彪形大汉在此处来会巡逻。",
            "狐晶丽直接将你推了出去：&上吧，{name}!",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
            npc: {
                id: 101,
                address: "10000,0,1"
            },
        },
        nextId: 102
    },
    102: {
        title: "天选者",
        tips: "巡逻山贼就在仙隐村(1,2)，赶紧过去惩戒他们。",
        receive: [
            "你被少女不讲武德的推到一群彪形大汉面前，刚要开口解释巡逻山贼便面露凶意朝你聚了过来!",
            "巡逻山贼：什么人，兄弟们杀了他!",
            "你：&......",
        ],
        done: [
            "你艰难的打倒了几个巡逻山贼，打斗的动静就引来了更多山贼，你二话不说，拔腿就跑。",
            "胡晶丽气喘吁吁的追了上来：你不是天选者嘛，怎么这么弱？",
            "你：天选者是什么？",
            "这时身后密密麻麻的山贼已经追了过来，狐晶丽吓得脸色一白：算了，我们先回村子再说。",
            "&仙隐村",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,1"
            },
        },
        complete: {
            freak: "2000-2"
        },
        nextId: 103
    },
    103: {
        title: "全身武装",
        tips: "破旧宝箱就在仙隐村(1,1)，挑一个打开吧。",
        receive: [
            "终于你与狐晶丽成功甩开山贼回到了村子，这才开口问道：你刚刚说的天选者是什么？",
            "胡晶丽：我也不太清楚，好像是与数千年的那场三族大战有关。",
            "你微微一愣，莫非是那灰色古籍中记载为了三族族长为了争夺馒头而爆发的大战。",
            "正要开口询问狐晶丽不知道从什么地方拿出一堆破旧的箱子：放的时间有些久了，我也忘记那个箱子里面有装备，你随便挑一个吧。",
        ],
        done: [
            "你随便找了个宝箱打开，只见里面竟然有一套崭新的装备。",
            "狐晶丽&：不愧是天选者，这运气真不错。",
        ],
        action: {
            type: 1,
            text: '破旧宝箱'
        },
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
        },
        nextId: 104
    },
    104: {
        title: "惩戒持刀山贼",
        tips: "持刀山贼就在仙隐村(1,2)，赶紧过去惩戒他们。",
        receive: [
            "你刚刚换上装备就见村外有几道手持大刀的山贼，显然是他们一路找过来。",
            "狐晶丽：不好，他们竟然这么快就找来了。",
            "你信心十足：&别怕，我去收拾他们。",
        ],
        done: [
            "持刀山贼完全不是你的对手，几个回合就被你打的落荒而逃。",
            "狐晶丽：你怎么把他们放走了。",
            "你：&有什么问题？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
        },
        complete: {
            freak: "2001-2"
        },
        nextId: 105
    },
    105: {
        title: "击杀持斧山贼",
        tips: "持斧山贼就在仙隐村(1,3)，赶紧过去击杀他们。",
        receive: [
            "狐晶丽：这些可是山贼，你把他们放了，他们肯定还会找人来。",
            "说完就见之前的山贼带着一群拿着斧头的山贼又找上门来。",
            "&迎战。",
        ],
        done: [
            "这次你听了狐晶丽的话，几个回合后，这群山贼全部被你击杀。",
            "不过最后一个山贼死前放出了一道烟花在天空炸开。",
            "狐晶丽：&不好，是信号弹!",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
        },
        complete: {
            freak: "2002-2"
        },
        nextId: 106
    },
    106: {
        title: "突出重围",
        tips: "精英山贼就在仙隐村(1,3)，赶紧冲出重围吧。",
        receive: [
            "信号弹一出，你也意识到事情不妙，正准备带着狐晶丽离开，迎面而来的便是几个明显实力不凡的精英山贼。",
            "此时还有远远不断的山贼四面八方的朝村子聚拢。",
            "狐晶丽：完了，完了，被包围了。",
            "&杀出重围。",
        ],
        done: [
            "危机时刻你爆发出强大的力量，护着狐晶丽竟然硬生生的杀出了重围。",
            "狐晶丽重重的送了一口气：呼，终于逃出来了。",
            "你：还不能放松，那群山贼肯定还在找我们。",
            "狐晶丽：啊，那怎么办？",
            "你：&直捣黄龙。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
        },
        complete: {
            freak: "2003-2"
        },
        nextId: 107
    },
    107: {
        title: "偷袭二当家",
        tips: "二当家就在仙隐村(1,4)，趁机出手袭击他吧。",
        replace: true,
        receive: [
            "你带着狐晶丽一路悄悄的潜入了黑风寨，果然这里的防守弱了很多。",
            "一个身材魁梧脸上还一道刀疤的大汉正在大厅里正在威逼几个刚刚抓来的女子与他玩乐。",
            "狐晶丽立即小心提醒：这是黑风寨二当家，实力非常强。",
            "于是你决定：&袭击。",
        ],
        done: [
            "你不讲武德的偷袭非常顺利，二当家到死都没反应过来头颅便直接落地。",
            "狐晶丽：{name}，你太棒了。",
            "一众女子吓得惊叫：啊！",
            "你：&不好。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,0"
            },
            tNpc: {
                id: 101,
                address: "10000,0,3"
            },
        },
        complete: {
            freak: "2004-1"
        },
        nextId: 108
    },
    108: {
        title: "迎战大当家",
        tips: "大当家就在仙隐村(1,4)，赶紧出招迎战吧。",
        receive: [
            "果然这群女子的尖叫立即引来的黑风寨大当家，见到有人潜入黑风寨还杀了二当家立即大怒。",
            "大当家举着一柄寒光凛凛的大刀朝你冲了、过来：小子，给我死。",
            "&迎战大当家。",
        ],
        done: [
            "你与大当家大战了几个回合后终于将其斩杀，突然一道暗器从黑风寨外飞进来目标正是你。",
            "狐晶丽飞身一跃挡在你前面：小心暗器。",
            "你大惊连忙就追出去，可是偷袭之人不见踪影了。",
            "&查看狐晶丽伤势。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,3"
            },
        },
        complete: {
            freak: "2005-1"
        },
        nextId: 109
    },
    109: {
        title: "暗器有毒",
        tips: "狐晶丽替你挡住了暗器，赶紧查看她的伤势吧。",
        receive: [
            "狐晶丽惨叫：屁股，我的屁股。",
            "你一看发现那暗器就扎在狐晶丽屁股上，此时已经是一片有些发黑的血。",
            "你脸色一变：&不好，这暗器有毒。",
        ],
        done: [
            "狐晶丽一脸惊慌：啊，那怎么办，我不会要死了吧，呜呜呜，我还没成亲呢。",
            "你：&放心，我不会让你有事的",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,3"
            },
        },
        nextId: 1010
    },
    1010: {
        title: "收集蛇胆",
        tips: "斑斓蛇就在仙隐村(1,5)，快去收集蛇胆压制毒性。",
        receive: [
            "这时之前那群女子中走出来一人：这是断魂散。",
            "你：那姑娘可知道有什么办法可以解毒。",
            "小蝶：目前没有办法，不过这后山有中名为斑斓蛇的妖兽，它的蛇胆可以暂时压制毒性不蔓延。",
            "你：&我这就去取来。",
        ],
        done: [
            "你取到蛇胆回到黑风寨时狐晶丽已经昏过去了，气色惨白随时都可能见阎王的模样。",
            "小蝶接过蛇胆看了你一眼：你可以出去了。",
            "你：为什么？",
            "小蝶指了指狐晶丽伤口的部位，你这才反应过来，老脸一红连忙走了出去。",
            "&继续",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,3"
            },
        },
        complete: {
            article: "200-2"
        },
        nextId: 1011
    },
    1011: {
        title: "驱赶四眼老鹰",
        tips: "四眼老鹰就在仙隐村(1,5)，赶紧将它们击退吧。",
        receive: [
            "离开黑风寨大厅后，你立即就察觉到头顶有一道道强烈的敌意。",
            "抬头看去，只见空中一群四只眼睛的老鹰似乎是被斑斓蛇胆吸引，直接朝黑风寨大厅扑来。",
            "&驱赶四眼老鹰。",
        ],
        done: [
            "四眼老鹰极为难缠，不过在你击杀几只四眼老鹰后其余鹰群也都四散逃了。",
            "这时大厅内传来小蝶的声音：好了，你可以进来了。",
            "回到大厅时你发现狐晶丽气色好了很多，连忙道谢：多谢姑娘了相救。",
            "小蝶：你叫我小碟就好了，我还得谢谢你杀了这群该死的山贼。",
            "你：&小蝶，狐晶丽现在怎么样了？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10000,0,3"
            },
        },
        complete: {
            freak: "2006-2"
        },
        nextId: 1012
    },
    1012: {
        title: "前往不夜城",
        tips: "带着狐晶丽去不夜城(1,1)找小蝶爷爷。",
        receive: [
            "小蝶摇了摇头：我只能在暂时压制这毒，要彻底解决只能去找我爷爷。",
            "你追问：你爷爷是？",
            "小蝶俏皮一笑：你跟我来就知道了。",
            "&前往不夜城。",
        ],
        done: [
            "几日后你与小碟就来到一座几位繁华的城池，来往的过客有人族，妖族，仙族可谓是鱼龙混杂。",
            "不过你却感觉到这里的人身上都有一股煞气，眉头微皱：这是什么地方？",
            "小蝶：这里就是我家，我带你去找我爷爷。",
            "&跟上小蝶",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1011,
                address: "10000,0,3"
            },
            npc: {
                id: 1011,
                address: "20002,0,0"
            },
        },
        nextId: 1013
    },
    1013: {
        title: "教训流氓",
        tips: "流氓就在不夜城(1,1),狠狠的教训他们。",
        receive: [
            "你随小蝶刚到城门口就被一群面相猥琐的大汉围住来。",
            "流氓：哟，哪来的漂亮姑娘，给爷笑一个！",
            "你：&......",
        ],
        done: [
            "毫无疑问这一群流氓被你直接胖揍了一顿。",
            "小蝶：嘻嘻，这群流氓我早想教训他们了。",
            "你：&我们赶紧进城吧。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1011,
                address: "10000,0,3"
            },
            npc: {
                id: 1011,
                address: "20002,0,0"
            },
        },
        complete: {
            freak: "2028-4"
        },
        nextId: 1014
    },
    1014: {
        title: "鬼医居所",
        tips: "鬼医就住在不夜城(2,1),跟着小蝶一起去见鬼医吧。",
        replace: true,
        receive: [
            "进入城池中后小蝶便带着你进入一件院子，只见院子中一个老者正在来回踱步。",
            "小蝶直接冲了过去：爷爷，我回来了！",
            "鬼医：丫头啊，你终于回来了，你可把我急死了！",
            "小蝶假装摸了摸眼泪：呜呜，爷爷，你是不知道我被黑风寨的山贼抓了，差点就回不来了！",
            "鬼医大怒：&什么，爷爷这就去灭了黑风寨！",
        ],
        done: [
            "小蝶连忙指着你：爷爷黑风寨已经被{name}灭了，狐晶丽姐姐因此受重伤你快救救她吧。",
            "说完小蝶便朝你使了个眼色，你连忙抱着狐晶丽上前：晚辈朋友中了断魂散，还请前辈出手。",
            "鬼医只是简单的看了一眼狐晶丽淡淡道：还真是断魂散，不过我为什么要救她。",
            "你：&？？？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1011,
                address: "20002,1,0"
            },
        },
        nextId: 1015
    },
    1015: {
        title: "救人条件",
        tips: "鬼医就住在不夜城(2,1),快去和他聊一聊吧。",
        receive: [
            "小蝶连忙摸了摸眼泪：爷爷，狐晶丽姐姐是为了救我才受伤的。",
            "鬼医：哼，死丫头，你以为我看不出来你这小伎俩。",
            "你：&......",
        ],
        done: [
            "你也看出来了小蝶爷爷性情古怪：不知前辈需要晚辈做什么？。",
            "鬼医抚须一笑：小辈还算上道，要我救人你必须答应我三件事。",
            "你：&前辈请讲。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1012,
                address: "20002,1,0"
            },
        },
        nextId: 1016
    },
    1016: {
        title: "教训瘪三",
        tips: "瘪三就在不夜城(1,1),狠狠的教训他们一顿。",
        receive: [
            "这时小蝶又古灵精怪的凑过来：爷爷，我刚刚进城的时候有一群瘪三竟然骚扰我，你可要帮我作主。",
            "毫无疑问小蝶这是怕自己爷爷为难你才故意这样说的。",
            "这点小心思鬼医自然也看得出来，无奈的宠溺道：行，爷爷替你做主。",
            "你：&小蝶姑娘稍等。",
        ],
        done: [
            "教训了一顿瘪三后你重新回到鬼医居所。",
            "鬼医：小子，效率还不错。",
            "你轻轻一下：&不知前辈还需让我做什么？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1012,
                address: "20002,1,0"
            },
        },
        complete: {
            freak: "2029-4"
        },
        nextId: 1017
    },
    1017: {
        title: "混乱的城东",
        tips: "城东一片混乱到处都是刀尖舔血的亡命之徒。",
        replace: true,
        receive: [
            "这时小蝶还想继续放水，不过鬼医却不给机会：在城东有一群亡命恶徒，你去把他们杀了。",
            "小蝶一惊：{name}你千万不能去，那些人都是在外面杀人无数逃到不夜城的恶徒。",
            "鬼医则是一脸打趣的盯着你，见此你对小蝶轻轻一笑：&无妨，我去去就来。",
        ],
        done: [
            "一路来到城东，你发现无数道贪婪的目光落在你的身上。",
            "你轻叹：还不夜城还真是一个不法之地。",
            "终于你走到一处阴暗的巷子中，里面正是一群亡命恶徒。",
            "&进入巷子。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1012,
                address: "20002,1,0"
            },
            tNpc: {
                id: 1013,
                address: "20002,0,1"
            },
        },
        nextId: 1018
    },
    1018: {
        title: "击杀亡命恶徒",
        tips: "丧尽天良的亡命恶徒就在不夜城(1,2),快去击杀他们吧。",
        receive: [
            "你进入巷子见到里面的景象后立马呆住了。",
            "巷子内一群亡命恶徒肆无忌惮的玩弄着一个衣衫破烂女子，女子的眼神已经没有半点光彩。",
            "你怒火中烧：&该杀。",
        ],
        done: [
            "你一身血衣的从巷子中离开，满身血气回到居所时小蝶和鬼医都惊呆了。",
            "鬼医：小子，你这是杀了多少人？",
            "巷子中的事只是一段插曲你并不想多说，当务之急是救狐晶丽：&前辈可以说下件事了。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1013,
                address: "20002,0,1"
            },
            tNpc: {
                id: 1012,
                address: "20002,1,0"
            },
        },
        complete: {
            freak: "20210-4"
        },
        nextId: 1019
    },
    1019: {
        title: "击杀亡命狂徒",
        tips: "丧尽天良的亡命狂徒就在不夜城(1,2),快去击杀他们吧。",
        replace: true,
        receive: [
            "鬼医：在城东还一群人亡命徒，你去把他们也收拾了吧。",
            "&前往城东。",
        ],
        done: [
            "半日后，整个不夜城都知道从外面来了一尊杀神，一人一剑将城东的亡命徒全部屠戮殆尽。",
            "你再度回到鬼医居所时一道熟悉的身影直接冲到了你面前：{name}，你没受伤吧？",
            "见到醒来的狐晶丽，你顿时大喜：我没事，鬼医前辈与小蝶呢？。",
            "狐晶丽这才拿出一封书信递给你：",
            "&接过书信",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1012,
                address: "20002,1,0"
            },
            tNpc: {
                id: 101,
                address: "20002,1,0"
            },
        },
        complete: {
            freak: "20211-4"
        },
        nextId: 1020
    },
    1020: {
        title: "小蝶的留信",
        tips: "青鲤鱼就在不夜城(1,3)，去抓几条回来吧。",
        replace: true,
        receive: [
            "{name},狐晶丽姐姐已经没事了，不过她身体还很虚弱，还需要静养一阵子。",
            "哦，我和爷爷外出游历了，嘻嘻，那间房子是我求爷爷特意就留给你和狐晶丽姐姐静养哟。",
            "随手放下书信你轻轻一笑，这丫头还真是小孩子心性。",
            "这时你想起刚来不夜城时经过的河里似乎有鱼，当即对狐晶丽道：&我出去一趟。",
        ],
        done: [
            "河里的青鲤鱼极为灵活，你费了好大功夫终于是抓到了几条。",
            "你提着几条青鲤鱼一路小跑回鬼医居所：狐晶丽，我们今天有鱼汤喝了。",
            "狐晶丽：&嘻嘻。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,1,0"
            }
        },
        complete: {
            freak: "20212-4"
        },
        nextId: 1021
    },
    1021: {
        title: "偷鱼的贼",
        tips: "河藤葵就在不夜城(1,3)，快去惩戒它们一番。",
        receive: [
            "这天你依旧在河里抓青鲤鱼，狐晶丽则是在岸上呱呱叫：你脚下有一条，你背后也有一条，哎呀，你怎么一条都没抓住。",
            "你听着狐晶丽在岸上一阵瞎指挥，若不是考虑到她是个病号你都想把她扔进河里。",
            "这时狐晶丽突然竹篮怪叫一声：哎呀，我们抓的鱼不见了。",
            "你朝竹篮里看去果然抓到鱼一条都不见了，这时你才注意到几条藤蔓正裹着你的鱼悄悄逃去。",
            "你：&我去，敢偷我的鱼。",
        ],
        done: [
            "你狠狠的教训了这群偷鱼贼，然后在狐晶丽的负面指挥下一直抓到下午太阳快落山了才回到鬼医居。",
            "&继续。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,0,2"
            }
        },
        complete: {
            freak: "20213-4"
        },
        nextId: 1022
    },
    1022: {
        title: "神秘刺客",
        tips: "神秘刺客就在不夜城(1,4)，这次一定要将他们擒住。",
        receive: [
            "一转眼数个月过去，你与狐晶丽一如即往抓了几条鱼便准备回去。",
            "突然几十道暗器朝你飞了过来，数月时间你的修为突飞猛进直接将狐晶丽挡在身后，一挥衣袖将暗器全部击落。",
            "下一秒无数穿着黑色夜行衣的刺客将你们围了起来。",
            "&擒拿刺客。",
        ],
        done: [
            "你看出这些暗器与当初在黑风寨伤狐晶丽的暗器一模一样，立即决定将这些刺客抓起来。",
            "这些刺客的实力也非常不凡，为了活抓你也花费了不少时间。",
            "&审问刺客。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,0,2"
            }
        },
        complete: {
            freak: "20214-4"
        },
        nextId: 1023
    },
    1023: {
        title: "审问刺客",
        tips: "狐晶丽就在不夜城(1,4),快去问问她黑炎宗的消息吧。",
        receive: [
            "经过你的审问才知道这些刺客是黑炎宗的弟子，只是你很疑惑自己何时招惹过这个宗门要几次暗杀。",
            "狐晶丽大惊：怎么会是黑炎宗！",
            "你：&你知道黑炎宗？",
        ],
        done: [
            "狐晶丽：这黑炎宗是抵御魔族的九大宗门之一。",
            "你：魔族又是啥？",
            "狐晶丽：这我也不清楚，只知道与数千年前人，仙，妖三族大战有关。",
            "你眉头一皱：&又与三族大战牵扯上？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,0,3"
            },
        },
        nextId: 1024
    },
    1024: {
        title: "黑炎宗来袭",
        tips: "黑炎宗弟子就在不夜城(1,4),快去见他们击退吧。",
        receive: [
            "你与狐晶丽正说到这里，突然周围出现一群浑身杀气的黑衣人。",
            "狐晶丽大惊：小心，他们黑炎宗弟子。",
            "&迎战黑炎宗弟子",
        ],
        done: [
            "终于你将这群黑炎宗弟子全部击退，很快又是一群黑炎宗的弟子四面八方追了过来。",
            "你连忙拉起狐晶丽：&快跑！",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,0,3"
            },
        },
        complete: {
            freak: "20214-4"
        },
        nextId: 1025
    },
    1025: {
        title: "黑炎宗来袭",
        tips: "黑炎宗弟子就在不夜城(1,4),快去见他们击退吧。",
        receive: [
            "你与狐晶丽一路灰溜溜点逃回鬼医居所。",
            "狐晶丽：这黑炎宗绝对有阴谋。",
            "你点了点头：没错，不过我们还是赶紧离开吧，这里恐怕也不安全。",
            "狐晶丽摇了摇头：不行，我们不能就这样离开。",
            "你一愣：&难道你准备找黑炎宗的阴谋？",
        ],
        done: [
            "狐晶丽点了点头，从怀里拿出一枚碧绿的玉佩：{name}，你带着玉佩去云荒大陆找一个叫拎壶冲的家伙。",
            "你接过玉佩：你呢？",
            "狐晶丽：我留在这里等你回来，顺便打听一下黑炎宗的消息。",
            "你：&那你小心！",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "20002,1,0"
            },
        },
        nextId: 1026
    },
    1026: {
        title: "奇怪的女孩",
        tips: "你在云荒大陆(1,1)遇到了一个奇怪的红衣小女孩。",
        receive: [
            "你来到云荒大陆看到路边有个红衣小女孩不知道在干嘛。",
            "你：小妹妹，你这是在干嘛？",
            "小红疑惑：？？？",
            "你：小妹妹，你认识一个叫拎壶冲的人？",
            "小红疑惑：？？？",
            "你：&？？？",
        ],
        done: [
            "你感觉这个小女孩可能不会说话，便准备离开。",
            "小红：你来找拎壶冲的？",
            "你一脸惊喜：你认识他？",
            "小红摇头：不认识！",
            "你：&......",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
        },
        nextId: 1027
    },
    1027: {
        title: "惩戒孤魂",
        tips: "孤魂就在云荒大陆(1,2)，快去惩戒它们一番吧。",
        receive: [
            "你转身就要离开，小红连忙就拉住你：不过，我知道他在哪里？",
            "你一愣：你都不认识他，怎么会知道他在什么地方？",
            "小红：附近来了不少孤魂晚上叫的我睡觉都不安宁,你先去帮我教训他们一顿。",
            "你：&行，等着。",
        ],
        done: [
            "小红：哟，身手不错嘛，这么快就回来了。",
            "你：说正事。",
            "小红：我虽然不认识什么拎壶冲，但是却曾经路过一个地方听说过他。",
            "你追问：&什么地方？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
        },
        complete: {
            freak: "2040-6"
        },
        nextId: 1028
    },
    1028: {
        title: "惩戒野鬼",
        tips: "野鬼就在云荒大陆(1,2)，快去惩戒它们一番吧。",
        receive: [
            "小红话题一转：孤魂虽然被你赶走了,但是周围还有不少野鬼也喜欢晚上鬼叫。",
            "你：&稍等。",
        ],
        done: [
            "你将野鬼赶走后，小红：嘻嘻，终于清净了。",
            "小红：我在酒肆的时候听到有人叫一个醉酒的青年拎壶冲。",
            "你：&酒肆的位置，需要我干什么？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
        },
        complete: {
            freak: "2041-6"
        },
        nextId: 1029
    },
    1029: {
        title: "惩戒皮皮猴",
        tips: "皮皮猴就在云荒大陆(1,3)，快去惩戒它们一番吧。",
        receive: [
            "小红：附近有一群讨厌的皮皮猴，天天在大陆上传播我的坏话。",
            "听到这话，你直接就转身去找皮皮猴。",
            "&惩戒皮皮猴。",
        ],
        done: [
            "皮皮猴被你揍的上蹿下跳，小红见此顿时在一旁哈哈大笑：总算出了一口恶气。",
            "这时周围传来慌乱的动静。原来是一群目光如鹰的猴子被你吓到了。",
            "&继续",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
        },
        complete: {
            freak: "2042-6"
        },
        nextId: 1030
    },
    1030: {
        title: "惩戒鹰眼猴",
        tips: "鹰眼猴就在云荒大陆(1,3)，快去惩戒它们一番吧。",
        receive: [
            "小红顿时大怒：就是这该死的鹰眼猴偷看我洗澡，还把我屁股上有痣的事情传出去的。",
            "听到小红的话你忍住没笑出来，这群猴子还真是不道德。",
            "你：&这次算送你的。",
        ],
        done: [
            "狠狠的把鹰眼猴揍了一顿后，你才开口道：现在可以告诉我酒肆在什么地方了吧？",
            "小红满意的道：嘻嘻，走吧，我亲自带你去酒肆。",
            "&前往酒肆",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
        },
        complete: {
            freak: "2042-6"
        },
        nextId: 1031
    },
    1031: {
        title: "醉酒拎壶冲",
        tips: "拎壶冲就在云荒大陆(1,1)，快去和他交谈吧。",
        receive: [
            "来来来，喝喝喝。",
            "你跟着小红来到酒肆，隔着老远就见到一个喝的烂醉的布衣青年嘴里不断的喊着。",
            "小红：咯，那个就鬼就是你要找的人。",
            "你：多谢小红姑娘了。",
            "&道了声谢，你才朝那青年走去。",
        ],
        done: [
            "拎壶冲浑身酒气：要来喝一杯？",
            "你：你认识狐晶丽？",
            "拎壶冲：你不喝，那我喝了。",
            "你眉头微微一皱：&看来是醉的不轻。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
            tNpc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        nextId: 1032
    },
    1032: {
        title: "帮助醒酒",
        tips: "蛇妖就在云荒大陆(1,4)，快去收集蛇胆汁帮拎壶冲醒酒吧。",
        receive: [
            "你正不知道怎么让拎壶冲清醒时，小红过来就是一巴掌扇在拎壶冲脸上。",
            "拎壶冲被一巴掌扇到在地：小红姑娘，你也要来喝一杯？",
            "你：......",
            "小红：酒肆附近有一种蛇，他们的蛇胆奇苦，你去弄几颗来喂他嘴里肯定就清醒了。",
            "你：&行，我这就去。。",
        ],
        done: [
            "拎壶冲被小红喂了一嘴蛇胆，瞬间整个人脸色一变：苦，苦，苦！",
            "你：你认识狐晶丽？",
            "拎壶冲：你是？",
            "你拿出狐晶丽给你的玉佩：&我是找你帮忙的。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 1014,
                address: "40000,0,0"
            },
            tNpc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        complete: {
            article: "201-4"
        },
        nextId: 1032
    },
    1032: {
        title: "桑果解苦",
        tips: "桑树妖就在云荒大陆(1,4)，快去帮拎壶冲收集一些桑果吧。",
        receive: [
            "拎壶冲看了一眼玉佩，然后又一脸苦相的道：你能帮我去找桑树妖弄点桑果来？",
            "小红一脸幸灾乐祸：还想找桑果，让你天天烂醉如泥。",
            "你见拎壶冲这痛苦的模样，点了点头：&行，我去帮你找。",
        ],
        done: [
            "拎壶冲吃下桑果后终于是恢复正常了，而你也将在黑风寨以及不夜城发生事和他说了一遍。",
            "拎壶冲：这么看来黑炎宗确实有问题，其实我暗中调查他们很久了。",
            "你：&你调查过黑炎宗？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        complete: {
            article: "201-4"
        },
        nextId: 1033
    },
    1033: {
        title: "重要的事",
        tips: "拎壶冲就在云荒大陆(1,1)，快去帮看看他有什么重要的事吧。",
        receive: [
            "拎壶冲点了点头：嗯，我确实调查过，这个宗门似乎与魔族有勾结。",
            "你：黑炎宗不是抵御魔族的九大宗门之一？",
            "拎壶冲摇了摇头：我现在也没证据，不过经过我的调查可以肯定他们与魔族有关联。",
            "你：如果真是如此，我们必须赶紧回不夜城了。",
            "拎壶冲：不急，眼下我们还有更重要的事要做。",
            "你：&什么事？",
        ],
        done: [
            "拎壶冲：我赤炎妖酒喝完了。",
            "你：&你是认真的？",
            "拎壶冲点了点头：你有所不知，我若是有酒则天下无敌。",
            "你：那没酒呢？",
            "小红：没酒直接歇菜。",
            "拎壶冲：......",
            "你：&......",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        nextId: 1034
    },
    1034: {
        title: "收集赤炎蛛腿",
        tips: "赤炎蜘蛛就在云荒大陆(1,5)，快去帮拎壶冲收集一些蛛腿回来酿酒。",
        receive: [
            "拎壶冲：放心，这酒酿起来很快的，不过有还差两种材料。",
            "你：什么材料？",
            "拎壶冲：其中一种就是赤炎蜘蛛身上的赤炎蛛腿。",
            "&收集赤炎蛛腿"
        ],
        done: [
            "你将毛绒绒的蛛腿递给拎壶冲吐槽：好重的口味。",
            "拎壶冲：......",
            "你：&还一种材料是什么？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        complete: {
            article: "203-4"
        },
        nextId: 1035
    },
    1035: {
        title: "收集灵异水",
        tips: "灵异小妖就在云荒大陆(1,5)，快去帮拎壶冲收集一些灵异水回来酿酒。",
        receive: [
            "拎壶冲：灵异小妖身上藏着一种灵异水，这水极为纯净用来酿酒再合适不过了。",
            "你：&我去去就回。",
        ],
        done: [
            "拎壶冲：哈哈，终于全部凑齐了。",
            "&继续",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "40000,0,0"
            },
        },
        complete: {
            article: "204-4"
        },
        nextId: 1036
    },
    1036: {
        title: "回不夜城",
        tips: "拎壶冲的赤炎妖酒已经酿出来了，快去鬼医居所与狐晶丽汇合吧。",
        receive: [
            "片刻后拎壶冲腰间挂着一葫芦酒走到你面前：我们赶紧去不夜城吧。",
            "你点了点头：&动身。",
        ],
        done: [
            "等你与拎壶冲回到鬼医居所时发现到处都找不到狐晶丽的身影。",
            "你心中一惊：&难道出事了？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "40000,0,0"
            },
            tNpc: {
                id: 100,
                address: "20002,1,0"
            }
        },
        nextId: 1037
    },
    1037: {
        title: "大泽谷",
        tips: "与拎壶冲对话，了解大泽谷在什么地方。",
        replace: true,
        receive: [
            "这时拎壶冲双手掐出一道法诀，只见房间中出现几个淡淡的字：{name}，我在大泽谷等你。",
            "你看向拎壶冲：&大泽谷是什么地方？",
        ],
        done: [
            "拎壶冲眉头轻皱：大泽谷是我人族的地盘，因为到处都是沼泽毒雾，所以人烟稀少。",
            "你：难道黑炎宗的秘密就藏在大泽谷。",
            "拎壶冲点头：极有可能。",
            "你：&那我们赶紧去大泽谷吧。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "20002,1,0"
            }
        },
        nextId: 1038
    },
    1038: {
        title: "驱赶大泽毒蟾",
        tips: "大泽毒蟾释放毒雾在大泽谷(1,1)拦住了去路，快去将它们驱赶吧。",
        receive: [
            "大泽谷荒草遍地，泥泞沼泽更是随处可见，没走多久拎壶冲就停了下来。",
            "你：怎么不走了？",
            "拎壶冲：前面有一群大泽毒蟾拦住了去路。",
            "你这才发现前路被一层有毒的紫雾抵挡，而紫雾正是隐藏在里面的毒蟾嘴中吐出来的。",
            "&驱赶大泽毒蟾",
        ],
        done: [
            "大泽毒蟾虽然被你全部驱赶了，不过那留在空中的紫雾却没有散去。",
            "你：&现在怎么办？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "10002,0,0"
            },
        },
        complete: {
            freak: "2008-10"
        },
        nextId: 1039
    },
    1039: {
        title: "收集毒丹",
        tips: "大泽毒蛙在大泽谷(1,1)，它们体内的毒丹可以抵御紫雾之毒。",
        receive: [
            "拎壶冲：这附近应该有大泽毒蛙，它们体内的毒丹可以抵御这紫雾中的毒素，你去弄几颗来。",
            "&收集毒丹",
        ],
        done: [
            "大泽毒蛙的内丹不愧是天克紫色毒雾，你与拎壶冲含着毒丹轻而易举的便从毒蛙中穿过。",
            "很快你们就发现前方一个女子与一群巨熊纠缠在一起，正是狐晶丽。",
            "&继续",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "10002,0,0"
            },
            tNpc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            article: "205-6"
        },
        nextId: 1040
    },
    1040: {
        title: "及时解围",
        tips: "黑白圣熊在大泽谷(1,2)围攻狐晶丽，快点出手解围吧。",
        receive: [
            "正在与黑白圣熊缠斗的狐晶丽似乎听到了你的声音，连忙就喊你过去帮忙。",
            "你：&撑住。",
        ],
        done: [
            "你与拎壶冲加入战斗后，很快就将黑白圣熊击败。",
            "狐晶丽摸了一把汗：还好你们赶来了。",
            "你：&你怎么被围攻了。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "10002,0,0"
            },
            tNpc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            freak: "20010-10"
        },
        nextId: 1041
    },
    1041: {
        title: "惩戒黑白圣熊",
        tips: "黑白圣熊在大泽谷(1,2)围攻狐晶丽，快点出手解围吧。",
        receive: [
            "正在与黑白圣熊缠斗的狐晶丽似乎听到了你的声音，连忙就喊你过去帮忙。",
            "你：&撑住。",
        ],
        done: [
            "你与拎壶冲加入战斗后，很快就将黑白圣熊击败。",
            "狐晶丽摸了一把汗：还好你们赶来了。",
            "你：&你怎么被围攻了。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 100,
                address: "10002,0,0"
            },
            tNpc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            freak: "20010-10"
        },
        nextId: 1042
    },
    1042: {
        title: "黑炎宗阴谋",
        tips: "狐晶丽发现了黑炎宗的抓了无数凡人，赶紧去和她谈谈吧。",
        receive: [
            "接着狐晶丽便与你说了一下前因后果，简单来说就是她调查黑炎宗查到了大泽谷，没想到不小心闯进了黑白圣熊的老窝，然后就有了刚才那一幕。",
            "你：原来如此，不过你查到什么了？",
            "狐晶丽：我发现他们抓了很多人到这大泽谷，而这些人的从什么地方来的拎壶冲应该很清楚。",
            "拎壶冲一脸狐疑：难道是这段时间平白无故失踪或者山贼下山劫掠的凡人？",
            "你：&那黑炎宗抓这么多凡人干什么呢？",
        ],
        done: [
            "狐晶丽：这我也不清楚，不过当初我们在黑风寨以及不夜城被黑炎宗弟子暗杀必然与这事脱不了干系。",
            "拎壶冲点了点头：无论是什么，黑炎宗所图一定不小。",
            "&继续",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        nextId: 1043
    },
    1043: {
        title: "击退大地魔熊",
        tips: "大地魔熊就在大泽谷(1,2)，快点出手将它们击退吧。",
        receive: [
            "这时大地突然震动了起来，只见前方的出现一大群巨熊。",
            "狐晶丽：不好，这是与黑白圣熊一脉而出的大地魔熊。",
            "&迎战",
        ],
        done: [
            "你：呼，这群熊也太难缠了。",
            "话音刚落突然空中传来一阵响动，只见密密麻麻一片东西在朝你们飞来。",
            "你：&这时什么？",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            freak: "20011-10"
        },
        nextId: 1044
    },
    1044: {
        title: "冲出重围",
        tips: "血色迷蜂就在大泽谷(1,3)，赶紧从它们的包围中突围吧。",
        receive: [
            "拎壶冲脸色一变：血色迷蜂群，一定是被血腥味吸引过来的。",
            "狐晶丽：我们必须马上破开重围。",
            "&突围",
        ],
        done: [
            "无论你们选择什么方向突破，立即就有无数血色迷蜂聚集阻挡，显然是将你们三人耗死。",
            "你察觉到了一丝异常：&有人操控血色迷蜂。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            freak: "20012-10"
        },
        nextId: 1045
    },
    1045: {
        title: "擒贼先擒王",
        tips: "驭蜂师在大泽谷(1,3)控制血色迷蜂群，快点出手将他们击杀解围。",
        receive: [
            "你立即将目光朝血色迷蜂群中看去，果然看到几个手持法杖，鬼鬼祟祟的家伙。",
            "你决定：&擒贼先擒王。",
        ],
        done: [
            "你选择放手一搏，冲入血色迷蜂群硬是将那几个驭蜂师斩杀，瞬间蜂群四散。",
            "见你如此勇猛拎壶冲直接愣住了。",
            "狐晶丽：呼呼，差点以为小命要丢这里了。",
            "你：&刚刚我放跑了一个驭蜂师，我们快跟上吧。",
        ],
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10002,0,1"
            }
        },
        complete: {
            freak: "20013-10"
        },
        nextId: 1046
    },
    1046: {
        title: "误入阵法",
        tips: "你们一路来到大泽谷深处，没想到竟然不小心闯入了阵法。",
        receive: [
            "你们跟着逃走的驭蜂师很快就来到了大泽谷深处，只是进入这里你们立刻发现那人不见了踪影。",
            "拎壶冲：不好，我们好像闯进阵法了。",
            "你：那现在怎么办？",
            "拎壶冲：我对阵法也不精通，只能随便蒙一个方向了。",
        ],
        done: [
            "狐晶丽：嘻嘻，还真蒙对了。",
            "下一秒空气中就传来一道刺鼻的味道，只见前方出现一个巨大的祭台。",
            "祭台上一具干瘦的枯尸盘腿而坐，干尸盘中的地方则是连接着数百条千丈的血河勾勒出诡异的符文。",
            "你甚至清楚的看到血河中无数的残肢断臂，顿时头皮发麻：&这是被抓来的凡人！！！",
        ],
        action: {
            type: 2,
            text: ['东', '南', '西', '北']
        },
        reward: {
            exp: 200,
        },
        grand: {
            npc: {
                id: 101,
                address: "10002,0,2"
            },
            tNpc: {
                id: 101,
                address: "10002,0,3"
            },
        },
        nextId: 1046
    },
}

module.exports = {
    scene_list,
}
