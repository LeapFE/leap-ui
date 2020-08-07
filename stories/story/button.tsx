import React from "react";
import { storiesOf } from "@storybook/react";

import { Button, Icon } from "leap-ui";

import markdown from "../markdown/button.md";

const ButtonGroup = Button.Group;
const buttonRender = () => {
  return (
    <div>
      <div style={{ margin: 20 }}>1.普通按钮(可选不可选)</div>
      <div style={{ display: "flex" }}>
        <div>
          <Button
            type="primary"
            style={{
              marginRight: 50,
              marginLeft: 20,
              marginBottom: 20,
              display: "block",
            }}
          >
            <span>主操作按钮</span>
          </Button>
          <Button
            type="primary"
            disabled
            style={{
              marginRight: 50,
              marginLeft: 20,
              marginBottom: 20,
              display: "block",
            }}
          >
            <span>主操作按钮</span>
          </Button>
        </div>
        <div>
          <Button
            style={{ marginRight: 50, marginBottom: 20, display: "block" }}
          >
            <span>线框按钮/次按钮</span>
          </Button>
          <Button disabled style={{ marginRight: 50, display: "block" }}>
            <span>线框按钮/次按钮</span>
          </Button>
        </div>
        <div>
          <Button
            type="text"
            style={{ marginRight: 50, marginBottom: 20, display: "block" }}
          >
            <span>文字按钮</span>
          </Button>
          <Button
            disabled
            type="text"
            style={{ marginRight: 50, display: "block" }}
          >
            <span>文字按钮</span>
          </Button>
        </div>
        <div
          style={{
            background: "#31333E",
            width: 120,
            height: 120,
            paddingTop: 18,
            paddingLeft: 16,
          }}
        >
          <Button ghost style={{ marginBottom: 20, display: "block" }}>
            <span>幽灵按钮</span>
          </Button>
          <Button disabled ghost style={{ display: "block" }}>
            <span>幽灵按钮</span>
          </Button>
        </div>
      </div>
      <div style={{ margin: 20 }}>2.加图标按钮(有边框)</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 20, marginRight: 30 }}>
          <Button icon="icon-primary">
            <Icon type="heart"></Icon>
            <span>
              <span>已收藏</span>
            </span>
          </Button>
        </div>
        <div style={{ marginRight: 30 }}>
          <Button icon="icon-danger">
            <Icon type="heart"></Icon>
            <span>已收藏</span>
          </Button>
        </div>
        <Button style={{ marginRight: 30, display: "block" }}>
          <Icon type="heart"></Icon>
          <span>已收藏</span>
        </Button>
        <div>
          <Button type="danger">
            <Icon type="rest"></Icon>
            <span>危险按钮</span>
          </Button>
        </div>
      </div>
      <div style={{ margin: 20 }}>3.加图标按钮(无边框)</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 30, marginLeft: 20 }}>
          <Button icon="icon-primary right">
            <span>重要操作</span>
            <Icon type="heart"></Icon>
          </Button>
        </div>
        <div>
          <Button icon="icon-danger right">
            <span>危险操作</span>
            <Icon type="rest"></Icon>
          </Button>
        </div>
      </div>
      <div style={{ margin: 20 }}>4.按钮组</div>
      <div style={{ display: "flex", marginBottom: 30 }}>
        <div style={{ marginRight: 30, marginLeft: 20 }}>
          <ButtonGroup>
            <Button>
              <span>常规班</span>
            </Button>
            <Button>
              <span>短期班</span>
            </Button>
            <Button>
              <span>DEMO班</span>
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup>
            <Button type="primary">新建待售班</Button>
            <Button type="primary" icon="down" />
          </ButtonGroup>
        </div>
      </div>
      <div style={{ marginLeft: 20, marginBottom: 30 }}>
        <ButtonGroup>
          <Button disabled>
            <span>常规班</span>
          </Button>
          <Button disabled>
            <span>短期班</span>
          </Button>
          <Button disabled>
            <span>DEMO班</span>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ marginLeft: 20, marginBottom: 30 }}>
        <ButtonGroup>
          <Button>
            <span>一</span>
          </Button>
          <Button className="active">
            <span>二</span>
          </Button>
          <Button>
            <span>三</span>
          </Button>
          <Button className="active">
            <span>四</span>
          </Button>
          <Button className="active">
            <span>五</span>
          </Button>
          <Button>
            <span>六</span>
          </Button>
          <Button>
            <span>七</span>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ marginLeft: 20, marginBottom: 30 }}>
        <ButtonGroup>
          <Button>
            <span>进班</span>
          </Button>
          <Button className="active">
            <span>订单支付</span>
          </Button>
          <Button>
            <span>转入</span>
          </Button>
          <Button>
            <span>转出</span>
          </Button>
          <Button>
            <span>续费</span>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ marginLeft: 20, marginBottom: 30 }}>
        <ButtonGroup>
          <Button icon="sigle-icon">
            <Icon type="appstore"></Icon>
          </Button>
          <Button icon="sigle-icon">
            <Icon type="appstore"></Icon>
          </Button>
          <Button icon="sigle-icon" className="active">
            <Icon type="appstore"></Icon>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ margin: 20 }}>5.其他按钮</div>
      <div style={{ marginLeft: 20, marginBottom: 30, display: "flex" }}>
        <Button icon="link-icon" style={{ display: "block", marginRight: 30 }}>
          <Icon type="appstore"></Icon>
          <span>分享</span>
        </Button>
        <Button icon="link-icon-primary" style={{ display: "block" }}>
          <span>分享</span>
          <Icon type="appstore"></Icon>
        </Button>
      </div>
    </div>
  );
};
storiesOf("通用", module).add("Button 按钮", () => buttonRender(), {
  notes: { markdown },
});
