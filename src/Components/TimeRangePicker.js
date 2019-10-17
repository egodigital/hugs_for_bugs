import React from "react";
import "antd/dist/antd.css";
import moment from "moment";

import { TimePicker } from "antd";

export default class TimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: ""
    };
  }

  render() {
    const { putStartTime } = this.props;
    //console.log("fff", putStartTime);
    return (
      <div>
        <TimePicker
          defaultValue={putStartTime ? moment() : ""}
          format="HH:mm"
          onChange={(date, dateString) =>
            this.setState({ startTime: dateString })
          }
        />
        <TimePicker
          defaultValue={""}
          format="HH:mm"
          onChange={(date, dateString) =>
            this.setState({ endTime: dateString })
          }
        />
      </div>
    );
  }
}
