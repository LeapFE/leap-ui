import React, { FunctionComponent } from "react";
import { Cascader as AntdCascader } from "antd";
import { CascaderProps } from "antd/lib/cascader";

import "./style";

const Cascader: FunctionComponent<CascaderProps> = (props) => {
  return (
    <AntdCascader
      {...props}
      className="fl_cascader"
      popupClassName="fl_cascader_popup"
    />
  );
}

export default Cascader;
