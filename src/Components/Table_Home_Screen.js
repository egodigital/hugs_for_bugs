import React from "react";
import { Table, Icon, Button } from "antd";
import axios from "axios";

export default class TableCars extends React.Component {
  constructor(props) {
    super();
    this.state = {
      carSignals: []
    };
  }
  render() {
    const {
      carsList,
      requestOptions,
      changeTab,
      showStartDate,
      getCarId
    } = this.props;
    console.log("table home screen props", this.props);
    const columns = [
      { title: "Cars", dataIndex: "model", key: "id" },
      { title: "Status", dataIndex: "status", key: "id+1" },
      {
        title: "",
        dataIndex: "id",
        key: "x",
        render: (id, obj) => (
          <Button
            type="primary"
            disabled={obj.status === "blocked" ? true : false}
            onClick={() => {
              console.log("Book now", id);
              showStartDate(true);
              changeTab();
              getCarId(id);
            }}
          >
            Book Now!
          </Button>
        )
      }
    ];
    // console.log("id", this.props.carsList);
    return (
      <Table
        //rowKey={() => Math.random()}
        pagination={false}
        columns={columns}
        //TODO: watch for it !!!expandIcon={}
        onExpand={(expanded, record) => {
          axios
            .get(
              "https://ego-vehicle-api.azurewebsites.net/api/v2/vehicles/" +
                record.id +
                "/signals",
              requestOptions
            )
            .then(response => {
              //console.log("signals", response.data.data);
              this.setState({
                carSignals: response.data.data
              });
            });
        }}
        //expandRowByClick
        expandedRowRender={(record, index) => (
          <div>
            <p style={{ float: "left" }}>
              {"Remaining Distance : " +
                this.state.carSignals.calculated_remaining_distance +
                " km"}
            </p>
            <Button
              type="primary"
              onClick={e => {
                //.log("book later", record.id);
                changeTab();
                showStartDate(false);
                getCarId(record.id);
              }}
            >
              Book Later
            </Button>
          </div>
        )}
        dataSource={carsList}
      />
    );
  }
}
