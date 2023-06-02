import { post } from "@request";
import { ATTR, AttrType } from "../base";
const createRoleUrl = `/role/createRole`;
const getRoleListUrl = `/role/getRoleList`;
const getRoleInfoUrl = `/role/getRoleInfo`;
const roleLoginUrl = `/role/roleLogin`;

export interface getRoleListRes {
  error: string;
  code: number;
  msg: string;
  data: [];
}

// 获取角色列表
export async function getRoleList() {
  return await post(getRoleListUrl);
}

export interface createRoleReq {
  role_name: string;
  role_sex: string;
  role_career: number;
  role_race: number;
}

// 创建角色
export async function createRole(data: createRoleReq) {
  return await post(createRoleUrl, data);
}

export interface RoleInfoRes {
  attr: AttrType;
  buff: {
    month: {
      end: number;
    };
    exp2: {
      value: number;
      end: number;
    };
    exp4: {
      value: number;
      end: number;
    };
    exp10: {
      value: number;
      end: number;
    };
    money2: {
      value: number;
      end: number;
    };
    money4: {
      value: number;
      end: number;
    };
    money10: {
      value: number;
      end: number;
    };
    life: {
      value: number;
      end: number;
    };
    mana: {
      value: number;
      end: number;
    };
    atk: {
      value: number;
      end: number;
    };
    dfs: {
      value: number;
      end: number;
    };
    hit: {
      value: number;
      end: number;
    };
    dodge: {
      value: number;
      end: number;
    };
    sudden: {
      value: number;
      end: number;
    };
  };
  role_level: number;
  role_name: string;
  role_exp: string;
  role_career: string;
  role_race: string;
  role_realm: string;
  role_evil: number;
  role_signature: string;
  role_sex: string;
  role_title: string;
  reputation_pool: string;
  socialize_pool: string;
  equip_pool: string;
  life:number;
  mana:number;
}

export const initRoleInfo: RoleInfoRes = {
  attr: { ...ATTR },
  buff: {
    month: {
      end: 0
    },
    exp2: {
      value: 200,
      end: 0
    },
    exp4: {
      value: 400,
      end: 0
    },
    exp10: {
      value: 1000,
      end: 0
    },
    money2: {
      value: 200,
      end: 0
    },
    money4: {
      value: 400,
      end: 0
    },
    money10: {
      value: 1000,
      end: 0
    },
    life: {
      value: 1000,
      end: 0
    },
    mana: {
      value: 1000,
      end: 0
    },
    atk: {
      value: 1000,
      end: 0
    },
    dfs: {
      value: 1000,
      end: 0
    },
    hit: {
      value: 1000,
      end: 0
    },
    dodge: {
      value: 1000,
      end: 0
    },
    sudden: {
      value: 1000,
      end: 0
    }
  },
  role_level: 1,
  role_name: "",
  role_exp: "",
  role_evil: 0,
  role_signature: "",
  role_career: "",
  role_race: "",
  role_realm: "",
  role_sex: "",
  role_title: "",
  reputation_pool: "{}",
  socialize_pool: "{}",
  equip_pool: "{}",
  life:0,
  mana:0
};

// 获取角色信息
export async function getRoleInfo(data={}) {
  return await post(getRoleInfoUrl,data);
}


// 角色登录
export async function roleLogin(data) {
  return await post(roleLoginUrl,data);
}