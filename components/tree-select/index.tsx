import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import {
  TreeSelectProps as AntdTreeSelectProps,
  TreeNodeValue,
  TreeNode,
  TreeNodeNormal,
} from "antd/es/tree-select/interface";
import ClassName from "classnames";

import Icon from "../icon";
import Tooltip from "../toolTip";

import { Checkable } from "./Checkable";
import { ParentTreeSelect } from "./ParentTreeSelect";

import { TagToolTip } from "./TagToolTip";
import { TreeFormat, isEveryElementString } from "./treeFormat";

import "./style";

export type NodeLabel = Record<"keyName" | "titleName" | "childrenName", string>;

export interface TreeSelectProps extends AntdTreeSelectProps<TreeNodeValue> {
  nodeLabel?: Record<string, string>;
  parentTree?: boolean;
  // tooltipType:parentAndLeaf tooltip显示的内容为父级:子集1-子集2-子集3的结构
  tooltipType?: "parentAndLeaf";
}

interface TreeSelectState {
  value: TreeNodeValue;
  label: number[] | string[];
  stateTreeData: TreeNode[];
}

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static TreeNode: typeof AntdTreeSelect.TreeNode;
  static SHOW_ALL: "SHOW_ALL";
  static SHOW_CHILD: "SHOW_CHILD";
  static SHOW_PARENT: "SHOW_PARENT";

  private treeFormat: TreeFormat | null;

  constructor(props: TreeSelectProps) {
    super(props);
    this.state = { value: [], label: [], stateTreeData: [] };

    this.treeFormat = null;
  }

  componentDidMount() {
    const { value, treeData, nodeLabel } = this.props;

    if (value) {
      this.setState({ value });
    }

    if (treeData && nodeLabel) {
      this.treeFormat = new TreeFormat(treeData, nodeLabel);
      this.setState({ stateTreeData: this.treeFormat.transformerSourceTreeData(treeData) });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: TreeSelectProps) {
    if (nextProps.value && !this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (value: TreeNodeValue, label: any, extra: any) => {
    const { onChange, showCheckedStrategy } = this.props;
    let _value = value;

    this.setState({ value, label });

    if (this.treeFormat && showCheckedStrategy === TreeSelect.SHOW_ALL) {
      _value = this.getLeafKeys(value);
    }

    if (typeof onChange === "function") {
      onChange(_value, label, extra);
    }
  };

  placeholderRender = (keys: TreeNodeValue) => {
    if (!Array.isArray(keys)) {
      return;
    }

    const { showCheckedStrategy } = this.props;

    if (this.treeFormat && showCheckedStrategy === TreeSelect.SHOW_ALL) {
      const leafKeys = this.getLeafKeys(keys);
      return `已选${leafKeys.length}个选项…`;
    }

    return `已选${keys.length}个选项…`;
  };

  getLeafKeys = (keys: TreeNodeValue) => {
    if (!Array.isArray(keys)) {
      return [];
    }

    if (!isEveryElementString(keys)) {
      return [];
    }

    const { showCheckedStrategy } = this.props;

    if (this.treeFormat && showCheckedStrategy === TreeSelect.SHOW_ALL) {
      const { leafs = {} } = this.treeFormat;
      const leafKeys = keys.reduce((result: string[], cur) => {
        if (leafs[cur]) {
          result.push(cur);
        }
        return result;
      }, []);
      return leafKeys;
    }

    return keys;
  };

  render() {
    const {
      className,
      tooltipType,
      parentTree,
      maxTagCount,
      maxTagPlaceholder,
      value: propsValue,
      treeData,
      treeCheckable,
      ...reset
    } = this.props;
    const { value, label } = this.state;

    const mul_class = treeCheckable || reset.multiple ? "multiple_select" : "";

    if (parentTree) return <ParentTreeSelect treeData={treeData as TreeNodeNormal[]} {...reset} />;

    if (treeCheckable && reset.showSearch)
      return (
        <Checkable
          treeData={treeData as TreeNodeNormal[]}
          value={Array.isArray(propsValue) ? propsValue : []}
          treeCheckable={!!treeCheckable}
          maxTagCount={maxTagCount}
          {...reset}
        />
      );

    if (maxTagCount === 0 || maxTagCount) {
      const { style = {} } = reset;
      const { width } = style;
      return (
        <Tooltip
          title={TagToolTip(
            tooltipType === "parentAndLeaf" && Array.isArray(value) ? value : label,
            maxTagCount,
          )}
          placement="top"
          overlayStyle={{ width: width || 150, maxWidth: width || 150 }}
          autoAdjustOverflow={false}
        >
          <div className="custom_tree_select_wip">
            <AntdTreeSelect
              {...reset}
              treeData={treeData}
              className={ClassName(className, mul_class, "custom_tree_select")}
              onChange={this.onChange}
              maxTagPlaceholder={
                maxTagCount === 0 && !maxTagPlaceholder ? this.placeholderRender : undefined
              }
            />
          </div>
        </Tooltip>
      );
    }

    return (
      <AntdTreeSelect
        {...reset}
        treeData={treeData}
        suffixIcon={<Icon type="down" />}
        className={ClassName(className, mul_class, "custom_tree_select")}
      />
    );
  }
}

TreeSelect.TreeNode = AntdTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = AntdTreeSelect.SHOW_ALL;
TreeSelect.SHOW_CHILD = AntdTreeSelect.SHOW_CHILD;
TreeSelect.SHOW_PARENT = AntdTreeSelect.SHOW_PARENT;

export default TreeSelect;
