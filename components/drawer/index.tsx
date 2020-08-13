import React, { FunctionComponent } from "react";
import { Drawer as AntdDrawer } from "antd";
import * as AntdDrawerInterface from "antd/es/drawer";
import ClassNames from "classnames";

import "./style";

const Drawer: FunctionComponent<AntdDrawerInterface.DrawerProps> = (props) => {
  return (
    <AntdDrawer className={ClassNames("fl-drawer", props.className)} {...props}>
      {props.children}
    </AntdDrawer>
  );
};

// export { AntdDrawer, AntdDrawerInterface };
export default Drawer;
