import React from "react";

import { TreeFormat } from "./treeFormat";

const TagToolTip = (label: number[] | string[] = [], maxTagCount = 0, treeFormat?: TreeFormat | null) => {
  if (!label.length) return null;

  if (treeFormat) {
    const { leafs = {}, allItem = {} } = treeFormat;

    const keysGroup: Record<string, React.ReactNode[]> = {};

    label.forEach((child: string | number) => {
      const pid = leafs[child];

      if (pid) {
        if (!keysGroup[pid]) {
          keysGroup[pid] = [];
        }

        const item = allItem[child] || {};
        keysGroup[pid].push(item.title);
      }
    });

    const treeRender: JSX.Element[] = [];

    for (const key in keysGroup) {
      const parent = allItem[key] || {};
      const children = keysGroup[key] || [];

      treeRender.push(
        <div className="tag_item" key={key}>
          {parent.title ? (
            <div>
              <span>
                {parent.title}
                {parent.children ? ": " : ""}
              </span>
              {parent.children ? (
                <span>{children.join("-")}</span>
              ) : (
                <span>{parent.title}</span>
              )}
            </div>
          ) : (
            <span>{children[0]}</span>
          )}
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
