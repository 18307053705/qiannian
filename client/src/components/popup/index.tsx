import React, { ReactElement } from "react";
import { Button } from "antd";
import "./index.less";

export interface propsFace {
  onOk?: Function;
  onClose?: Function;
  onCancel?: Function;
  title?: string | ReactElement;
  className?: string;
  children?: any;
}

// function Dom(props: propsFace) {
//     const { onOk, onClose, onCancel, children, title, className } = props;
//   return (
//     <div className="my_popup_warp">
//       <div className={`my_popup_connet ${className}`}>
//         <div className="my_popup_title">{title ? title : "标题"}</div>
//         <div className="my_popup_itme"></div>
//         <div className="my_popup_footer"></div>
//       </div>
//     </div>
//   );
// }

export function Popup(props: propsFace) {
  const { onOk, onClose, onCancel, children, title, className } = props;
  return (
    <div className="my_popup_warp">
      <div className={`my_popup_connet ${className}`}>
        <div className="my_popup_title">
          {title ? title : "标题"}
          {onClose ? "" : ""}
        </div>
        <div className="my_popup_itme">{children}</div>
        <div className="my_popup_footer">
          {onOk && <Button>确认</Button>}
          {onCancel && <Button>取消</Button>}
        </div>
      </div>
    </div>
  );
}
