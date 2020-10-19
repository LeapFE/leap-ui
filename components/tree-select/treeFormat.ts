import { TreeNodeNormal, TreeNode } from "antd/es/tree-select/interface";

class TreeFormat {
  public readonly allItem: Record<string, TreeNode>;
  public readonly leafs: Record<string, string>;
  public readonly noLeafs: Record<string, boolean>;
  public readonly treeData: Array<TreeNode>;
  public readonly names: Record<string, string>;
  public readonly initValue: string[] | number[];
  public readonly transformedSourceTreeData: TreeNode[];
  public readonly initCheckedNode: TreeNode[];

  constructor(
    treeData: Array<TreeNode>,
    nodeLabel: Record<string, string>,
    initValue?: string[] | number[],
  ) {
    this.allItem = {};
    this.leafs = {};
    this.noLeafs = {};
    this.treeData = treeData;
    this.initValue = initValue || [];
    this.initCheckedNode = [];
    this.names = {
      valueName: "value",
      titleName: "title",
      childrenName: "children",
      parentName: "pid",
      ...nodeLabel,
    };

    this.transformedSourceTreeData = this.transformSourceTreeData(this.treeData);
  }

  transformSourceTreeData(treeData: Array<TreeNode>, parent: TreeNode = {}) {
    const { valueName, titleName, childrenName } = this.names;
    const result: TreeNode[] = [];

    treeData.forEach((item, i) => {
      if (typeof item.value === "string" || typeof item.value === "number") {
        if ((this.initValue as (string | number)[]).includes(item.value)) {
          this.initCheckedNode.push(item);
        }
      }

      result[i] = {
        value: item[valueName as "value"],
        key: item.key,
        title: item[titleName as "title"],
      };

      if (Array.isArray(item.children) && item.children.length > 0) {
        if (childrenName !== "children") {
          result[i].children = item[childrenName as "children"];
        }

        this.transformSourceTreeData(item.children as TreeNodeNormal[], item);

        if (typeof item.value === "string") {
          this.noLeafs[item.value] = true;
        }
      } else if (
        typeof item.value === "string" &&
        typeof parent.value === "string" &&
        typeof item.key === "string"
      ) {
        this.leafs[item.key] = item.value || parent.value;
      }

      // @ts-ignore
      result[i].pid = parent.value || "";

      if (typeof item.key === "string") {
        this.allItem[item.key] = item;
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
