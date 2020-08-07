import React, { FunctionComponent, Component } from "react";
import { Button as AntdButton } from "antd";
import * as AntdButtonInterface from "antd/lib/button";

import ClassNames from "classnames";

import "./style";

const ButtonGroup: FunctionComponent<AntdButtonInterface.ButtonGroupProps> = (props) => {
  return (
    <AntdButton.Group {...props} className={ClassNames("fl-btn-group", props.className)}>
      {props.children}
    </AntdButton.Group>
  );
}

class Button extends Component<AntdButtonInterface.ButtonProps> {
  static Group: typeof ButtonGroup;
  render() {
    return (
      <AntdButton {...this.props} className={ClassNames("fl-btn", this.props.className)}>
        {this.props.children}
      </AntdButton>
    );
  }
}

Button.Group = ButtonGroup;

export { AntdButton, AntdButtonInterface };

export default Button;
