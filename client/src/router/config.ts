import { lazy } from "react";

export type RouterType = {
  name: string;
  path: string;
  component: any;
  exact?: boolean;
};
export const config: RouterType[] = [
  {
    name: "游戏开始",
    path: "/",
    component: lazy(() => import("@page/home")),
    exact: true
  },
  {
    name: "登录注册",
    path: "/login",
    component: lazy(() => import("@page/login"))
  },
  {
    name: "创建角色",
    path: "/reactRole",
    component: lazy(() => import("@page/reactRole"))
  },
  {
    name: "大地图",
    path: "/grand",
    component: lazy(() => import("@page/grand"))
  },
  {
    name: "战斗界面",
    path: "/fight",
    component: lazy(() => import("@page/fight"))
  },
  {
    name: "角色信息界面",
    path: "/roleInfo",
    component: lazy(() => import("@page/roleInfo"))
  },
  {
    name: "背包界面",
    path: "/knapsack",
    component: lazy(() => import("@page/knapsack"))
  },
  {
    name: "商店界面",
    path: "/shopping",
    component: lazy(() => import("@page/shopping"))
  },
  {
    name: "玩家界面",
    path: "/player",
    component: lazy(() => import("@page/player"))
  },
  {
    name: "好友界面",
    path: "/friends",
    component: lazy(() => import("@page/friends"))
  },
  {
    name: "势力界面",
    path: "/socialize",
    component: lazy(() => import("@page/socialize"))
  },
  {
    name: "创建势力",
    path: "/createSocialize",
    component: lazy(() => import("@page/socialize/create"))
  },
  {
    name: "装备界面",
    path: "/equip",
    component: lazy(() => import("@page/equip"))
  },
  {
    name: "装备界面",
    path: "/equipList",
    component: lazy(() => import("@page/equipList"))
  },
  {
    name: "打造装备界面",
    path: "/equipMake",
    component: lazy(() => import("@page/equipMake"))
  },
  {
    name: "物品详情界面",
    path: "/articleDetail",
    component: lazy(() => import("@page/articleDetail"))
  },
  {
    name: "装备详情界面",
    path: "/equipDetail",
    component: lazy(() => import("@page/equipDetail"))
  },
  {
    name: "装备精炼",
    path: "/equipFreeForge",
    component: lazy(() => import("@page/equipFreeForge"))
  },
  {
    name: "任务界面",
    path: "/task",
    component: lazy(() => import("@page/task"))
  },
  {
    name: "剧情界面",
    path: "/taskScene",
    component: lazy(() => import("@page/taskScene"))
  },
  {
    name: "技能界面",
    path: "/art",
    component: lazy(() => import("@page/art"))
  },
  {
    name: "聊天界面",
    path: "/chat",
    component: lazy(() => import("@page/chat"))
  },
  {
    name: "商城界面",
    path: "/shops",
    component: lazy(() => import("@page/shops"))
  },
  {
    name: "宠物界面",
    path: "/pet",
    component: lazy(() => import("@page/pet"))
  },
  {
    name: "宠物界面",
    path: "/petDetail",
    component: lazy(() => import("@page/petDetail"))
  },
  {
    name: "房屋界面",
    path: "/house",
    component: lazy(() => import("@page/house"))
  },
  {
    name: "珍宝界面",
    path: "/treasure",
    component: lazy(() => import("@page/treasure"))
  },
  {
    name: "聚宝盆界面",
    path: "/cornucopia",
    component: lazy(() => import("@page/cornucopia"))
  },
  {
    name: "地图界面",
    path: "/worldMap",
    component: lazy(() => import("@page/worldMap"))
  },
  {
    name: "灵兽山",
    path: "/lingShouShan",
    component: lazy(() => import("@page/lingShouShan"))
  },
  {
    name: "神装",
    path: "/jackpotEquip",
    component: lazy(() => import("@page/jackpotEquip"))
  },
  {
    name: "姻缘石",
    path: "/yinYuanShi",
    component: lazy(() => import("@page/yinYuanShi"))
  },
  {
    name: "姻缘树",
    path: "/yinYuanShu",
    component: lazy(() => import("@page/yinYuanShu"))
  },
  {
    name: "组队任务",
    path: "/rankTask",
    component: lazy(() => import("@page/rankTask"))
  },
  {
    name: "深渊",
    path: "/shenYuan",
    component: lazy(() => import("@page/shenYuan"))
  },
  {
    name: "拍卖行",
    path: "/paiMaiHang",
    component: lazy(() => import("@page/paiMaiHang"))
  },
  {
    name: "套装界面",
    path: "/suitDetail",
    component: lazy(() => import("@page/suitDetail"))
  },
  {
    name: "积分商店",
    path: "/shopIntegral",
    component: lazy(() => import("@page/shopIntegral"))
  },
  {
    name: "全民仙法",
    path: "/jackpotArt",
    component: lazy(() => import("@page/jackpotArt"))
  },
  {
    name: "全民冲击",
    path: "/jackpotLevel",
    component: lazy(() => import("@page/jackpotLevel"))
  },
  {
    name: "铁匠铺",
    path: "/tieJiangPu",
    component: lazy(() => import("@page/tieJiangPu"))
  },
  {
    name: "银行",
    path: "/yinHang",
    component: lazy(() => import("@page/yinHang"))
  },
  {
    name: "送财童子",
    path: "/songCaiTongZi",
    component: lazy(() => import("@page/songCaiTongZi"))
  },
  {
    name: "首日登录",
    path: "/jackpotDay",
    component: lazy(() => import("@page/jackpotDay"))
  },
  {
    name: "上古战场",
    path: "/zhanChang",
    component: lazy(() => import("@page/zhanChang"))
  },
  {
    name: "称号系统",
    path: "/title",
    component: lazy(() => import("@page/title"))
  },
  {
    name: "世界BOSS",
    path: "/worldBoss",
    component: lazy(() => import("@page/worldBoss"))
  },
  {
    name: "金银岛",
    path: "/jinYinDao",
    component: lazy(() => import("@page/jinYinDao"))
  },
  {
    name: "彩灵洞",
    path: "/caiLingDong",
    component: lazy(() => import("@page/caiLingDong"))
  },
  {
    name: "古树",
    path: "/unknownCapability",
    component: lazy(() => import("@page/unknownCapability"))
  },
  {
    name: "天材地宝",
    path: "/tianCaiDiBao",
    component: lazy(() => import("@page/tianCaiDiBao"))
  },
  {
    name: "合成系统",
    path: "/synthesis",
    component: lazy(() => import("@page/synthesis"))
  },
  {
    name: "选区",
    path: "/constituency",
    component: lazy(() => import("@page/constituency"))
  },
  {
    name: "天榜",
    path: "/ranking",
    component: lazy(() => import("@page/ranking"))
  },
  {
    name: "境界",
    path: "/jingJie",
    component: lazy(() => import("@page/jingJie"))
  },
  {
    name: "渡劫台",
    path: "/duJieTai",
    component: lazy(() => import("@page/duJieTai"))
  },
  {
    name: "悬赏榜",
    path: "/xuanShanBang",
    component: lazy(() => import("@page/xuanShanBang"))
  },
];

export default config;
