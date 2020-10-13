import React from "react";
import { TreeNodeNormal, AntTreeNodeSelectedEvent } from "antd/es/tree/Tree";
import * as AntdTreeInterface from "antd/es/tree";
import { Tree as AntdTree } from "antd";

import { NodeLabel } from "./";
import { TreeSearchTitle } from "./TreeSearchTitle";

function arrToObj<T extends string | number | symbol>(arr: T[]) {
  return arr.reduce((result, cur) => ({ ...result, [cur]: true }), {});
}

const { TreeNode } = AntdTree;

export interface TreeParentProps extends Omit<AntdTreeInterface.TreeProps, "onSelect"> {
  nodeLabel?: NodeLabel;
  onSelect?: (selectedKeys: string[], allkeys: string[], e: AntTreeNodeSelectedEvent) => void;
}

interface TreeParentState {
  treeData: TreeNodeNormal[];
  searchValue: string;
  choosekeys: string[];
  expandedKeys: string[];
  autoExpandParent: boolean;
}

class TreeParent extends React.Component<TreeParentProps, TreeParentState> {
  // REVIEW typeof keysObj???
  private keysObj: Record<string, any>;

  constructor(props: TreeParentProps) {
    super(props);

    this.state = {
      treeData: [],
      searchValue: "", //搜索的值
      choosekeys: [], //选中的所有key值;选中父级，子集也选中；
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
        choosekeys: selectedKeys,
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

  // REVIEW typeof list??? typeof expandedKeysObj???
  getKeys = (list: any, allkeys: string[], expandedKeysObj: any) => {
    const {
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName } = nodeLabel;

    if (!list || !list.length) {
      return allkeys;
    }

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      allkeys.push(item[keyName]);
      if (item[childrenName] && item[childrenName].length) {
        this.getKeys(item[childrenName], allkeys, expandedKeysObj);
        expandedKeysObj[item[keyName]] = true;
      }
    }

    return {
      allkeys,
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

    let allkeys: string[] = [];
    const curKey = selectedKeys[0];

    let { expandedKeys } = this.state;

    if (curKey) {
      allkeys = [curKey];
    }

    if (curKey && this.keysObj[curKey] && this.keysObj[curKey][childrenName]) {
      const keys = this.getKeys(this.keysObj[curKey][childrenName], allkeys, {
        ...arrToObj(expandedKeys),
        [curKey]: true,
      });

      if (!Array.isArray(keys)) {
        allkeys = keys.allkeys;
        expandedKeys = keys.expandedKeys;
      }
    }

    this.setState({ choosekeys: allkeys, expandedKeys });

    if (typeof onSelect === "function") {
      onSelect(selectedKeys, allkeys, e);
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

    const { searchValue, expandedKeys, autoExpandParent, choosekeys } = this.state;

    const loop = (data?: TreeNodeNormal[]) => {
      if (!Array.isArray(data)) {
        return;
      }

      return data.map((item) => {
        // @ts-ignore
        const itemKey: string = item[keyName];
        // @ts-ignore
        const itemChildren: TreeNodeNormal = item[childrenName];

        // 将所有节点存在keysObj对象中
        if (!this.keysObj[itemKey]) {
          this.keysObj[itemKey] = item;
        }

        const title = TreeSearchTitle(item, searchValue, nodeLabel);
        // REVIEW `choosekeys` maybe not array
        const className = choosekeys.find((ele) => ele === itemKey) ? "choosed" : "";

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
        className="fl_tree_ddd"
        {...otherProps}
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
