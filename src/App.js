import React from "react";
import { Tabs, Button } from "antd";
import axios from "axios";

import "./App.css";
import "antd/dist/antd.css";
import WrappedNormalLoginForm from "./Components/LogIn";
import Stepper from "./Components/Stepper";
import TableCars from "./Components/Table_Home_Screen";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLogged: true,
      activeTab: "1",
      options: {
        headers: {
          "X-Api-Key": "55d01ce7-a51d-4cc2-905a-9cd2030742f7",
          accept: "application / json"
        }
      }
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://ego-vehicle-api.azurewebsites.net/api/v2/vehicles",
        this.state.options
      )
      .then(response => {
        this.setState({
          data: response.data
        });
        //console.log(response.data[0]);
        console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
      });
  }
  render() {
    return (
      <div className="App">
        <Tabs
          //defaultActiveKey="1"
          onChange={callback}
          activeKey={this.state.activeTab}
        >
          <TabPane tab="Home" key="1">
            {this.state.isLogged ? (
              <TableCars data={this.state.data} />
            ) : (
              <div>
                <WrappedNormalLoginForm />
                <Button
                  type="primary"
                  onClick={() => this.setState({ isLogged: true })}
                >
                  Skip LogIn
                </Button>
              </div>
            )}
          </TabPane>
          <TabPane tab="Book Later" disabled key="2">
            <Stepper></Stepper>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

//export default App;
