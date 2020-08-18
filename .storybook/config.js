import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/index");
  require("../stories/story/button");
  require("../stories/story/cascader");
  require("../stories/story/input");
  require("../stories/story/drawer");
  require("../stories/story/noData");
  require("../stories/story/notification");
  require("../stories/story/pagination");
  require("../stories/story/select");
  require("../stories/story/slider");
  require("../stories/story/switch");
  require("../stories/story/table");
  require("../stories/story/tree");
  require("../stories/story/modal");
  require("../stories/story/treeselect");
}

configure(loadStories, module);
