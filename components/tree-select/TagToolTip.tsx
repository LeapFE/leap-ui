import React from "react";

export type TreeFormat = {
  leafs?: Record<string, string>;
  allItem?: Record<string, { title?: string }>;
};
const TagToolTip = (label: number[] | string[] = [], maxTagCount = 0, treeFormat: TreeFormat) => {
  if (!label.length) return null;

  if (treeFormat) {
    const { leafs = {}, allItem = {} } = treeFormat;

    // REVIEW typeof keysGroup
    const keysGroup: Record<string, any[]> = {};

    label.forEach((child: string | number) => {
      const pid = leafs[child];

      if (pid) {
        if (!keysGroup[pid]) keysGroup[pid] = [];
        const item = allItem[child] || {};
        keysGroup[pid].push(item.title);
      }
    });

    const treeRender = [];

    for (const key in keysGroup) {
      const parent = allItem[key] || {};
      const children = keysGroup[key] || [];

      treeRender.push(
        <div className="tag_item" key={key}>
          <span>
            {parent.title}
            {children.length ? ": " : ""}
          </span>
          <span>{children.join("-")}</span>
        </div>,
      );
    }
    return <div className="tag_tooltip">{treeRender}</div>;
  }

  if (label.length > maxTagCount) {
    return <div className="tag_tooltip">{label.join("、")}</div>;
  }

  return null;
};

export { TagToolTip };
