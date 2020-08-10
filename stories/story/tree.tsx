import React from "react";
import { storiesOf } from "@storybook/react";

import { Tree } from "leap-ui";

import markdown from "../markdown/tree.md";

import Layout from "../common/layout";

const { TreeParent, TreeSearch } = Tree;

const Data = [
  {
    title: "0-0",
    value: "0-0",
    children: [
      {
        title: "0-0-0",
        value: "0-0-0",
        children: [
          { title: "0-0-0-0", value: "0-0-0-0" },
          { title: "0-0-0-1", value: "0-0-0-1" },
          { title: "0-0-0-2", value: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        value: "0-0-1",
        children: [
          { title: "0-0-1-0", value: "0-0-1-0" },
          { title: "0-0-1-1", value: "0-0-1-1" },
          { title: "0-0-1-2", value: "0-0-1-2" },
        ],
      },
      { title: "0-0-2", value: "0-0-2" },
    ],
  },
  {
    title: "0-1",
    value: "0-1",
    children: [
      {
        title: "0-1-0",
        value: "0-1-0",
        children: [
          { title: "0-1-0-0", value: "0-1-0-0" },
          { title: "0-1-0-1", value: "0-1-0-1" },
          { title: "0-1-0-2", value: "0-1-0-2" },
        ],
      },
      {
        title: "0-1-1",
        value: "0-1-1",
        children: [
          { title: "0-1-1-0", value: "0-1-1-0" },
          { title: "0-1-1-1", value: "0-1-1-1" },
          { title: "0-1-1-2", value: "0-1-1-2" },
        ],
      },
      { title: "0-1-2", value: "0-1-2" },
    ],
  },
  { title: "0-2", value: "0-2" },
];
const onSelect = (selectedKeys, allchoosekeys) => {
  console.log(selectedKeys, allchoosekeys, "selectedKeys, allchoosekeys");
};
const onCheck = (checkedKeys) => {
  console.log(checkedKeys, "checkedKeys");
};

class TreeRender extends React.Component {
  render() {
    return (
      <Layout
        head="Tree"
        items={[
          {
            name: "树单选",
            content: <Tree treeData={Data}></Tree>,
          },
          {
            name: "父带子复选/单选子级均可",
            content: (
              <TreeParent
                treeData={Data}
                onSelect={(selectedKeys, allchoosekeys) => onSelect(selectedKeys, allchoosekeys)}
              ></TreeParent>
            ),
          },
          {
            name: "树复选",
            content: <Tree treeData={Data} checkable></Tree>,
          },
          {
            name: "带搜索（树单）",
            content: (
              <TreeSearch
                inputPlaceholder="请输入"
                treeData={Data}
                checkable={false}
                onSelect={(selectedKeys) => onSelect(selectedKeys)}
              ></TreeSearch>
            ),
          },
          {
            name: "带搜索（复选）",
            content: (
              <TreeSearch
                inputPlaceholder="请输入"
                treeData={Data}
                checkable={true}
                onSelect={(selectedKeys) => onSelect(selectedKeys)}
              />
            ),
          },
        ]}
      />
    );
  }
}
storiesOf("通用", module).add("Tree 选择器", () => <TreeRender />, {
  notes: { markdown },
});
