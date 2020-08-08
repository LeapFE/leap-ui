import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/index");
  require("../stories/story/button");
  require("../stories/story/cascader");
  require("../stories/story/drawer");
  require("../stories/story/noData");
}

configure(loadStories, module);
