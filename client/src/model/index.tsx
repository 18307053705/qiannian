import React, { createContext, useReducer } from "react";

export const initState = {
  meun: {},
  userInfo: {}
};
export const GET_MEUN_LIST = "GET_MEUN_LIST";
export const UPDATE_COLOR = "UPDATE_COLOR";

const reducer = (state, {type,data}) => {
  switch (type) {
    case GET_MEUN_LIST:
      console.log(state,'state...')
      console.log(data,'action...')
      return {
        ...state,
        meun:data
      }
    default:
      return state
  }
}



// 创建 context
export const Model: any = createContext({});

export const ModelContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Model.Provider value={{ state, dispatch }}>
      {props.children}
    </Model.Provider>
  )
}
export default ModelContext;



