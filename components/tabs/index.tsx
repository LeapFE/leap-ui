import React, { Component, ReactNode } from "react";
import ClassNames from "classnames";

import { Tabs as AntdTabs } from "antd";
import * as AntdTabsInterface from "antd/es/tabs";

import "./style";

export interface TabsProps extends AntdTabsInterface.TabsProps {
  // REVIEW what typeof datas??
  datas?: any[];
  tabKey?: string;
  // REVIEW typeof child ???
  renderContent?: (key: number, child: any) => ReactNode;
}

class Tabs extends Component<TabsProps> {
  static TabPane: typeof AntdTabs.TabPane;

  render() {
    const { className, datas, tabKey, renderContent } = this.props;

    if (datas && datas.length) {
      return (
        <Tabs className={ClassNames("fl_tabs", className)} {...this.props}>
          {datas.map((child, key) => (
            <AntdTabs.TabPane tab={child[tabKey || "tab"]} key={child.key || key}>
              {child.renderContent || (renderContent ? renderContent(child.key, child) : "")}
            </AntdTabs.TabPane>
          ))}
        </Tabs>
      );
    }
    return <AntdTabs {...this.props} className={ClassNames("fl_tabs", className)} />;
  }
}

Tabs.TabPane = AntdTabs.TabPane;

// export { AntdTabs, AntdTabsInterface };
export default Tabs;
