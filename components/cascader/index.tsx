import React, { LegacyRef } from "react";
import { Cascader as AntdCascader } from "antd";
import * as AntdCascaderInterface from "antd/lib/cascader";

import "./style";

interface CascaderProps extends AntdCascaderInterface.CascaderProps {
  ref?: LegacyRef<AntdCascader>;
}

class Cascader extends React.Component<CascaderProps> {
  render() {
    return (
      <AntdCascader
        {...this.props}
        className="fl_cascader"
        popupClassName="fl_cascader_popup"
        ref={this.props.ref}
      />
    );
  }
}

export { AntdCascader, AntdCascaderInterface };

export default Cascader;
