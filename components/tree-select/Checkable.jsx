/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Popover from "../popover";
import Tree from "../tree";

import { SelectContent } from "./SelectContent";
import TreeFormat from "./treeFormat";

export default class Checkable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      visible: false,
      treeExpandedKeys: [],
      stateTreeData: [],
      allKeys: [],
    };
  }

  componentDidMount() {
    const { treeData = [], value = [], nodeLabel = {}, treeExpandedKeys = [] } = this.props;
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
      this.setState({
        checkedKeys: nextProps.value,
      });
    }
  }

  onSelect = (selectedIds) => {
    const { treeCheckable, onChange } = this.props;
    if (!treeCheckable) {
      this.setState({
        checkedKeys: selectedIds,
        visible: false,
      });
      if (typeof onChange === "function") {
        onChange(selectedIds);
      }
    }
  };

  onCheck = (checkedIds) => {
    const leafIds = this.getLeafKeys(checkedIds);
    this.changeCheckedIds(leafIds, checkedIds);
    // leafIds：选中的叶子节点 checkedIds：选中的所有节点
  };

  getLeafKeys = (keys) => {
    if (this.treeFormat) {
      const { leafs = {} } = this.treeFormat;
      const leafKeys = keys.reduce((result, cur) => {
        if (leafs[cur]) result.push(cur);
        return result;
      }, []);
      return leafKeys;
    }
    return keys;
  };

  changeCheckedIds = (checkedKeys = [], allKeys = []) => {
    const { allItem } = this.treeFormat;
    const { onChange } = this.props;
    this.setState({ checkedKeys, allKeys });
    if (typeof onChange === "function") {
      onChange(checkedKeys, allKeys, allItem);
    }
  };

  popoverContent = () => {
    // REVIEW api changed Inputplaceholder => inputPlaceholder
    const { treeData, inputPlaceholder = "", treeCheckable, nodeLabel } = this.props;
    const { checkedKeys, treeExpandedKeys, stateTreeData, visible } = this.state;
    if (!treeData || !treeData.length) return null;
    return (
      <div className="tree_content" style={{ width: "100%" }}>
        {visible ? (
          <Tree.TreeSearch
            expandedKeys={treeExpandedKeys}
            checkedKeys={checkedKeys}
            selectedKeys={checkedKeys}
            treeData={nodeLabel ? stateTreeData : treeData}
            checkable={treeCheckable}
            onCheck={this.onCheck}
            onSelect={this.onSelect}
            inputPlaceholder={inputPlaceholder}
          />
        ) : null}
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
              treeFormat={this.treeFormat}
              checkedKeys={checkedKeys}
              allKeys={allKeys}
              allowClear={allowClear}
              width={width}
              placeholder={placeholder}
              changeCheckedIds={this.changeCheckedIds}
            />
          </div>
        </Popover>
      </div>
    );
  }
}
