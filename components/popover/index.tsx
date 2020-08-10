import React, { forwardRef } from "react";
import { Popover as AntdPopover } from "antd";
import * as AntdPopoverInterface from "antd/es/popover";
import ClassNames from "classnames";

import "./style";

export interface PopoverProps extends AntdPopoverInterface.PopoverProps {
  hideArrow?: boolean;
}

const Popover = forwardRef<AntdPopover, PopoverProps>((props, ref) => {
  return (
    <AntdPopover
      ref={ref}
      {...props}
      overlayClassName={ClassNames("fl_popover_overlay", props.overlayClassName, {
        hideArrow: props.hideArrow,
      })}
    />
  );
});

// export { AntdPopover, AntdPopoverInterface };
export default Popover;
