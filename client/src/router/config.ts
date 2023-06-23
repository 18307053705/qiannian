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
    name: "物品详情界面",
    path: "/articleDetail",
    component: lazy(() => import("@page/articleDetail"))
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
  }
];

export default config;
