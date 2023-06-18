import { post } from "@request";
const socializeListUrl = "/socialize/list";
const socializeDetailUrl = "/socialize/Detail";
const socializeApplyUrl = "/socialize/apply";
const socializeCreateUrl = "/socialize/create";
const socializeActiveUrl = "/socialize/active";
const socializeAdjustUrl = "/socialize/adjust";
const socializeExitUrl = "/socialize/exit";
const getMaterialtUrl = "/socialize/getMaterial";
const materialUrl = "/socialize/material";

type socializeType = 1 | 2 | 3;

type Base = {
  type: socializeType;
};

// 势力列表
export const getsocializeList = async (data: Base) => {
  return await post(socializeListUrl, data);
};
// 势力详情
export const getsocializeDetail = async (data: Base) => {
  return await post(socializeDetailUrl, data);
};

type CreateTypeReq = {
  name: string;
  type: socializeType;
  text?: string;
};
// 创建势力
export const socializeCreate = async (data: CreateTypeReq) => {
  return await post(socializeCreateUrl, data);
};

// 申请势力
export const socializeApply = async (data: {
  id: string;
  type: socializeType;
}) => {
  return await post(socializeApplyUrl, data);
};

// 申请势力处理
export const socializeActive = async (data: {
  role_id: string;
  type: socializeType;
  state: 0 | 1;
}) => {
  return await post(socializeActiveUrl, data);
};

// 势力人员调整
export const socializeAdjust = async (data: {
  role_id: string;
  type: socializeType;
  chengLevel: -1 | 1 | 2 | 3 | 4 | 5;
}) => {
  return await post(socializeAdjustUrl, data);
};

// 退出势力
export const socializeExit = async (data: { id: string }) => {
  return await post(socializeExitUrl, data);
};

// 捐赠材料
export const setMaterialtl = async (data: {
  type: socializeType;
  materialId: number | 'all',
  materialNum: number,
}) => {
  return await post(materialUrl, data);
};

// 获取材料
export const getMaterialtl = async (data: { type: socializeType }) => {
  return await post(getMaterialtUrl, data);
};
