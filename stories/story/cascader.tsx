import React from "react";
import { storiesOf } from "@storybook/react";

import { Cascader } from "leap-ui";

import markdown from "../markdown/cascader.md";

function onChange(value) {
  // eslint-disable-next-line no-console
  console.log(value);
}
const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const cascaderRender = () => {
  return (
    <div style={{ marginTop: 20, marginLeft: 20 }}>
      <Cascader style={{ width: 284 }} options={options} onChange={onChange} placeholder="请选择" />
    </div>
  );
};
storiesOf("通用", module).add("Cascader 级联选择", () => cascaderRender(), {
  notes: { markdown },
});
