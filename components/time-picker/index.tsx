import React, { forwardRef } from "react";
import ClassNames from "classnames";
import { TimePicker as AntdTimePicker } from "antd";
import * as AntdTimePickerInterface from "antd/es/time-picker";

import "./style";

const TimePicker = forwardRef<AntdTimePicker, AntdTimePickerInterface.TimePickerProps>(
  (props, ref) => {
    return (
      <AntdTimePicker
        {...props}
        ref={ref}
        className={ClassNames("fl_time_picker", props.className)}
        popupClassName={ClassNames("fl_time_picker_popup", props.popupClassName)}
      />
    );
  },
);

// export { AntdTimePicker, AntdTimePickerInterface };
export default TimePicker;
