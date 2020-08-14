import { TreeNodeNormal } from "antd/es/tree/Tree";

export type NodeLabel = Record<"keyName" | "titleName" | "childrenName", string>;

class TreeFormat {
  private allItem: Record<string, string>;
  private leafs: Record<string, string>;
  private noLeafs: Record<string, string>;
  private treeData: TreeNodeNormal[];
  private names: Record<string, string>;

  constructor(nodeLabel: NodeLabel) {
    this.allItem = {};
    this.leafs = {};
    this.noLeafs = {};
    this.treeData = [];
    this.names = {
      keyName: "value",
      titleName: "title",
      childrenName: "children",
      parentName: "pid",
      ...nodeLabel,
    };
  }

  forItems(treeData: TreeNodeNormal[], parent = {}) {
    const { keyName, titleName, childrenName } = this.names;

    treeData.map((child) => {
      child.value = child[keyName];
      child.title = child[titleName];

      if (child[childrenName] && child[childrenName].length) {
        if (childrenName !== "children") {
          child.children = [...child[childrenName]];
        }

        this.forItems(child.children, child);
        this.noLeafs[child.value] = true;
      } else {
        this.leafs[child.value] = parent.value || "0";
      }

      child.pid = parent.value || "";
      this.allItem[child.value] = child;
    });

    this.treeData = treeData;

    return treeData;
  }
}

export { TreeFormat };
