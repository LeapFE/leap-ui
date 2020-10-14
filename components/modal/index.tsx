import React from "react";
import { Modal as AntdModal } from "antd";
import * as AntdModalInterface from "antd/es/modal";
import { ModalFunc } from "antd/es/modal/Modal";
import ClassNames from "classnames";

import Icon from "./../icon";
import SingleModal from "./SingleModal";

import "./style";

const confirm: ModalFunc = ({ className, icon = "", ...reset }) => {
  const { okType, width } = reset;
  return AntdModal.confirm({
    ...reset,
    width: width || 460,
    okType: okType || "danger",
    className: ClassNames("title_warning", className),
    icon: icon || <Icon type="exclamation-circle" theme="filled" />,
  });
};

const info: ModalFunc = ({ className, icon = "", ...reset }) => {
  const { okType, width } = reset;
  return AntdModal.info({
    ...reset,
    width: width || 460,
    okType: okType || "danger",
    className: ClassNames("title_warning", className),
    icon: icon || <Icon type="exclamation-circle" theme="filled" />,
  });
};

const error: ModalFunc = ({ className, icon = "", ...reset }) => {
  const { okType, width } = reset;
  return AntdModal.error({
    ...reset,
    width: width || 460,
    okType: okType || "danger",
    className: ClassNames("fl_confirm fl_confirm_info", className),
    icon: icon || <Icon type="exclamation-circle" theme="filled" />,
  });
};

const success: ModalFunc = ({ className, icon = "", ...reset }) => {
  const { okType, width } = reset;
  return AntdModal.success({
    ...reset,
    width: width || 460,
    okType: okType || "danger",
    className: ClassNames("fl_confirm fl_confirm_success", className),
    icon: icon || <Icon type="exclamation-circle" theme="filled" />,
  });
};

const warning: ModalFunc = ({ className, icon = "", ...reset }) => {
  const { okType, width } = reset;
  return AntdModal.warning({
    ...reset,
    width: width || 460,
    okType: okType || "danger",
    className: ClassNames("fl_confirm fl_confirm_warning", className),
    icon: icon || <Icon type="exclamation-circle" theme="filled" />,
  });
};

const OriginModal: React.FC<AntdModalInterface.ModalProps> = (props) => {
  return <AntdModal {...props} className={ClassNames("fl_modal", props.className)} />;
};

export interface ModalStaticFunctions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
  confirm: ModalFunc;
  Single: typeof SingleModal;
}
type Modal = typeof OriginModal & ModalStaticFunctions & { destroyAll: () => void };
const Modal = OriginModal as Modal;

Modal.confirm = confirm;
Modal.info = info;
Modal.error = error;
Modal.warn = warning;
Modal.warning = warning;
Modal.success = success;
Modal.destroyAll = AntdModal.destroyAll;
Modal.Single = SingleModal;

export default Modal;
