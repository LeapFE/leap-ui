import React from "react";
import ClassNames from "classnames";

import Tooltip from "../toolTip";
import Icon from "../icon";
import { TagToolTip, TreeFormat } from "./TagToolTip";

import "./selectContent.less";

export interface SelectContentProps {
  width?: string | number;
  open?: boolean;
  allowClear?: boolean;
  checkedKeys?: string[];
  changeCheckedIds?: (keys: string[]) => void;
  disabled?: boolean;
  allKeys?: string[];
  placeholder?: string;
  selectType?: "oneLabel";
  maxTagCount?: number;
  treeFormat: TreeFormat;
}

class SelectContent extends React.Component<SelectContentProps> {
  changeCheckedIds = (key: number) => {
    const { checkedKeys = [], changeCheckedIds, disabled } = this.props;
    if (disabled) {
      return;
    };

    checkedKeys.splice(key, 1);
    if (typeof changeCheckedIds === "function") {
      changeCheckedIds(checkedKeys);
    }
  };

  clearAll = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    const { changeCheckedIds } = this.props;

    if (typeof changeCheckedIds === "function") {
      changeCheckedIds([]);
    }
  };

  selectMain = () => {
    const {
      checkedKeys = [],
      allKeys = [],
      placeholder = "",
      selectType,
      maxTagCount,
      treeFormat = {},
      width,
    } = this.props;
    const { allItem = {} } = treeFormat;

    if (!checkedKeys.length) {
      return <div className="placeholder">{placeholder || "请选择"}</div>
    };

    if (!maxTagCount && maxTagCount !== 0)
      return (
        <div className="content">
          {checkedKeys.map((child, key) => {
            const item = allItem[child] || {};
            return (
              <div className="lable" key={key}>
                <span className="name">{item.title}</span>
                <span
                  className="flfont icon-icon_x_c"
                  onClick={() => this.changeCheckedIds(key)}
                ></span>
              </div>
            );
          })}
        </div>
      );

    if (maxTagCount === 0)
      return (
        <Tooltip
          placement="top"
          title={TagToolTip(allKeys, maxTagCount, treeFormat)}
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

    if (maxTagCount) {
      const oneKeys = checkedKeys.slice(0, maxTagCount);
      const maxWidth = `${100 /
        (checkedKeys.length <= maxTagCount + 1 ? checkedKeys.length : maxTagCount + 1)}%`;

      return (
        <Tooltip
          placement="top"
          title={TagToolTip(allKeys, maxTagCount, treeFormat)}
          overlayStyle={{ width: width || 251, maxWidth: width || 251 }}
        >
          <div className="content tow_ellipsis">
            {oneKeys.map((child, key) => {
              const item = allItem[child] || {};
              return (
                <div className="lable" key={key} style={{ maxWidth }}>
                  <span className="name">{item.title}</span>
                  <span
                    className="flfont icon-icon_x_c"
                    onClick={() => this.changeCheckedIds(key)}
                  ></span>
                </div>
              );
            })}
            {checkedKeys.length > maxTagCount ? (
              <div className="lable" style={{ maxWidth }}>
                +{checkedKeys.length - maxTagCount}…
              </div>
            ) : null}
          </div>
        </Tooltip>
      );
    }

    if (selectType === "oneLabel") {
      // REVIEW where `allObj` ???
      const label = allObj[checkedKeys[0]] || {};
      return <div className="normal_name">{label[titleName]}</div>;
    }

    return <div />;
  };

  render() {
    const { width, open, allowClear = false, checkedKeys = [] } = this.props;

    return (
      <div className={ClassNames("tree_select_render", { open: open })} style={{ width }}>
        {this.selectMain()}
        {Array.isArray(checkedKeys) && allowClear ? (
          <span className="close" onClick={this.clearAll}>
            <Icon type="close-circle" theme="filled" />
          </span>
        ) : (
          <span className="arrow"></span>
        )}
      </div>
    );
  }
}

export { SelectContent };
