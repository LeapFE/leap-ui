import React, { Component, ReactNode, isValidElement, ReactText } from "react";

import { Select as AntdSelect } from "antd";

import * as AntdSelectInterface from "antd/es/select";
import Tooltip from "./../toolTip";

import "./style";

class Select<
  T extends AntdSelectInterface.SelectValue = AntdSelectInterface.SelectValue
> extends Component<
  AntdSelectInterface.SelectProps<T>,
  { value: AntdSelectInterface.SelectValue }
> {
  static Option = AntdSelect.Option;
  static Optgroup = AntdSelect.OptGroup;

  valueToNames: null | Record<string | number, ReactNode>;

  constructor(props: AntdSelectInterface.SelectProps<T>) {
    super(props);

    this.state = {
      value: "",
    };

    this.valueToNames = null;
  }

  componentDidMount() {
    const { value = "", defaultValue = "" } = this.props;
    this.setState({ value: value || defaultValue });
  }

  placeholderRender = (omittedValues: T[]) => `已选${omittedValues.length}个选项…`;

  tipTitle = () => {
    const { mode, maxTagCount = 0 } = this.props;
    let { value } = this.state;

    if (mode && Array.isArray(this.props.children) && !this.valueToNames) {
      this.valueToNames = this.props.children.reduce(
        (result: Record<string | number, ReactNode>, cur: ReactNode) => {
          if (isValidElement<{ value: ReactText; children: ReactNode }>(cur)) {
            if (typeof cur.props.value === "string" || typeof cur.props.value === "number") {
              // eslint-disable-next-line no-param-reassign
              result[cur.props.value] = cur.props.children;
            }
          }
          return result;
        },
        {} as Record<string | number, ReactNode>,
      );
    }

    if (
      (mode === "multiple" || mode === "tags") &&
      maxTagCount >= 0 &&
      Array.isArray(value) &&
      value.length > maxTagCount
    ) {
      if (typeof value === "string") {
        value = [value];
      }

      // REVIEW typeof result ???
      // REVIEW typeof cur ???
      if (Array.isArray(value)) {
        value = (value as Array<string | number | AntdSelectInterface.LabeledValue>).reduce(
          (result: string[], cur: string | number | AntdSelectInterface.LabeledValue) => {
            if (typeof cur === "string" || typeof cur === "number") {
              if (this.valueToNames && this.valueToNames[cur]) {
                result.push(this.valueToNames[cur] as string);
              }
              return result;
            }
            return result;
          },
          [] as string[],
        );
      }

      if (Array.isArray(value)) {
        return value.join("、 ");
      }
    }

    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (value: T, option: React.ReactElement<any> | React.ReactElement<any>[]) => {
    const { onChange } = this.props;

    this.setState({ value });

    if (typeof onChange === "function") {
      onChange(value, option);
    }
  };

  render() {
    let maxTagPlaceholder = undefined;

    if (this.props.maxTagCount === 0 && !this.props.maxTagPlaceholder) {
      maxTagPlaceholder = this.placeholderRender;
    }

    const { style = {} } = this.props;
    const { width } = style;

    return (
      <Tooltip
        title={this.tipTitle()}
        overlayStyle={{ width: width || 180, maxWidth: width || 180 }}
      >
        {
          // @ts-ignore
          <AntdSelect
            {...this.props}
            maxTagPlaceholder={maxTagPlaceholder}
            showArrow
            onChange={this.onChange}
          />
        }
      </Tooltip>
    );
  }
}

// export { AntdSelect, AntdSelectInterface };
export default Select;
