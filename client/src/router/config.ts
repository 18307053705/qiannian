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
    name: "仓库界面",
    path: "/warehouse",
    component: lazy(() => import("@page/warehouse"))
  },
  {
    name: "商店界面",
    path: "/shopping",
    component: lazy(() => import("@page/shopping"))
  },
  {
    name: "商店界面",
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
    name: "玩家战斗界面",
    path: "/playerFight",
    component: lazy(() => import("@page/playerFight"))
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
  
];

export default config;
