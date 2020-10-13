/* eslint-disable react/state-in-constructor */
import React from "react";
import { storiesOf } from "@storybook/react";

import { TreeSelect } from "leap-ui";

import markdown from "../markdown/treeselect.md";

import Layout from "../common/layout";

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
      },
    ],
  },
];
class TreeselectRender extends React.Component {
  state = {
    singleValue: "0-1-0",
    multipleValue: ["0-0-0", "0-1-0"],
  };
  singleRender = () => {
    const { singleValue } = this.state;
    return (
      <TreeSelect
        treeData={treeData}
        value={singleValue}
        onChange={(value) => this.setState({ singleValue: value })}
        placeholder="请选择"
        style={{ width: 250 }}
      />
    );
  };
  multiple = () => {
    const { multipleValue } = this.state;
    return (
      <TreeSelect
        treeData={treeData}
        treeCheckable
        value={multipleValue}
        onChange={(value) => this.setState({ multipleValue: value })}
        placeholder="请选择"
        style={{ width: 250 }}
      />
    );
  };
  render() {
    return (
      <Layout
        head="TreeSelect 选择器"
        items={[
          {
            name: "树单选",
            content: (
              <TreeSelect treeData={treeData} placeholder="请选择" style={{ width: 250 }} />
            ),
          },
          {
            name: "禁用",
            content: (
              <TreeSelect
                treeData={treeData}
                disabled
                placeholder="请选择"
                style={{ width: 250 }}
              />
            ),
          },
          {
            name: "默认value值",
            content: this.singleRender(),
          },
          {
            name: "树复选",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                placeholder="请选择"
                style={{ width: 250 }}
              />
            ),
          },
          {
            name: "树复选默认value",
            content: this.multiple(),
          },
          {
            name: "树复选计数",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                placeholder="请选择"
                maxTagCount={1}
                style={{ width: 250 }}
              />
            ),
          },
          {
            name: "树复选溢出",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                placeholder="请选择"
                maxTagCount={0}
                style={{ width: 250 }}
              />
            ),
          },
          {
            name: "带搜索单选",
            content: (
              <TreeSelect
                treeData={treeData}
                placeholder="请选择"
                style={{ width: 250 }}
                showSearch
              />
            ),
          },
          {
            name: "带搜索多选",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                showSearch
                placeholder="请选择"
                style={{ width: 250 }}
                popoverOverlayStyle={{ width: "300px" }}
              />
            ),
          },
          {
            name: "带搜索计数",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                placeholder="请选择"
                maxTagCount={1}
                style={{ width: 250 }}
                showSearch
              />
            ),
          },
          {
            name: "带搜索溢出",
            content: (
              <TreeSelect
                treeData={treeData}
                treeCheckable
                placeholder="请选择"
                maxTagCount={1}
                style={{ width: 250 }}
                showSearch
                popoverOverlayStyle={{ width: "300px" }}
              />
            ),
          },
          {
            name: "父带子复选+单选子级",
            content: <TreeSelect treeData={treeData} placeholder="请选择" parentTree={true} />,
          },
        ]}
      />
    );
  }
}
storiesOf("通用", module).add("TreeSelect 选择器", () => <TreeselectRender />, {
  notes: { markdown },
});
