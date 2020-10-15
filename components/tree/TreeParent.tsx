import React from "react";
import { TreeNodeNormal, AntTreeNodeSelectedEvent } from "antd/es/tree/Tree";
import * as AntdTreeInterface from "antd/es/tree";
import { Tree as AntdTree } from "antd";

import { TreeSearchTitle } from "./TreeSearchTitle";

function arrToObj<T extends string | number | symbol>(arr: T[]): Record<string, boolean> {
  return arr.reduce((result, cur) => ({ ...result, [cur]: true }), {});
}

const { TreeNode } = AntdTree;

export interface TreeParentProps extends Omit<AntdTreeInterface.TreeProps, "onSelect"> {
  nodeLabel?: Record<string, string>;
  onSelect?: (selectedKeys: string[], allKeys: string[], e: AntTreeNodeSelectedEvent) => void;
}

interface TreeParentState {
  treeData: TreeNodeNormal[];
  searchValue: string;
  selectedKeys: string[];
  expandedKeys: string[];
  autoExpandParent: boolean;
}

class TreeParent extends React.Component<TreeParentProps, TreeParentState> {
  private keysObj: Record<string, TreeNodeNormal>;

  constructor(props: TreeParentProps) {
    super(props);

    this.state = {
      treeData: [],
      searchValue: "", //搜索的值
      selectedKeys: [], //选中的所有key值;选中父级，子集也选中；
      expandedKeys: [], //展开的key
      autoExpandParent: true,
    };

    this.keysObj = {};
  }

  componentDidMount() {
    const { expandedKeys, selectedKeys = [] } = this.props;

    // 从props中获取默认的expandedKeys;
    if (expandedKeys && expandedKeys.length) {
      this.setState({
        expandedKeys: [...expandedKeys, ...selectedKeys],
        selectedKeys: selectedKeys,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: TreeParentProps) {
    // 从props中获取默认的expandedKeys;
    if (nextProps.expandedKeys && !this.props.expandedKeys) {
      this.setState({
        expandedKeys: nextProps.expandedKeys,
      });
    }
  }

  onExpand = (expandedKeys: string[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  getKeys = (
    allKeys: string[],
    expandedKeysObj: Record<string, boolean>,
    list?: TreeNodeNormal[],
  ) => {
    const {
      nodeLabel = {
        keyName: "key",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName } = nodeLabel;

    if (!list || !list.length) {
      return allKeys;
    }

    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      allKeys.push(item[keyName as "key"]);

      if (Array.isArray(item[childrenName as "children"])) {
        if ((item[childrenName as "children"] as TreeNodeNormal[]).length > 0) {
          this.getKeys(allKeys, expandedKeysObj, item[childrenName as "children"]);

          // eslint-disable-next-line no-param-reassign
          expandedKeysObj[item[keyName as "key"]] = true;
        }
      }
    }

    return {
      allKeys,
      expandedKeys: Object.keys(expandedKeysObj),
    };
  };

  onSelect = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    const {
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
      onSelect,
    } = this.props;
    const { childrenName } = nodeLabel;

    let allKeys: string[] = [];
    const curKey = selectedKeys[0];

    let { expandedKeys } = this.state;

    if (curKey) {
      allKeys = [curKey];
    }

    if (curKey && this.keysObj[curKey] && this.keysObj[curKey][childrenName as "children"]) {
      const keys = this.getKeys(
        allKeys,
        {
          ...arrToObj(expandedKeys),
          [curKey]: true,
        },
        this.keysObj[curKey][childrenName as "children"],
      );

      if (!Array.isArray(keys)) {
        allKeys = keys.allKeys;
        expandedKeys = keys.expandedKeys;
      }
    }

    this.setState({ selectedKeys: allKeys, expandedKeys });

    if (typeof onSelect === "function") {
      onSelect(selectedKeys, allKeys, e);
    }
  };

  render() {
    const {
      treeData,
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
      ...otherProps
    } = this.props;

    const { keyName, childrenName } = nodeLabel;

    const { searchValue, expandedKeys, autoExpandParent, selectedKeys } = this.state;

    const loop = (data?: TreeNodeNormal[]) => {
      if (!Array.isArray(data)) {
        return;
      }

      return data.map((item) => {
        const itemKey: string = item[keyName as "key"];
        const itemChildren: TreeNodeNormal[] | undefined = item[childrenName as "children"];

        // 将所有节点存在 keysObj 对象中
        if (!this.keysObj[itemKey]) {
          this.keysObj[itemKey] = item;
        }

        const title = TreeSearchTitle(item, searchValue, nodeLabel);

        const className = Array.isArray(selectedKeys)
          ? selectedKeys.find((ele) => ele === itemKey)
            ? "choosed"
            : ""
          : "";

        if (Array.isArray(itemChildren)) {
          return (
            <TreeNode title={title} key={itemKey} className={className}>
              {loop(itemChildren)}
            </TreeNode>
          );
        }

        return <TreeNode title={title} key={itemKey} className={className}></TreeNode>;
      });
    };
    return (
      <AntdTree
        {...otherProps}
        className="fl_tree_ddd"
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
      >
        {loop(treeData)}
      </AntdTree>
    );
  }
}

export { TreeParent };
