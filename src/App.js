import React from "react";
import { Tabs, Button } from "antd";
import axios from "axios";

import "./App.css";
import "antd/dist/antd.css";
import WrappedNormalLoginForm from "./Components/LogIn";
import Stepper from "./Components/Stepper";
import TableHomeScreen from "./Components/Table_Home_Screen";

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
      carsList: [],
      axiosOptions: {
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
        this.state.axiosOptions
      )
      .then(response => {
        this.setState({
          carsList: response.data.data
        });
      });
  }
  changeTab = key => {
    //TODO: play with this => it is dummy
    this.setState({ activeTab: key });
    console.log("changing tab", key);
  };

  render() {
    return (
      <div className="App">
        <Tabs
          //defaultActiveKey="1"
          onChange={key => this.changeTab(key)}
          activeKey={this.state.activeTab}
        >
          <TabPane tab="Home" key="1">
            {this.state.isLogged ? (
              <TableHomeScreen
                carsList={this.state.carsList}
                requestOptions={this.state.axiosOptions}
                changeTab={() => this.changeTab("2")}
              />
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
          <TabPane
            tab="Booking"
            disabled={this.state.isLogged ? false : true}
            key="2"
          >
            <Stepper></Stepper>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

//export default App;
