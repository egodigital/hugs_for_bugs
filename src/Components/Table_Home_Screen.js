import React from "react";
import { Table } from "antd";

export default class TableCars extends React.Component {
  render() {
    const columns = [
      { title: "Cars", dataIndex: "model", key: "id" },
      { title: "Battery", dataIndex: "age", key: "age" },
      { title: "Location", dataIndex: "address", key: "address" },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => <a>Delete</a>
      }
    ];
    console.log("props", this.props.data.data);
    // const { data } = this.props;
    return (
      <Table
        pagination={false}
        columns={columns}
        expandedRowRender={record => (
          <p style={{ margin: 0 }}>{record.description}</p>
        )}
        dataSource={this.props.data.data}
      />
    );
  }
}
