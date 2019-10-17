import React from "react";
//import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import TimeRangePicker from "./TimeRangePicker";
//import "./index.css";
import moment from "moment";

import { Steps, Button, message, DatePicker, InputNumber } from "antd";

const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log("onOk: ", value);
}

const { Step } = Steps;

export default class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.NumInput = React.createRef();
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    // console.log("ref", this.NumInput);
    const steps = [
      {
        title: "Expected distance",
        content: (
          <div>
            <InputNumber
              max={150}
              min={1}
              defaultValue={5}
              formatter={value => {
                value.replace(/([A-z]\w+)/g, "");
              }}
              onChange={e => {
                console.log("change", e);
              }}
            />
            <p>km</p>
          </div>
        )
      },
      {
        title: "Pick Date and Time",
        content: (
          <div>
            <RangePicker
              onChange={onChange}
              defaultValue={[moment(), moment()]}
              format={"YYYY/MM/DD"}
            />
            <TimeRangePicker defaultValue={moment()} format="HH:mm" />
          </div>
        )
      }
    ];
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div
          className="steps-content"
          style={{
            marginTop: "16px",
            border: "1px dashed #e9e9e9",
            borderRadius: "6px",
            backgroundColor: "#fafafa",
            minHeight: "200px",
            textAlign: "center",
            paddingTop: "80px"
          }}
        >
          {steps[current].content}
        </div>
        <div className="steps-action" style={{ marginTop: "24px" }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}
