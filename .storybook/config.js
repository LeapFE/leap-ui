import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/index");
  require("../stories/story/button");
  require("../stories/story/cascader");
}

configure(loadStories, module);
