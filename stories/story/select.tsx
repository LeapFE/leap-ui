import React from "react";
import { storiesOf } from "@storybook/react";

import { Slider } from "leap-ui";

import markdown from "../markdown/slider.md";

const sliderRender = () => {
  return (
    <div>
      <h3 style={{ margin: 20 }}>1.文本输入框</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: "30px 20px" }}>
          <Slider defaultValue={20} />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Slider disabled />
        </div>
      </div>
      <h3 style={{ margin: 20 }}>2.双滑块</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: "30px 20px" }}>
          <Slider range defaultValue={[20, 50]} />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Slider range customBotMark={["MIN", "MAX"]} max={30} min={0} value={[11, 20]} />
        </div>
      </div>
      <div>
        <div style={{ margin: "30px 20px" }}>
          <Slider range max={100} min={0} defaultValue={[11, 40]} input={true} />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Slider width={200} range max={100} min={0} defaultValue={[11, 40]} input={true} />
        </div>
      </div>
    </div>
  );
};
storiesOf("通用", module).add("Slider 滑块", () => sliderRender(), {
  notes: { markdown },
});
