import React, { FunctionComponent, LegacyRef } from "react";
import { Cascader as AntdCascader } from "antd";
import { CascaderProps as AntdCascaderProps } from "antd/lib/cascader";

import "./style";

interface CascaderProps extends AntdCascaderProps {
  ref?: LegacyRef<AntdCascader>;
}

const Cascader: FunctionComponent<CascaderProps> = (props) => {
  return (
    <AntdCascader
      {...props}
      className="fl_cascader"
      popupClassName="fl_cascader_popup"
      ref={props.ref}
    />
  );
}

export default Cascader;
