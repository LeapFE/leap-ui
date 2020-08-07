import React from "react";
import { storiesOf } from "@storybook/react";

import markdown from "./index.md";

storiesOf("综述", module).add(
  "介绍",
  () => (
    <div>
      <div style={{ fontSize: 34, fontWeight: 500 }}>{name}</div>
      <div>leap-ui是基于antd design封装的一个ui组件库</div>
    </div>
  ),
  {
    notes: { markdown },
  },
);
