/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import ClassNames from "classnames";
import {
  TreeSelectProps as AntdTreeSelectProps,
  TreeNodeValue,
  TreeNode,
} from "antd/es/tree-select/interface";

import Icon from "../icon";
import Tooltip from "../tooltip";

import Checkable from "./Checkable";
import ParentTreeSelect from "./ParentTreeSelect";

import { TagToolTip } from "./TagToolTip";
import TreeFormat from "./treeFormat";

import "./style";

export type NodeLabel = Record<"keyName" | "titleName" | "childrenName", string>;

export interface TreeSelectProps<T extends TreeNodeValue> extends AntdTreeSelectProps<T> {
  nodeLabel?: NodeLabel;
  parentTree?: boolean;
  tooltipType?: "parentAndLeaf";
}

interface TreeSelectState {
  value: TreeNodeValue;
  label: any[];
  stateTreeData: TreeNode[];
}

class TreeSelect<T extends TreeNodeValue> extends React.Component<
  TreeSelectProps<T>,
  TreeSelectState
> {
  static TreeNode: typeof AntdTreeSelect.TreeNode;
  static SHOW_ALL: any;
  static SHOW_CHILD: any;
  static SHOW_PARENT: any;

  private treeFormat: any;

  constructor(props: TreeSelectProps<T>) {
    super(props);
    this.state = { value: [], label: [], stateTreeData: [] };
  }

  componentDidMount() {
    const { value, treeData, nodeLabel } = this.props;

    if (value) {
      this.setState({ value });
    }

    if (treeData && nodeLabel) {
      // 只有这两个值都传 才会处理treeData 获取allItem、leafs、noLeafs;
      this.treeFormat = new TreeFormat(treeData, nodeLabel);
      this.setState({
        stateTreeData: this.treeFormat.forItems(treeData),
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: TreeSelectProps<T>) {
    if (nextProps.value && !this.state.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.value !== this.props.value && nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = (value: T, label: any, extra: any) => {
    const { onChange, showCheckedStrategy } = this.props;

    this.setState({ value, label });

    if (this.treeFormat && showCheckedStrategy === AntdTreeSelect.SHOW_ALL) {
      value = this.getLeafKeys(value);
    }

    if (typeof onChange === "function") {
      onChange(value, label, extra);
    }
  };

  getLeafKeys = (keys: T) => {
    const { showCheckedStrategy } = this.props;
    if (this.treeFormat && showCheckedStrategy === AntdTreeSelect.SHOW_ALL) {
      const { leafs = {} } = this.treeFormat;
      if (Array.isArray(keys)) {
        const leafKeys = keys.reduce((result, cur) => {
          if (leafs[cur]) result.push(cur);
          return result;
        }, []);
        return leafKeys;
      }
    }
    return keys;
  };

  placeholderRender = (keys: T) => {
    if (!Array.isArray(keys)) {
      return;
    }

    const { showCheckedStrategy } = this.props;
    if (this.treeFormat && showCheckedStrategy === AntdTreeSelect.SHOW_ALL) {
      const leafKeys = this.getLeafKeys(keys);
      return `已选${leafKeys.length}个选项…`;
    }

    return `已选${keys.length}个选项…`;
  };

  render() {
    const { className, tooltipType, parentTree, ...otherProps } = this.props;
    // tooltipType:parentAndLeaf tooltip显示的内容为父级:子集1-子集2-子集3的结构
    const { value, label, stateTreeData = [] } = this.state;
    const addProps = {};
    const mul_class = otherProps.treeCheckable || otherProps.multiple ? "multiple_select" : "";

    if (parentTree) return <ParentTreeSelect {...otherProps} />;

    if (otherProps.treeCheckable && otherProps.showSearch) return <Checkable {...otherProps} />;

    if (otherProps.maxTagCount === 0 || otherProps.maxTagCount) {
      const { style = {} } = otherProps;
      const { width } = style;
      return (
        <Tooltip
          title={TagToolTip(
            tooltipType === "parentAndLeaf" && Array.isArray(value) ? value : label,
            otherProps.maxTagCount,
            tooltipType === "parentAndLeaf" ? this.treeFormat : "",
          )}
          placement="top"
          overlayStyle={{ width: width || 150, maxWidth: width || 150 }}
          autoAdjustOverflow={false}
        >
          <div className="coustom_tree_select_wip">
            <AntdTreeSelect
              {...otherProps}
              {...addProps}
              className={ClassNames("coustom_tree_select", className, mul_class)}
              onChange={this.onChange}
              treeData={this.props.nodeLabel ? stateTreeData : otherProps.treeData}
              maxTagPlaceholder={
                otherProps.maxTagCount === 0 && !otherProps.maxTagPlaceholder
                  ? this.placeholderRender
                  : undefined
              }
            />
          </div>
        </Tooltip>
      );
    }

    return (
      <AntdTreeSelect
        {...otherProps}
        {...addProps}
        suffixIcon={<Icon type="down" />}
        className={ClassNames("coustom_tree_select", className, mul_class)}
      />
    );
  }
}

TreeSelect.TreeNode = AntdTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = AntdTreeSelect.SHOW_ALL;
TreeSelect.SHOW_CHILD = AntdTreeSelect.SHOW_CHILD;
TreeSelect.SHOW_PARENT = AntdTreeSelect.SHOW_PARENT;

export default TreeSelect;
