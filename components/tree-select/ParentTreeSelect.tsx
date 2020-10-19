import React, { ReactNode, CSSProperties } from "react";
import ClassNames from "classnames";

import Popover from "../popover";
import Tree from "../tree";

import { isEveryElementString, TreeFormat } from "./treeFormat";

import { ParentSelectMain } from "./ParentSelectMain";
import { TreeNode, TreeNodeNormal } from "antd/es/tree-select/interface";

interface ParentTreeSelectProps {
  nodeLabel?: Record<string, string>;
  treeData?: Array<TreeNodeNormal>;
  treeExpandedKeys?: string[];
  value?: string[];
  width?: string | number;
  placeholder?: ReactNode;
  disabled?: boolean;
  popoverOverlayStyle?: CSSProperties;
  popoverOverlayClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (selectKeys: string[], label: any, extra: any) => void;
}

interface ParentTreeSelectState {
  treeExpandedKeys: string[];
  checkedKeys: string[];
  visible: boolean;
  stateTreeData: TreeNode[];
  selectedKeys: string[];
}

class ParentTreeSelect extends React.Component<ParentTreeSelectProps, ParentTreeSelectState> {
  private treeFormat: TreeFormat | null;

  constructor(props: ParentTreeSelectProps) {
    super(props);

    this.state = {
      checkedKeys: [],
      visible: false,
      treeExpandedKeys: [],
      stateTreeData: [],
      selectedKeys: [],
    };

    this.treeFormat = null;
  }
  componentDidMount() {
    const { treeData, value = [], nodeLabel = {}, treeExpandedKeys = [] } = this.props;
    if (treeData && treeData.length && nodeLabel) {
      this.treeFormat = new TreeFormat(treeData, nodeLabel, value);
      this.setState({
        stateTreeData: this.treeFormat.transformedSourceTreeData,
      });
    }

    if (Array.isArray(value) && isEveryElementString(value) && this.treeFormat) {
      const keys = this.treeFormat.initCheckedNode.map((t) => t.key?.toString() || "");
      this.setState({
        checkedKeys: keys,
        treeExpandedKeys,
        selectedKeys: keys,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: ParentTreeSelectProps) {
    const { nodeLabel = {} } = this.props;
    const { valueName = "value" } = nodeLabel;
    const { value } = nextProps;

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
          checkedKeys: value,
        });
      }
    }
  }

  onSelect = (selectedKeys: string[], allKeys: string[]) => {
    const { onChange } = this.props;
    this.setState({ checkedKeys: allKeys, visible: false });

    if (typeof onChange === "function") {
      onChange(selectedKeys, allKeys, this.treeFormat?.allItem);
    }
  };

  popoverContent = () => {
    const { treeData, treeExpandedKeys } = this.props;

    const { selectedKeys } = this.state;
    return (
      <div className="tree_content" style={{ width: "100%" }}>
        <Tree.TreeParent
          selectedKeys={selectedKeys}
          expandedKeys={treeExpandedKeys}
          treeData={treeData}
          onSelect={this.onSelect}
        />
      </div>
    );
  };

  render() {
    const {
      width = "",
      placeholder = "",
      disabled,
      popoverOverlayStyle,
      popoverOverlayClassName,
    } = this.props;

    const { checkedKeys, visible } = this.state;

    return (
      <div className="checkable_tree">
        <Popover
          onVisibleChange={(visible) =>
            this.setState({
              visible: disabled ? false : visible,
            })
          }
          visible={visible}
          content={this.popoverContent()}
          overlayStyle={{ width, ...popoverOverlayStyle }}
          overlayClassName={ClassNames("tree_popover parent_popover", popoverOverlayClassName)}
          trigger="click"
        >
          <div className={disabled ? "disabled" : ""}>
            <ParentSelectMain
              treeFormat={this.treeFormat}
              open={visible}
              checkedKeys={checkedKeys}
              width={width}
              placeholder={placeholder}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export { ParentTreeSelect };
