import React, { forwardRef } from "react";

import { Radio as AntdRadio } from "antd";
import * as AntdRadioInterface from "antd/es/radio";
import * as AntdRadioButtonInterface from "antd/es/radio/radioButton";

import ClassNames from "classnames";

import "./style";

const InternalRadio = forwardRef<AntdRadio, AntdRadioInterface.RadioProps>((props, ref) => {
  return <AntdRadio {...props} ref={ref} className={ClassNames("fl_radio", props.className)} />;
});

const Group = forwardRef<AntdRadioInterface.Group, AntdRadioInterface.RadioGroupProps>(
  (props, ref) => {
    return (
      <AntdRadio.Group
        ref={ref}
        {...props}
        className={ClassNames("fl_radio_group", props.className)}
      />
    );
  },
);

const Button = forwardRef<AntdRadioInterface.Button, AntdRadioButtonInterface.RadioButtonProps>(
  (props, ref) => {
    return (
      <AntdRadio.Button
        ref={ref}
        {...props}
        className={ClassNames("fl_radio_btn", props.className)}
      />
    );
  },
);

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    AntdRadioInterface.RadioProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof Group;
  Button: typeof Button;
}

const Radio = InternalRadio as CompoundedComponent;
Radio.Button = Button;
Radio.Group = Group;

export { AntdRadio, AntdRadioButtonInterface, AntdRadioInterface };
export default Radio;
