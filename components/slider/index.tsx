import React, { Component, ChangeEvent } from "react";
import { Slider as AntdSlider } from "antd";

import * as AntdSliderInterface from "antd/es/slider";

import Input from "./../input";

import "./style";

export interface SliderProps extends AntdSliderInterface.SliderProps {
  input?: boolean;
  customBotMark?: [string, string];
  width?: number;
}

interface SliderState {
  min: number;
  max: number;
}

class Slider extends Component<SliderProps, SliderState> {
  private timer: number;

  constructor(props: SliderProps) {
    super(props);

    this.state = {
      min: 0,
      max: 10,
    };

    this.timer = 0;
  }

  UNSAFE_componentWillReceiveProps(nextProps: SliderProps) {
    if (Array.isArray(nextProps.value)) {
      if (
        nextProps.input &&
        nextProps.value &&
        (nextProps.value[0] !== Number(this.state.min) ||
          nextProps.value[1] !== Number(this.state.max))
      ) {
        this.setState({
          min: nextProps.value[0],
          max: nextProps.value[1],
        });
      }
    }
  }

  componentDidMount() {
    const { value, input } = this.props;
    if (Array.isArray(value)) {
      if (input && value && value.length === 2) {
        this.setState({
          min: value[0],
          max: value[1],
        });
      }
    }
  }

  onChange = (value: AntdSliderInterface.SliderValue) => {
    const { onChange } = this.props;

    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  onChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: max },
    } = event;

    const { min } = this.state;
    const { value, max: maxValue = 0 } = this.props;

    const numericMin = Number(min);
    const numericMax = Number(max);

    let adaptedMax = isNaN(numericMax) ? (Array.isArray(value) ? value[1] : 0) : Number(max);

    this.setState({ max: adaptedMax });

    window.clearTimeout(this.timer);

    this.timer = window.setTimeout(() => {
      if (maxValue <= numericMax) {
        this.setState({ max: maxValue });
      }

      adaptedMax = Math.min(numericMax, maxValue);

      if (numericMin < adaptedMax) {
        this.onChange([numericMin, adaptedMax]);
      } else if (Array.isArray(value)) {
        this.setState({ max: value[1] });
      }
    }, 800);
  };

  onChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: min },
    } = event;

    const { max } = this.state;
    const { value, min: minValue = 0 } = this.props;

    let numericMin = isNaN(Number(min)) ? (Array.isArray(value) ? value[0] : 0) : Number(min);
    const numericMax = Number(max);

    this.setState({ min: numericMin });

    window.clearTimeout(this.timer);

    this.timer = window.setTimeout(() => {
      if (numericMin <= minValue) {
        this.setState({ min: minValue });
      }

      numericMin = Math.max(numericMin, minValue);

      if (numericMin < numericMax) {
        this.onChange([numericMin, numericMax]);
      } else if (Array.isArray(value)) {
        this.setState({ min: value[0] });
      }
    }, 800);
  };

  render() {
    const {
      range,
      customBotMark,
      max = 100,
      min = 0,
      value,
      defaultValue,
      input,
      width,
    } = this.props;

    let adaptedValue: [number, number] | number | number[] = [];

    if (input) {
      adaptedValue = value || defaultValue || [];
      return (
        <div className="slider_input">
          <div className="left_num">{min}</div>
          <AntdSlider
            {...this.props}
            onChange={this.onChange}
            tipFormatter={null}
            style={{ width: width || 500 }}
          ></AntdSlider>
          <div className="right_num">{max}</div>
          <Input
            addonBefore="MIN"
            value={this.state.min}
            size="small"
            onChange={this.onChangeMin}
          />
          <div className="to"></div>
          <Input
            addonBefore="MAX"
            value={this.state.max}
            size="small"
            onChange={this.onChangeMax}
          />
        </div>
      );
    }

    const valueCopy = adaptedValue || defaultValue || (range ? [0, 5] : 0);
    const length = Number(max) - Number(min);

    let markLeft1 = "";
    let markLeft2 = "";

    if (range) {
      markLeft1 = `${(Number(valueCopy[0]) / length) * 100}%`;
      markLeft2 = `${(Number(valueCopy[1]) / length) * 100}%`;
    } else {
      markLeft1 = `${(Number(valueCopy) / length) * 100}%`;
    }

    return (
      <AntdSlider
        {...this.props}
        onChange={this.onChange}
        tipFormatter={customBotMark ? null : (e) => `${e}`}
      >
        {customBotMark ? (
          range ? (
            <div className="slider_mark_bottom">
              <span style={{ left: markLeft1 }} data-before={customBotMark[0]}>
                {valueCopy[0]}
              </span>
              <span style={{ left: markLeft2 }} data-before={customBotMark[1]}>
                {valueCopy[1]}
              </span>
            </div>
          ) : null
        ) : null}
      </AntdSlider>
    );
  }
}

export { AntdSlider,AntdSliderInterface };
export default Slider;
