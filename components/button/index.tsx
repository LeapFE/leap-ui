import React, { FunctionComponent, LegacyRef } from "react";
import { Button as AntdButton } from "antd";
import * as AntdButtonInterface from "antd/lib/button";

import "./style";

const ButtonGroup: FunctionComponent<AntdButtonInterface.ButtonGroupProps> = (props) => {
  return (
    <AntdButton.Group {...props} className="fl-btn-group">
      {props.children}
    </AntdButton.Group>
  );
};

interface LeapButtonProps extends AntdButtonInterface.ButtonProps {
  ref?: LegacyRef<AntdButton>;
}
interface ButtonComponent<P> extends FunctionComponent<P> {
  Group: typeof ButtonGroup;
}
const Button: ButtonComponent<LeapButtonProps> = (props) => {
  return (
    <AntdButton {...props} className="fl-btn">
      {props.children}
    </AntdButton>
  );
};

Button.Group = ButtonGroup;

export { AntdButton, AntdButtonInterface };

export default Button;
