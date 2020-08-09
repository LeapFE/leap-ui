/* eslint-disable react/state-in-constructor */
import React from "react";
import { storiesOf } from "@storybook/react";

import { Modal, Button, Icon } from "leap-ui";
import markdown from "../markdown/modal.md";

import Layout from "../common/layout";

class ModalRender extends React.Component {
  state = {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
  };

  confirm = () => {
    Modal.confirm({
      width: 460,
      title: "确定要删除该班级吗？",
      content: "如果删除该班级，则该班级所有内容将不会修复！请慎重操作！",
      okText: "删除",
      cancelText: "取消",
      onOk() {},
      onCancel() {},
    });
  };
  info = () => {
    Modal.info({
      width: 460,
      title: "确定要删除该班级吗？",
      content: "如果删除该班级，则该班级所有内容将不会修复！请慎重操作！",
      okText: "确定",
      onOk() {},
    });
  };
  render() {
    return (
      <Layout
        head="modal 对话框"
        items={[
          {
            name: "普通modal",
            content: (
              <>
                <Button type="primary" onClick={() => this.setState({ visible1: true })}>
                  普通modal
                </Button>
                <Modal
                  title="普通modal"
                  visible={this.state.visible1}
                  footer={
                    <div>
                      <Button type="primary" onClick={() => this.setState({ visible1: false })}>
                        确认
                      </Button>
                      <Button onClick={() => this.setState({ visible1: false })}>取消</Button>
                    </div>
                  }
                  onCancel={() => this.setState({ visible1: false })}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </>
            ),
          },
          {
            name: "没有footer的modal",
            content: (
              <>
                <Button type="primary" onClick={() => this.setState({ visible3: true })}>
                  没有footer的modal
                </Button>
                <Modal
                  className="modal_scroll"
                  title="超限制模态弹出框"
                  visible={this.state.visible3}
                  onOk={() => this.setState({ visible3: false })}
                  onCancel={() => this.setState({ visible3: false })}
                  okText="确认"
                  cancelText="取消"
                  footer={false}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </>
            ),
          },
          {
            name: "高度超出限制modal",
            content: (
              <>
                <Button type="primary" onClick={() => this.setState({ visible2: true })}>
                  超出限制modal
                </Button>
                <Modal
                  className="modal_scroll"
                  title="超限制模态弹出框"
                  visible={this.state.visible2}
                  onCancel={() => this.setState({ visible2: false })}
                  footer={
                    <div>
                      <Button type="primary" onClick={() => this.setState({ visible2: false })}>
                        确认
                      </Button>
                      <Button onClick={() => this.setState({ visible2: false })}>取消</Button>
                    </div>
                  }
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </>
            ),
          },

          {
            name: "警告单行文字(固定宽度)",
            content: (
              <>
                <Button type="primary" onClick={() => this.setState({ visible4: true })}>
                  警告单行文字1modal
                </Button>
                <Modal.Single
                  single_btn={false}
                  fl_single_ok={"确定"}
                  fl_single_cancel={"取消"}
                  fl_onChange={() => {
                    this.setState({ visible4: false });
                  }}
                  fl_onCancel={() => this.setState({ visible4: false })}
                  width={461}
                  visible={this.state.visible4}
                  fl_icon_title={<Icon type="exclamation-circle" theme="filled" />}
                  fl_content={"确定要退出登录吗？退出登录后，将不会删除任何数据~"}
                ></Modal.Single>
              </>
            ),
          },
          {
            name: "警告单行文字2(固定宽度)",
            content: (
              <>
                <Button type="primary" onClick={() => this.setState({ visible5: true })}>
                  警告单行文字modal
                </Button>
                <Modal.Single
                  fl_single_btn={true}
                  fl_single_text={"知道了"}
                  fl_onChange={() => {
                    this.setState({ visible5: false });
                  }}
                  width={461}
                  visible={this.state.visible5}
                  fl_icon_title={<Icon type="exclamation-circle" theme="filled" />}
                  fl_content={"确定要退出登录吗？退出登录后，将不会删除任何数据~"}
                ></Modal.Single>
              </>
            ),
          },
          {},
          {
            name: "警告带标题1(固定宽度)",
            content: (
              <>
                <Button type="primary" onClick={this.confirm}>
                  警告带标题1modal
                </Button>
              </>
            ),
          },
          {
            name: "警告带标题2(固定宽度)",
            content: (
              <>
                <Button type="primary" onClick={this.info}>
                  警告带标题2modal
                </Button>
              </>
            ),
          },
        ]}
      />
    );
  }
}
storiesOf("通用", module).add("modal 对话框", () => <ModalRender />, {
  notes: { markdown },
});
