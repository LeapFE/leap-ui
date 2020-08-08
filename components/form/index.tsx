import React, { Component } from "react";
import { Form as AntdForm } from "antd";
import * as AntdFormInterface from "antd/es/form";
import ClassNames from "classnames";

import "./style";

class Form extends Component<AntdFormInterface.FormProps> {
  render() {
    return <AntdForm className={ClassNames("fl-form", this.props.className)} {...this.props} />;
  }
}

export { AntdForm, AntdFormInterface };
export default Form;
