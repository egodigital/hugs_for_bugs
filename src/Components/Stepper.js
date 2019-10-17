import React from "react";
//import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Steps, Button, message, DatePicker } from "antd";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log("onOk: ", value);
}
const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: "First-content"
  },
  {
    title: "Pick the Date",
    content: <RangePicker onChange={onChange} />
  },
  {
    title: "Pick the Time",
    content: (
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        placeholder={["Start Time", "End Time"]}
        onChange={onChange}
        onOk={onOk}
      />
    )
  }
];

export default class Stepper extends React.Component {
  constructor(props) {
    super(props);
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
