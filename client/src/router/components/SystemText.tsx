import React from "react";

const SystemText = ({ system }) => {
    const time = new Date() / 1000;
    if (!system || time - system.s > 60000) {
        return null;
    }
    return <div>{system.t}</div>;
}

export default SystemText;