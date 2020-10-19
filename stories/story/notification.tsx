import React from "react";
import { storiesOf } from "@storybook/react";

import { Button, notification } from "leap-ui";

import Layout from "./../common/layout";

import markdown from "./../markdown/notification.md";

class NotificationRender extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  render() {
    return (
      <Layout
        head="notification 通知"
        items={[
          {
            name: "不同状态",
            content: (
              <>
                <Button
                  onClick={() =>
                    notification.info({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                    })
                  }
                  type="primary"
                >
                  info
                </Button>
                <Button
                  onClick={() =>
                    notification.success({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                    })
                  }
                  type="primary"
                  style={{ marginLeft: 10 }}
                >
                  success
                </Button>
                <Button
                  onClick={() =>
                    notification.warning({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                    })
                  }
                  type="primary"
                  style={{ marginLeft: 10 }}
                >
                  warning
                </Button>
                <Button
                  onClick={() =>
                    notification.error({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                    })
                  }
                  type="primary"
                  style={{ marginLeft: 10 }}
                >
                  error
                </Button>
              </>
            ),
          },
          {},
          {},
          {
            name: "open",
            content: (
              <>
                <Button
                  onClick={() =>
                    notification.open({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                    })
                  }
                  type="primary"
                >
                  open
                </Button>
              </>
            ),
          },
          {},
          {},
          {
            name: "不同状态,不显示Icon",
            content: (
              <>
                <div>
                  <Button
                    onClick={() =>
                      notification.info({
                        message: `标题标题标题`,
                        description: "内容内容内容内容内容内容内容内容内容内容",
                        hideIcon: true,
                      })
                    }
                    type="primary"
                  >
                    Hide icon info
                  </Button>
                  <Button
                    onClick={() =>
                      notification.success({
                        message: `标题标题标题`,
                        description: "内容内容内容内容内容内容内容内容内容内容",
                        hideIcon: true,
                      })
                    }
                    type="primary"
                    style={{ marginLeft: 10 }}
                  >
                    Hide icon success
                  </Button>
                </div>

                <Button
                  onClick={() =>
                    notification.warning({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                      hideIcon: true,
                    })
                  }
                  type="primary"
                  style={{ marginTop: 10 }}
                >
                  Hide icon warning
                </Button>
                <Button
                  onClick={() =>
                    notification.error({
                      message: `标题标题标题`,
                      description: "内容内容内容内容内容内容内容内容内容内容",
                      hideIcon: true,
                    })
                  }
                  type="primary"
                  style={{ marginLeft: 10, marginTop: 10 }}
                >
                  Hide icon error
                </Button>
              </>
            ),
          },
        ]}
      />
    );
  }
}

storiesOf("通用", module).add("notification 通知", () => <NotificationRender />, {
  notes: { markdown },
});
