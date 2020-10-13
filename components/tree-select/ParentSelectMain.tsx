import React, { ReactNode } from "react";
import ClassNames from "classnames";

import Tooltip from "../toolTip";

import { TagToolTip } from "./TagToolTip";
import { TreeFormat } from "./treeFormat";

interface ParentSelectMainProps {
  checkedKeys?: string[];
  placeholder?: ReactNode;
  width?: string | number;
  treeFormat: TreeFormat | null;
  open?: boolean;
}

class ParentSelectMain extends React.Component<ParentSelectMainProps> {
  selectMain = () => {
    const { checkedKeys = [], placeholder = "", width, treeFormat } = this.props;
    const { allItem = {} } = treeFormat || {};

    if (!checkedKeys.length) {
      return <div className="placeholder">{placeholder || "请选择"}</div>;
    }

    if (checkedKeys.length === 1) {
      return <div className="normal_name">{allItem[checkedKeys[0]].title}</div>;
    }

    return (
      <Tooltip
        placement="top"
        title={TagToolTip(checkedKeys, 0, treeFormat)}
        overlayStyle={{ width: width || 251, maxWidth: width || 251 }}
      >
        <div className="content">
          <div className="lable">
            已选
            {checkedKeys.length}
            个选项…
          </div>
        </div>
      </Tooltip>
    );
  };

  render() {
    const { width, open } = this.props;
    return (
      <div className={ClassNames("tree_select_render", { open: open })} style={{ width }}>
        {this.selectMain()}
        <span className="arrow"></span>
      </div>
    );
  }
}

export { ParentSelectMain };
