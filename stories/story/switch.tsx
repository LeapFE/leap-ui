import React from "react";
import { storiesOf } from "@storybook/react";

import { Switch } from "leap-ui";

import markdown from "../markdown/switch.md";

const switchRender = () => {
  return (
    <div>
      <h3 style={{ margin: 20 }}>1.常规开关</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: "30px 20px" }}>
          <Switch />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Switch size="small" />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Switch disabled />
        </div>
      </div>
      <h3 style={{ margin: 20 }}>2.文字</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: "30px 20px" }}>
          <Switch checkedChildren="开" unCheckedChildren="关" />
        </div>
        <div style={{ margin: "30px 20px" }}></div>
        <div style={{ margin: "30px 20px" }}>
          <Switch className="switch_show" checkedChildren="启用" unCheckedChildren="禁用" />
        </div>
      </div>
    </div>
  );
};
storiesOf("通用", module).add("Switch 开关", () => switchRender(), {
  notes: { markdown },
});
