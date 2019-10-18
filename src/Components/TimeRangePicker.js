import React from "react";
import "antd/dist/antd.css";
import moment from "moment";

import { TimePicker } from "antd";

export default class TimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: undefined,
      endTime: undefined
    };
  }

  render() {
    const { putStartTime, onChange } = this.props;
    const returnValue = [];
    //console.log("state of time range picker", this.state);
    //setTimeInterval(returnValue);
    return (
      <div>
        <TimePicker
          defaultValue={putStartTime ? moment() : ""}
          format="HH:mm"
          onChange={(date, dateString) => {
            console.log("start", dateString);
            onChange({ start: dateString });
          }}
        />
        <TimePicker
          defaultValue={""}
          format="HH:mm"
          onChange={(date, dateString) => {
            console.log("end", dateString);
            onChange({ end: dateString });
          }}
        />
      </div>
    );
  }
}
