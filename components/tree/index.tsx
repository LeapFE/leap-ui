import React, { Component } from "react";
import { Tree as AntdTree } from "antd";
import * as AntdTreeInterface from "antd/es/tree";
import { TreeNodeNormal } from "antd/es/tree/Tree";

import { TreeParent } from "./TreeParent";
import { TreeSearch } from "./TreeSearch";

import "./style";

export interface TreeProps extends AntdTreeInterface.TreeProps {
  nodeLabel?: Record<string, string>;
}

class Tree extends Component<TreeProps> {
  static TreeNode: typeof AntdTree.TreeNode = AntdTree.TreeNode;
  static TreeParent: typeof TreeParent = TreeParent;
  static TreeSearch: typeof TreeSearch = TreeSearch;

  renderTreeNodes = (data: TreeNodeNormal[], preKey?: string) => {
    const _preKey = preKey || "0";

    const {
      nodeLabel = {
        keyName: "key",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, titleName, childrenName } = nodeLabel;

    return data.map((item, i) => {
      const key = `${_preKey}-${i}`;

      if (item[childrenName as "children"]) {
        return (
          <AntdTree.TreeNode
            title={item[titleName as "title"]}
            key={item[keyName as "key"] || key}
            dataRef={item}
          >
            {this.renderTreeNodes(item[childrenName as "children"] as TreeNodeNormal[], key)}
          </AntdTree.TreeNode>
        );
      }

      return (
        <AntdTree.TreeNode
          key={item[keyName as "key"] || key}
          title={item[titleName as "title"]}
          isLeaf={item.isLeaf}
          disabled={item.disabled}
          disableCheckbox={item.disableCheckbox}
          selectable={item.selectable}
        />
      );
    });
  };

  render() {
    const { checkable = false, treeData, ...otherProps } = this.props;
    if (checkable) {
      return (
        <div className="check_tree">
          {!treeData ? (
            <AntdTree {...otherProps} checkable={checkable} />
          ) : (
            <AntdTree {...otherProps} checkable={checkable}>
              {this.renderTreeNodes(treeData)}
            </AntdTree>
          )}
        </div>
      );
    }

    return !treeData ? (
      <AntdTree className={`${checkable ? "check_tree" : ""}`} {...otherProps} />
    ) : (
      <AntdTree className={`${checkable ? "check_tree" : ""}`} {...otherProps}>
        {this.renderTreeNodes(treeData)}
      </AntdTree>
    );
  }
}

export default Tree;
