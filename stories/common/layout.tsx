import React from "react";

import "./layout.less";

export default function(props) {
  const { head, items = [] } = props;

  return (
    <div style={{ paddingLeft: 20 }} className="custom_component">
      <div className="head">{head}</div>
      <div className="content">
        {items.map((child, key) => (
          <div className="item" key={key}>
            <div className="title">{child.name}</div>
            <div className="main">{child.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
