import React, { LegacyRef } from "react";
import { Cascader as AntdCascader } from "antd";
import * as AntdCascaderInterface from "antd/lib/cascader";
import ClassNames from "classnames";

import "./style";

interface CascaderProps extends AntdCascaderInterface.CascaderProps {
  ref?: LegacyRef<AntdCascader>;
}

class Cascader extends React.Component<CascaderProps> {
  render() {
    return (
      <AntdCascader
        {...this.props}
        className={ClassNames("fl_cascader", this.props.className)}
        popupClassName={ClassNames("fl_cascader_popup", this.props.popupClassName)}
        ref={this.props.ref}
      />
    );
  }
}

export { AntdCascader, AntdCascaderInterface };

export default Cascader;
