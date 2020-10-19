import React, { CSSProperties, ReactNode } from "react";

import { TreeNode, TreeNodeNormal } from "antd/es/tree-select/interface";

import Popover from "../popover";
import Tree from "../tree";

import { SelectContent } from "./SelectContent";
import { TreeFormat, isEveryElementString } from "./treeFormat";

export type CheckedKeys =
  | string[]
  | {
      checked: string[];
      halfChecked: string[];
    };

interface CheckableState {
  treeExpandedKeys: string[];
  checkedKeys: string[];
  visible: boolean;
  stateTreeData: TreeNode[];
  allKeys: number[] | string[];
}

export interface CheckableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (selectKeys: string[], label: any, extra: any) => void;
  value?: string[] | number[];
  treeCheckable?: boolean;
  treeExpandedKeys?: string[];
  placeholder?: ReactNode;
  allowClear?: boolean;
  maxTagCount?: number;
  treeData?: Array<TreeNodeNormal>;
  nodeLabel?: Record<string, string>;
  inputPlaceholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

class Checkable extends React.Component<CheckableProps, CheckableState> {
  private treeFormat: TreeFormat | null;

  constructor(props: CheckableProps) {
    super(props);
    this.state = {
      checkedKeys: [],
      visible: false,
      treeExpandedKeys: [],
      stateTreeData: [],
      allKeys: [],
    };

    this.treeFormat = null;
  }

  componentDidMount() {
    const { value = [], treeExpandedKeys = [], treeData, nodeLabel = {} } = this.props;

    if (Array.isArray(treeData) && treeData.length > 0 && nodeLabel) {
      this.treeFormat = new TreeFormat(treeData, nodeLabel, value);
      this.setState({ stateTreeData: this.treeFormat.transformedSourceTreeData });
    }

    if (Array.isArray(value) && isEveryElementString(value) && this.treeFormat) {
      this.setState({
        checkedKeys: this.treeFormat.initCheckedNode.map((t) => t.key?.toString() || ""),
        treeExpandedKeys,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: CheckableProps) {
    const { value } = nextProps;

    const { nodeLabel = {} } = this.props;
    const { valueName = "value" } = nodeLabel;
    if (
      nextProps.treeData &&
      nextProps.treeData[0] &&
      (!this.props.treeData ||
        !this.props.treeData[0] ||
        this.props.treeData[0][valueName as "value"] !==
          nextProps.treeData[0][valueName as "value"])
    ) {
      this.treeFormat = new TreeFormat(nextProps.treeData, nodeLabel);
      this.setState({
        stateTreeData: this.treeFormat.transformedSourceTreeData,
      });

      if (value && Array.isArray(value) && isEveryElementString(value)) {
        this.setState({
          checkedKeys: this.treeFormat.initCheckedNode.map((t) => t.key?.toString() || ""),
        });
      }
    }
  }

  onSelect = (selectedKeys: string[]) => {
    const { treeCheckable, onChange } = this.props;
    if (!treeCheckable) {
      this.setState({
        checkedKeys: selectedKeys,
        visible: false,
      });

      if (typeof onChange === "function") {
        onChange(selectedKeys, null, null);
      }
    }
  };

  onCheck = (checkedKeys: CheckedKeys) => {
    const { onChange } = this.props;

    if (Array.isArray(checkedKeys)) {
      this.setState({ checkedKeys });
    }

    if (typeof onChange === "function" && this.treeFormat) {
      const { allItem } = this.treeFormat;

      if (Array.isArray(checkedKeys)) {
        const leafs = this.getLeafKeys(checkedKeys);
        onChange(leafs, checkedKeys, allItem);
      } else {
        const leafs = this.getLeafKeys(checkedKeys.checked);
        onChange(leafs, checkedKeys, allItem);
      }
    }
  };

  getLeafKeys = (keys: string[]) => {
    if (this.treeFormat) {
      const { leafs } = this.treeFormat;

      const leafKeys = keys.reduce((res, current) => {
        if (leafs[current]) {
          res.push(leafs[current]);
        }

        return res;
      }, [] as string[]);

      return leafKeys;
    }

    return keys;
  };

  popoverContent = () => {
    // REVIEW api changed Inputplaceholder => inputPlaceholder
    const { treeData, inputPlaceholder = "", treeCheckable } = this.props;
    const { checkedKeys, treeExpandedKeys, visible } = this.state;

    if (!treeData || !treeData.length) {
      return null;
    }

    if (!visible) {
      return null;
    }

    return (
      <div className="tree_content" style={{ width: "100%" }}>
        <Tree.TreeSearch
          expandedKeys={treeExpandedKeys}
          checkedKeys={checkedKeys}
          selectedKeys={checkedKeys}
          treeData={treeData}
          checkable={treeCheckable}
          onCheck={this.onCheck}
          onSelect={this.onSelect}
          inputPlaceholder={inputPlaceholder}
        />
      </div>
    );
  };

  render() {
    const { placeholder = "", allowClear, disabled, style = {}, maxTagCount } = this.props;
    const { width = "" } = style;

    const { checkedKeys, visible, allKeys = [] } = this.state;

    return (
      <div className="checkable_tree" style={{ width }}>
        <Popover
          onVisibleChange={(visible) =>
            this.setState({
              visible: disabled ? false : visible,
            })
          }
          placement="bottomLeft"
          visible={visible}
          content={this.popoverContent()}
          overlayStyle={{ width }}
          overlayClassName="tree_popover"
          trigger="click"
        >
          <div className={disabled ? "disabled" : ""}>
            <SelectContent
              maxTagCount={maxTagCount}
              disabled={disabled}
              open={visible}
              checkedKeys={checkedKeys}
              allKeys={allKeys}
              allowClear={allowClear}
              width={width}
              placeholder={placeholder}
              changeCheckedIds={this.onCheck}
              treeFormat={this.treeFormat}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export { Checkable };
