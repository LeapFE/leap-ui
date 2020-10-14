import { TreeNodeNormal, TreeNode } from "antd/es/tree-select/interface";

class TreeFormat {
  public readonly allItem: Record<string, TreeNode>;
  public readonly leafs: Record<string, string>;
  public readonly noLeafs: Record<string, boolean>;
  public readonly treeData: Array<TreeNode>;
  public readonly names: Record<string, string>;

  constructor(treeData: Array<TreeNode>, nodeLabel: Record<string, string>) {
    this.allItem = {};
    this.leafs = {};
    this.noLeafs = {};
    this.treeData = treeData;
    this.names = {
      valueName: "value",
      titleName: "title",
      childrenName: "children",
      parentName: "pid",
      ...nodeLabel,
    };
  }

  transformerSourceTreeData(treeData: Array<TreeNode>, parent: TreeNode = {}) {
    const { valueName, titleName, childrenName } = this.names;
    const result: TreeNode[] = [];

    treeData.forEach((item, i) => {
      result[i] = {
        value: item[valueName as "value"],
        key: item.key,
        title: item[titleName as "title"],
      };

      if (Array.isArray(item.children) && item.children.length > 0) {
        if (childrenName !== "children") {
          result[i].children = item[childrenName as "children"];
        }

        this.transformerSourceTreeData(item.children as TreeNodeNormal[], item);
        if (typeof item.value === "string") {
          this.noLeafs[item.value] = true;
        }
      } else if (typeof item.value === "string" && typeof parent.value === "string") {
        this.leafs[item.value] = parent.value || item.value;
      }

      // @ts-ignore
      result[i].pid = parent.value || "";

      if (typeof item.value === "string") {
        this.allItem[item.value] = item;
      }
    });

    return result;
  }
}

export function isEveryElementNumber(value: unknown[]): value is number[] {
  return value.every((v) => typeof v === "number");
}

export function isEveryElementString(value: unknown[]): value is string[] {
  return value.every((v) => typeof v === "string");
}

export { TreeFormat };
