import React, { FunctionComponent, ReactNode } from "react";
import ClassNames from "classnames";
import * as AntdModalInterface from "antd/es/modal";

import Button from "../button";
import Icon from "../icon";

import Modal from "./index";

export interface SingleModalProps extends AntdModalInterface.ModalProps {
  fl_single_btn?: boolean;
  fl_icon_title?: ReactNode;
  fl_content?: ReactNode;
  fl_single_text?: string;
  fl_single_ok?: string;
  fl_single_cancel?: string;
  fl_onChange?: () => void;
  fl_onCancel?: () => void;
}

const SingleModal: FunctionComponent<SingleModalProps> = (props) => {
  const {
    fl_single_btn,
    fl_icon_title,
    fl_content,
    fl_onChange,
    fl_onCancel,
    fl_single_text,
    fl_single_ok,
    fl_single_cancel,
    className,
  } = props;

  return (
    <Modal
      className={ClassNames("single_warning", className)}
      {...props}
      footer={
        fl_single_btn ? (
          <Button type="primary" onClick={fl_onChange}>
            {fl_single_text}
          </Button>
        ) : (
          <div>
            <Button type="primary" onClick={fl_onChange}>
              {fl_single_ok}
            </Button>
            <Button onClick={fl_onCancel}>{fl_single_cancel}</Button>
          </div>
        )
      }
    >
      <div className="warn_content">
        {fl_icon_title || <Icon type="exclamation-circle" theme="filled" />}
        <div>{fl_content}</div>
      </div>
    </Modal>
  );
};

export default SingleModal;
