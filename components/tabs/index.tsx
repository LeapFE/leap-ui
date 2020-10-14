import React, { Component, ReactNode } from "react";
import ClassNames from "classnames";

import { Tabs as AntdTabs } from "antd";
import * as AntdTabsInterface from "antd/es/tabs";

import "./style";

type childProps = {
  key: string;
  renderContent?: (key: string, child: childProps) => ReactNode;
  tab?: string;
};

export interface TabsProps extends AntdTabsInterface.TabsProps {
  data?: childProps[];
  renderContent?: (key: string, child: childProps) => ReactNode;
}

class Tabs extends Component<TabsProps> {
  static TabPane: typeof AntdTabs.TabPane;

  render() {
    const { className, data, renderContent } = this.props;
    if (Array.isArray(data) && data.length > 0) {
      return (
        <AntdTabs className={ClassNames("fl_tabs", className)} {...this.props}>
          {data.map((item, i) => (
            <AntdTabs.TabPane tab={item.tab || `Tab${i + 1}`} key={item.key}>
              {typeof item.renderContent === "function"
                ? item.renderContent(item.key, item)
                : typeof renderContent === "function"
                ? renderContent(item.key, item)
                : null}
            </AntdTabs.TabPane>
          ))}
        </AntdTabs>
      );
    }

    return <AntdTabs {...this.props} className={ClassNames("fl_tabs", className)} />;
  }
}

Tabs.TabPane = AntdTabs.TabPane;

export { AntdTabs, AntdTabsInterface };
export default Tabs;
