import React, { Component } from "react";
import { Input as AntdInput } from "antd";
import * as AntdInputInterface from "antd/es/input";
import ClassNames from "classnames";
import { PopoverProps } from "antd/es/popover";

import Popover from "./../popover";
import Icon from "./../icon";

import "./style";

interface TextAreaProps extends AntdInputInterface.TextAreaProps {
  count?: number;
}
class TextArea extends Component<TextAreaProps> {
  render() {
    const { count, value = "", className, ...props } = this.props;
    const valueLength = Array.isArray(value) ? value.length : 0;

    if (count) {
      return (
        <div className="text-area-count">
          <AntdInput.TextArea
            {...props}
            className={ClassNames("fl-input", className)}
            value={value}
            maxLength={Number(count)}
          />
          <div className="num">
            <span className={valueLength ? "primary" : ""}>{valueLength}</span>/{count}
          </div>
        </div>
      );
    }

    return (
      <AntdInput.TextArea className={ClassNames("fl-input", className)} value={value} {...props} />
    );
  }
}

class Search extends Component<AntdInputInterface.SearchProps> {
  render() {
    return <AntdInput.Search {...this.props} enterButton={false} allowClear={true} />;
  }
}

interface SearchGroupProps extends AntdInputInterface.SearchProps {
  nullResult?: boolean;
}

class SearchGroup extends Component<SearchGroupProps> {
  render() {
    const { nullResult = "", className, ...props } = this.props;

    if (nullResult) {
      return (
        <div className="null-result">
          <Input.Search
            {...props}
            allowClear={true}
            className={ClassNames("fl_input_search", className)}
          />
          <div className="result-popover">{nullResult}</div>
        </div>
      );
    }

    return (
      <Input.Search
        {...props}
        allowClear={true}
        className={ClassNames("fl_input_search", className)}
      />
    );
  }
}

export interface InputProps extends AntdInputInterface.InputProps {
  popover?: PopoverProps;
  error?: boolean;
  success?: boolean;
  rightError?: boolean;
  loading?: boolean;
}

class Input extends Component<InputProps> {
  static Textarea: typeof TextArea;
  static Search: typeof Search;
  static SearchGroup: typeof SearchGroup;
  static Password: typeof AntdInput.Password;

  render() {
    const { error, success, rightError, loading, popover, className, ...props } = this.props;

    // 带气泡提示
    if (popover && typeof popover === "object") {
      return (
        <div className="ant-input-affix-wrapper input-popover">
          <AntdInput {...props} className={ClassNames("fl-input", className)} />
          <Popover
            {...popover}
            autoAdjustOverflow={false}
            placement="topRight"
            overlayClassName="input-msg-popover"
          >
            <div className="popover-icon-wrapper">
              <Icon type="info-circle" theme="filled" />
            </div>
          </Popover>
        </div>
      );
    }

    // 带loading
    if (loading)
      return (
        <div className="ant-input-affix-wrapper loading">
          <AntdInput {...props} className={ClassNames("fl-input", className)} />
          <div className="loading-msg">
            <span>加载中…</span>
            <Icon type="loading" />
          </div>
        </div>
      );

    // 带错误提示或成功提示
    if (error || success || rightError)
      return (
        <div className={`ant-input-affix-wrapper ${success ? "success" : "error"}`}>
          <AntdInput {...props} className={ClassNames("fl-input", className)} />
          <div className={ClassNames("input-msg", { "right-msg": rightError })}>
            <Icon type="close-circle" theme="filled" />
            <Icon type="check-circle" theme="filled" />
            <span>{error || success || rightError}</span>
          </div>
        </div>
      );

    return <AntdInput {...props} className={ClassNames("fl-input", className)} />;
  }
}

Input.Search = Search;
Input.Textarea = TextArea;
Input.SearchGroup = SearchGroup;
Input.Password = AntdInput.Password;

export default Input;
