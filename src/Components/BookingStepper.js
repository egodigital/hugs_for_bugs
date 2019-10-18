import React from "react";
//import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table } from "antd";
import TimeRangePicker from "./TimeRangePicker";
import collisionAlarm from "../Functions/collisionAlarm";
//import "./index.css";
import moment from "moment";
import axios from "axios";

import { Steps, Button, message, DatePicker, InputNumber } from "antd";

const { RangePicker } = DatePicker;

const { Step } = Steps;

export default class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isDone: false,
      supposedKilometers: undefined,
      supposedDates: undefined,
      supposedTime: ["9:20", "12:30"],
      supposedPassengersNumber: 2
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
  componentDidMount() {
    axios
      .get(
        "https://ego-vehicle-api.azurewebsites.net/api/v2/vehicles/" +
          this.props.carID +
          "/Bookings",
        this.props.requestOptions
      )
      .then(response => {
        console.log("bookings", response.data.data);
        this.setState({
          currentCarBookings: response.data.data
        });
      });
  }
  render() {
    const { current, isDone } = this.state;
    const { putStartDate } = this.props;
    console.log("booking stepper props", this.props);
    console.log("booking stepper state", this.state);

    const steps = [
      {
        title: "Distance & Passengers",
        content: (
          <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <InputNumber
              defaultValue={25}
              onChange={e => {
                e >= 110
                  ? message.warn("please, enter a lower distnce")
                  : this.setState({ supposedKilometers: e });
              }}
            />
            <p>km</p>
            <InputNumber
              defaultValue={2}
              max={4}
              onChange={e => {
                this.setState({ supposedPassengersNumber: e });
              }}
            />
            <p>persons</p>
          </div>
        )
      },
      {
        title: "Pick Date and Time",
        content: (
          <div>
            <RangePicker
              onChange={(date, dateString) =>
                this.setState({ supposedDates: dateString })
              }
              defaultValue={putStartDate ? [moment(), ""] : ["", ""]}
              format={"YYYY/MM/DD"}
            />
            <TimeRangePicker putStartTime={putStartDate} />
          </div>
        )
      }
    ];
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
              onClick={() => {
                const from = [
                  this.state.supposedDates[0].concat(
                    "T",
                    this.state.supposedTime,
                    [0]
                  )
                ];
                const until = [
                  this.state.supposedDates[1].concat(
                    "T",
                    this.state.supposedTime,
                    [1]
                  )
                ];
                const t1 = moment(from).format("YYYY-Mm-Dd h:mm:ss Z");
                const t2 = moment(until).format("YYYY-Mm-Dd h:mm:ss Z");
                axios.post(
                  "https://ego-vehicle-api.azurewebsites.net/api/v2/vehicles/" +
                    this.props.carID +
                    "/Bookings",
                  {
                    from: "2019-10-12T11:00:00.000Z",
                    until: "2019-10-12T19:20:00.000Z"
                  },
                  this.props.requestOptions
                );
                /* .then(response => {
                    console.log("bookings", response.data.data);
                    this.setState({
                      currentCarBookings: response.data.data
                    });
                  }); */

                console.log(
                  "submission",
                  this.state.supposedTime,
                  this.state.supposedDates
                );
                this.setState({ isDone: isDone ? false : true });

                collisionAlarm(this.state.currentCarBookings, [
                  this.state.supposedDates,
                  this.state.supposedTime
                ]);
                /* ? message.warning("Processing skipped!")
                  : message.success("Processing complete!"); */
              }}
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
        {isDone ? (
          <Table
            pagination={false}
            columns={[
              {
                title: "From",
                dataIndex: "from",
                key: "id",
                render: (id, obj) => moment(id).format("YYYY/MM/DD h:mm:ss ")
              },
              {
                title: "Until",
                dataIndex: "until",
                key: "id+1",
                render: (id, obj) => moment(id).format("YYYY/MM/DD h:mm:ss ")
              }
            ]}
            dataSource={this.state.currentCarBookings}
          />
        ) : null}
      </div>
    );
  }
}
