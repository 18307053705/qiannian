import { useState, useEffect } from "react";
import "./index.less";
// function Lazy() {
//   return <div className="Lazy_lodding">加载页面中，请稍等</div>;
// }

function componentPormis(fn) {
  return new Promise((res) => {
    setTimeout(() => {
      fn(res);
    }, 0);
  });
}

const asyncComponent = (fn) => {
  return () => {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      componentPormis(fn).then((dom: any | PromiseLike<void>) => {
        setComponent(dom.default);
      });
    }, []);
    return Component ? Component : null;
  };
};

export { asyncComponent };
