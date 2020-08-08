import React, { Component, FunctionComponent } from "react";
import { Checkbox as AntdCheckbox } from "antd";
import * as AntdCheckboxInterface from "antd/es/checkbox";
import ClassNames from "classnames";

import "./style";

const Group: FunctionComponent<AntdCheckboxInterface.CheckboxGroupProps> = (props) => {
  return <AntdCheckbox.Group {...props} className={ClassNames("fl_checkbox_group", props.className)} />
};

class Checkbox extends Component<AntdCheckboxInterface.CheckboxProps> {
  static Group: typeof Group;
  render() {
    return (
      <AntdCheckbox className={ClassNames("fl_checkbox", this.props.className)} {...this.props} />
    );
  }
}

Checkbox.Group = Group;

export { AntdCheckbox, AntdCheckboxInterface };
export default Checkbox;
