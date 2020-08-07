import React, { FunctionComponent } from "react";
import { Button as AntdButton } from "antd";
import { ButtonProps, ButtonGroupProps } from "antd/lib/button";

import "antd/lib/button/style/css.js";
import "./style";

const ButtonGroup: FunctionComponent<ButtonGroupProps> = (props) => {
  return (
    <AntdButton.Group {...props} className="fl-btn-group">
      {props.children}
    </AntdButton.Group>
  );
};

interface FishButtonProps extends ButtonProps {
  id?: string;
}
interface ButtonComponent<P> extends FunctionComponent<P> {
  Group: typeof ButtonGroup;
}
const Button: ButtonComponent<FishButtonProps> = (props) => {
  return (
    <AntdButton {...props} className="fl-btn">
      {props.children}
    </AntdButton>
  );
};

Button.Group = ButtonGroup;
export default Button;
