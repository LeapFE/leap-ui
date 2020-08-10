import React, { ChangeEvent } from "react";
import * as AntdTreeInterface from "antd/es/tree";
import { Tree as AntdTree } from "antd";

import { NodeLabel } from "./index";
import Input, { AntdInputInterface } from "../input";

import { TreeSearchTitle } from "./TreeSearchTitle";
import { TreeNodeNormal } from "antd/lib/tree/Tree";

const { TreeNode } = AntdTree;

export interface TreeSearchProps extends AntdTreeInterface.TreeProps {
  searchValue?: string;
  nodeLabel?: NodeLabel;
  checkedKeys?: string[];
  inputPlaceholder?: string;
  inputProps?: AntdInputInterface.InputProps;
  onSearch?: (value: string) => void;
}
interface TreeSearchState {
  searchValue: string;
  expandedKeys: string[];
  autoExpandParent: boolean;
  selectedKeys: string[];
  checkedKeys: string[];
  showKeys: string[];
  idParentIds: Record<string, string>;
}
class TreeSearch extends React.Component<TreeSearchProps, TreeSearchState> {
  private timer: number;
  private allItems: { key: string; title: string }[];
  constructor(props: TreeSearchProps) {
    super(props);

    this.state = {
      searchValue: "", //搜索的值
      expandedKeys: [], //展开的key
      autoExpandParent: true,
      selectedKeys: [],
      checkedKeys: [],
      showKeys: [],
      idParentIds: {},
    };

    this.timer = 0;

    this.allItems = [];
  }

  componentDidMount() {
    const {
      treeData,
      searchValue,
      checkedKeys = [],
      selectedKeys = [],
      expandedKeys = [],
    } = this.props;

    const { obj: idParentIds, arr } = this.getObject(treeData);

    this.allItems = arr;

    this.setState({
      searchValue: searchValue || "",
      checkedKeys: checkedKeys.map(String),
      selectedKeys: selectedKeys.map(String),
      expandedKeys: [...expandedKeys.map(String)],
      idParentIds,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: AntdTreeInterface.TreeProps) {
    if (nextProps.checkedKeys !== this.state.checkedKeys && !this.state.checkedKeys[0]) {
      if (Array.isArray(nextProps.checkedKeys)) {
        this.setState({ checkedKeys: nextProps.checkedKeys });
      }
    }
    if (nextProps.selectedKeys !== this.state.selectedKeys && !this.state.selectedKeys[0]) {
      if (Array.isArray(nextProps.selectedKeys)) {
        this.setState({ selectedKeys: nextProps.selectedKeys });
      }
    }
  }

  getObject = (
    data?: TreeNodeNormal[],
    obj: Record<string, string> = {},
    arr: { key: string; title: string }[] = [],
    parent = {},
  ) => {
    if (!Array.isArray(data)) {
      return { obj, arr };
    }

    const {
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName, titleName } = nodeLabel;

    data.forEach((cur) => {
      // @ts-ignore
      arr.push({ key: cur[keyName], title: cur[titleName] });

      // @ts-ignore
      if (cur[childrenName] && cur[childrenName].length) {
        // @ts-ignore
        this.getObject(cur[childrenName], obj, arr, cur);
      }

      // @ts-ignore
      obj[cur[keyName]] = parent[keyName] || "";
    });

    return { obj, arr };
  };

  onExpand = (expandedKeys: string[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  getParentKeys = (key: string, keys: string[] = []) => {
    const { idParentIds = {} } = this.state;
    if (idParentIds[key]) {
      keys.push(`${idParentIds[key]}`);
      this.getParentKeys(idParentIds[key], keys);
    }
    return keys;
  };

  onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: searchValue },
    } = event;

    clearTimeout(this.timer);

    this.timer = window.setTimeout(() => {
      const showKeys = this.allItems
        .reduce((result: string[], item) => {
          const itemTitle = item.title || "";

          if (itemTitle.includes(searchValue)) {
            result = [`${item.key}`, ...result, ...this.getParentKeys(item.key)];
          }

          return result;
        }, [])
        .filter((item, i, self) => item && self.indexOf(item) === i);

      this.setState({
        expandedKeys: showKeys,
        showKeys,
        autoExpandParent: true,
      });
    }, 500);

    const { onSearch } = this.props;

    this.setState({ searchValue });

    if (typeof onSearch === "function") {
      onSearch(searchValue);
    }
  };

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  onSelect = (selectedKeys: string[], info: AntdTreeInterface.AntTreeNodeSelectedEvent) => {
    const { onSelect } = this.props;

    this.setState({ selectedKeys });

    if (typeof onSelect === "function") {
      onSelect(selectedKeys, info);
    }
  };

  onCheck = (
    checkedKeys:
      | string[]
      | {
          checked: string[];
          halfChecked: string[];
        },
    info: AntdTreeInterface.AntTreeNodeCheckedEvent,
  ) => {
    const { onCheck } = this.props;

    if (Array.isArray(checkedKeys)) {
      this.setState({ checkedKeys });
    }

    if (typeof onCheck === "function") {
      onCheck(checkedKeys, info);
    }
  };

  nullRender = () => {
    const { searchValue, showKeys = [] } = this.state;
    if (searchValue && !showKeys.length) return <div className="tree_null"></div>;
    return null;
  };

  render() {
    const {
      inputPlaceholder,
      checkable,
      className,
      treeData,
      inputProps = {},
      ...otherProps
    } = this.props;

    const { expandedKeys = [], autoExpandParent, checkedKeys, selectedKeys } = this.state;

    return (
      <div className="fl_search_tree_all">
        <Input
          {...inputProps}
          placeholder={inputPlaceholder}
          onChange={(value) => this.onChangeInput(value)}
        />
        {this.nullRender()}
        <AntdTree
          {...otherProps}
          checkedKeys={checkedKeys}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          checkable={checkable}
          className={className}
          onSelect={!checkable ? this.onSelect : undefined}
          onCheck={checkable ? this.onCheck : undefined}
          onExpand={this.onExpand}
          autoExpandParent={autoExpandParent}
        >
          {this.loopRender(treeData)}
        </AntdTree>
      </div>
    );
  }

  loopRender = (data?: TreeNodeNormal[]) => {
    if (!Array.isArray(data)) {
      return;
    }

    const { searchValue, showKeys = [] } = this.state;

    const {
      nodeLabel = {
        keyName: "value",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName } = nodeLabel;

    return data.map((item) => {
      let className = "";
      // @ts-ignore
      if (searchValue && !showKeys.find((ele) => `${item[keyName]}` === `${ele}`)) {
        className = "hide";
      }
      const title = TreeSearchTitle(item, searchValue, nodeLabel);

      // @ts-ignore
      if (Array.isArray(item[childrenName]) && item[childrenName].length > 0) {
        return (
          <TreeNode
            title={title}
            // @ts-ignore
            key={item[keyName]}
            className={className}
            disabled={className === "hide"}
          >
            {// placeholder comment
            // @ts-ignore
            this.loopRender(item[childrenName])}
          </TreeNode>
        );
      }

      return (
        <TreeNode
          title={title}
          // @ts-ignore
          key={item[keyName]}
          className={className}
          disabled={className === "hide"}
        />
      );
    });
  };
}

export { TreeSearch };
