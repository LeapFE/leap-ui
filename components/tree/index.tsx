import React, { Component } from "react";
import { Tree as AntdTree } from "antd";
import * as AntdTreeInterface from "antd/es/tree";
import { TreeNodeNormal } from "antd/es/tree/Tree";

import { TreeParent } from "./TreeParent";
import { TreeSearch } from "./TreeSearch";

import "./style";

export type NodeLabel = Record<"keyName" | "titleName" | "childrenName", string>;
export interface TreeProps extends AntdTreeInterface.TreeProps {
  nodeLabel?: NodeLabel;
}

class Tree extends Component<TreeProps> {
  // REVIEW api changed
  static TreeNode: typeof AntdTree.TreeNode = AntdTree.TreeNode;
  static TreeParent: typeof TreeParent = TreeParent;
  static TreeSearch: typeof TreeSearch = TreeSearch;

  renderTreeNodes = (data: TreeNodeNormal[]) => {
    const {
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, titleName, childrenName } = nodeLabel;

    return data.map((item) => {
      // @ts-ignore
      if (item[childrenName]) {
        return (
          // @ts-ignore
          <AntdTree.TreeNode title={item[titleName]} key={item[keyName] as string} dataRef={item}>
            {// placeholder comment
            // @ts-ignore
            this.renderTreeNodes(item[childrenName] as TreeNodeNormal[])}
          </AntdTree.TreeNode>
        );
      }
      // @ts-ignore
      return <AntdTree.TreeNode key={item[keyName] as string} title={item[titleName]} {...item} />;
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

// export { AntdTree, AntdTreeInterface };
export default Tree;
