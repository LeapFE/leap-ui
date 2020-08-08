import React from "react";
import { storiesOf } from "@storybook/react";

import { Drawer, Button } from "leap-ui";

class DrawerRender extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

storiesOf("通用", module).add("DrawerRender", () => <DrawerRender />, {});
