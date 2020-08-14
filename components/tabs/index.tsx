import React, { Component, ReactNode } from "react";
import ClassNames from "classnames";

import { Tabs as AntdTabs } from "antd";
import * as AntdTabsInterface from "antd/es/tabs";

import "./style";
type TabKey = string;
type childProps = {
  key?: number;
  renderContent?: (key: number, child: any) => ReactNode;
  [tabKey: string]: any; //-------REVIEW 我想通过props.tabKey的 来定制TabPane.tab的取值 我要如何定义这个类型
};
export interface TabsProps extends AntdTabsInterface.TabsProps {
  // --REVIEW what typeof datas??
  datas?: childProps[];
  tabKey?: TabKey;
  // --REVIEW typeof child ???
  renderContent?: (key: number | undefined, child: any) => ReactNode;
}

class Tabs extends Component<TabsProps> {
  static TabPane: typeof AntdTabs.TabPane;

  render() {
    const { className, datas, tabKey = "tab", renderContent } = this.props;
    if (datas && datas.length) {
      return (
        <Tabs className={ClassNames("fl_tabs", className)} {...this.props}>
          {datas.map((child, key) => (
            <AntdTabs.TabPane
              tab={child[tabKey]}
              key={(child.key === undefined ? key : child.key).toString()}
            >
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

export { AntdTabs, AntdTabsInterface };
export default Tabs;
