import React from "react";
import { TreeNodeNormal } from "antd/es/tree/Tree";

const TreeSearchTitle = (
  item: TreeNodeNormal,
  searchValue: string,
  nodeLabel: Record<string, string>,
) => {
  const { titleName } = nodeLabel;

  const itemTitle: string = (item[titleName as "title"] as string) || "";

  const index = itemTitle.indexOf(searchValue);

  let title = <span>{itemTitle}</span>;

  if (index >= 0) {
    const titleList = itemTitle.split(searchValue);

    title = (
      <span>
        {titleList.map((child, key) => {
          if (key === 0) return <span key={key}>{child}</span>;
          return (
            <span key={key}>
              <span
                style={{
                  color: "rgba(42, 93, 255, 1)",
                }}
              >
                {searchValue}
              </span>
              {child}
            </span>
          );
        })}
      </span>
    );
  }

  return title;
};

export { TreeSearchTitle };
