import React, { FunctionComponent, CSSProperties, HTMLAttributes, ReactNode } from "react";
import ClassNames from "classnames";

import "./style";

interface NoDataProps {
  size?: "small";
  type?: "warning" | "success";
  style?: CSSProperties;
  className?: string;
  msg?: string;
  msgProps?: HTMLAttributes<HTMLDivElement>;
  imgProps?: HTMLAttributes<HTMLImageElement>;
  bottomRender?: ReactNode;
  bottomRenderProps?: HTMLAttributes<HTMLDivElement>;
}

const NoData: FunctionComponent<NoDataProps> = (props) => {
  const {
    size = "normal",
    type = "info",
    style = {},
    className,
    msg,
    msgProps = {},
    imgProps = {},
    bottomRender,
    bottomRenderProps = {},
  } = props;
  return (
    <div
      className={ClassNames("fl_no_data", `fl_no_data_${type}`, `fl_no_data_${size}`, className)}
      style={style}
    >
      <div className={ClassNames("img", imgProps.className)} style={imgProps.style}></div>
      <div className={ClassNames("msg", msgProps.className)} style={msgProps.style}>
        {msg || "暂无数据~"}
      </div>
      {bottomRender ? (
        <div
          className={ClassNames("bot_render", bottomRenderProps.className)}
          style={bottomRenderProps.style}
        >
          {bottomRender}
        </div>
      ) : null}
    </div>
  );
};

export default NoData;
