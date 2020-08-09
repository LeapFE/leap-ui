import React from "react";

import { notification as AntdNotification } from "antd";
import * as AntdNotificationInterface from "antd/es/notification";
import ClassNames from "classnames";
import Icon from "./../icon";

import "./style";

const notification = {} as AntdNotificationInterface.NotificationApi;

interface NotificationArgsProps extends AntdNotificationInterface.ArgsProps {
  hideIcon?: boolean;
}

notification.error = (props: NotificationArgsProps) => {
  return AntdNotification.error({
    ...props,
    className: ClassNames("fl_notice", "fl_error_notice", { fl_hide_icon: props.hideIcon }),
  });
};

notification.info = (props: NotificationArgsProps) => {
  return AntdNotification.info({
    ...props,
    className: ClassNames("fl_notice", "fl_info_notice", { fl_hide_icon: props.hideIcon }),
  });
};

notification.success = (props: NotificationArgsProps) => {
  return AntdNotification.success({
    ...props,
    icon: props.icon || <Icon type="check-circle" theme="filled" />,
    className: ClassNames("fl_notice", "fl_success_notice", { fl_hide_icon: props.hideIcon }),
  });
};

notification.warn = (props: NotificationArgsProps) => {
  return AntdNotification.warn({
    ...props,
    icon: props.icon || <Icon type="exclamation-circle" theme="filled" />,
    className: ClassNames("fl_notice", "fl_warn_notice", { fl_hide_icon: props.hideIcon }),
  });
};

notification.warning = (props: NotificationArgsProps) => {
  return AntdNotification.warning({
    ...props,
    icon: props.icon || <Icon type="exclamation-circle" theme="filled" />,
    className: ClassNames("fl_notice", "fl_warning_notice", { fl_hide_icon: props.hideIcon }),
  });
};

notification.open = (props: NotificationArgsProps) => {
  return AntdNotification.open({
    ...props,
    className: ClassNames("fl_notice", "fl_open_notice", `fl_${props.type}_notice`, {
      fl_hide_icon: props.hideIcon,
    }),
  });
};

export { AntdNotification, AntdNotificationInterface };
export default notification;
