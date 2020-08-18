/* eslint-disable react/jsx-filename-extension */
import React from "react";

import Popover from "../popover";
import Tree from "../tree";

import TreeFormat from "./treeFormat";

import ParentSelectMain from "./ParentSelectMain";

export default class ParentTreeSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedKeys: [],
      visible: false,
      treeExpandedKeys: [],
      stateTreeData: [],
    };
  }
  componentDidMount() {
    const { treeData, value = [], nodeLabel = {}, treeExpandedKeys = [] } = this.props;
    if (treeData && treeData.length && nodeLabel) {
      // 只有这两个值都传 才会处理treeData 获取allItem、leafs、noLeafs;
      this.treeFormat = new TreeFormat(treeData, nodeLabel);
      this.setState({
        stateTreeData: this.treeFormat.forItems(treeData),
      });
    }
    this.setState({
      checkedKeys: value,
      treeExpandedKeys: [...treeExpandedKeys, ...value],
      selectedKeys: value,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { nodeLabel = {} } = this.props;
    const { keyName = "value" } = nodeLabel;
    if (
      nextProps.treeData &&
      nextProps.treeData[0] &&
      (!this.props.treeData ||
        !this.props.treeData[0] ||
        this.props.treeData[0][keyName] !== nextProps.treeData[0][keyName])
    ) {
      // 只有这两个值都传 才会处理treeData 获取allItem、leafs、noLeafs;
      this.treeFormat = new TreeFormat(nextProps.treeData, nodeLabel);
      this.setState({
        stateTreeData: this.treeFormat.forItems(nextProps.treeData),
      });
    }
    if (nextProps.value && nextProps.value[0] && !this.state.checkedKeys[0]) {
      this.setState({ checkedKeys: nextProps.value });
    }
  }

  onSelect = (_, allKeys) => {
    const { onChange } = this.props;
    this.setState({ checkedKeys: allKeys, visible: false });

    if (typeof onChange === "function") {
      onChange(allKeys)
    };
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
    const { width = "", placeholder = "", disabled } = this.props;
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
          overlayStyle={{ width }}
          overlayClassName="tree_popover parent_popover"
          trigger="click"
        >
          <div className={disabled ? "disabled" : disabled}>
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
