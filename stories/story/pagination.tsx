import React from "react";
import { storiesOf } from "@storybook/react";

import { Pagination } from "leap-ui";

import md from "./../markdown/pagination.md";

const paginationRender = () => {
  return (
    <div>
      <h3 style={{ margin: 20 }}>1.常规开关</h3>
      <div style={{ margin: 20 }}>
        <div style={{ margin: "30px 20px" }}>
          <Pagination defaultCurrent={2} total={100} />
        </div>
      </div>
    </div>
  );
};

storiesOf("通用", module).add("Pagination 分页", () => paginationRender(), { notes: md });
