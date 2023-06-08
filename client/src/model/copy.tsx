import React, { createContext, useReducer, FC } from "react";

const initState = {

}

const reducer = (state, { type, data }) => {
    console.log(state)
    console.log(type)
    console.log(data)
    return {}

}

const Model = createContext({})


const Redux:FC = (props) => {
    const [state, dispatc] = useReducer(reducer, initState);

    return (
        <Model.Provider value={{ state, dispatc }} >
            {props.children}
            {/* {props} */}
        </Model.Provider>
    )


}