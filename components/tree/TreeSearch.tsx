import React, { ChangeEvent, ReactNode } from "react";
import * as AntdTreeInterface from "antd/es/tree";
import { Tree as AntdTree } from "antd";
import * as AntdInputInterface from "antd/es/input";

import Input from "../input";

import { TreeSearchTitle } from "./TreeSearchTitle";
import { TreeNodeNormal } from "antd/lib/tree/Tree";

const { TreeNode } = AntdTree;

export interface TreeSearchProps extends AntdTreeInterface.TreeProps {
  searchValue?: string;
  nodeLabel?: Record<string, string>;
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

  private allItems: { key: string; title: ReactNode }[];

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
    arr: { key: string; title: ReactNode }[] = [],
    parent: TreeNodeNormal = { key: "1" },
  ) => {
    if (!Array.isArray(data)) {
      return { obj, arr };
    }

    const {
      nodeLabel = {
        keyName: "key",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName, titleName } = nodeLabel;

    data.forEach((item) => {
      arr.push({ key: item[keyName as "key"], title: item[titleName as "title"] || "" });

      if (Array.isArray(item[childrenName as "children"])) {
        if ((item[childrenName as "children"] as TreeNodeNormal[]).length > 0) {
          this.getObject(item[childrenName as "children"], obj, arr, item);
        }
      }

      // eslint-disable-next-line no-param-reassign
      obj[item[keyName as "key"]] = parent[keyName as "key"] || "";
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

    window.clearTimeout(this.timer);

    if (this.allItems.length > 0) {
      this.timer = window.setTimeout(() => {
        const showKeys = this.allItems
          .reduce((result: string[], item) => {
            const itemTitle: ReactNode = item.title || "";

            if (typeof itemTitle === "string") {
              if (itemTitle.includes(searchValue)) {
                // eslint-disable-next-line no-param-reassign
                result = [`${item.key}`, ...result, ...this.getParentKeys(item.key)];
              }
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
    }

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
      ...reset
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
          {...reset}
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
        keyName: "key",
        titleName: "title",
        childrenName: "children",
      },
    } = this.props;

    const { keyName, childrenName } = nodeLabel;

    return data.map((item) => {
      let className = "";
      if (searchValue && !showKeys.find((ele) => `${item[keyName as "key"]}` === `${ele}`)) {
        className = "hide";
      }

      const title = TreeSearchTitle(item, searchValue, nodeLabel);

      if (Array.isArray(item[childrenName as "children"])) {
        if ((item[childrenName as "children"] as TreeNodeNormal[]).length > 0) {
          return (
            <TreeNode
              title={title}
              key={item[keyName as "key"]}
              className={className}
              disabled={className === "hide"}
            >
              {this.loopRender(item[childrenName as "children"])}
            </TreeNode>
          );
        }
      }

      return (
        <TreeNode
          title={title}
          key={item[keyName as "key"]}
          className={className}
          disabled={className === "hide"}
        />
      );
    });
  };
}

export { TreeSearch };
