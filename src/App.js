import React from "react";
import { Tabs, Button } from "antd";
import axios from "axios";

import "./App.css";
import "antd/dist/antd.css";
import WrappedNormalLoginForm from "./Components/LogIn";
import Stepper from "./Components/BookingStepper";
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
      putStartDate: true,
      currentSelectedCar: "",
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
    const {
      isLogged,
      carsList,
      axiosOptions,
      putStartDate,
      currentSelectedCar
    } = this.state;
    return (
      <div className="App">
        <Tabs
          onChange={key => this.changeTab(key)}
          activeKey={this.state.activeTab}
        >
          <TabPane tab="Home" key="1">
            {isLogged ? (
              <TableHomeScreen
                carsList={carsList}
                requestOptions={axiosOptions}
                changeTab={() => this.changeTab("2")}
                showStartDate={answer => {
                  console.log("answer", answer);
                  this.setState({
                    putStartDate: answer
                  });
                }}
                getCarId={id => {
                  this.setState({ currentSelectedCar: id });
                }}
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
            <Stepper
              putStartDate={putStartDate}
              carID={currentSelectedCar}
              requestOptions={axiosOptions}
            />
          </TabPane>
          <TabPane
            tab="Reccomendations"
            disabled={this.state.isLogged ? false : true}
            key="3"
          >
            here will be our reccomendations
            {/* <Stepper
              putStartDate={putStartDate}
              carID={currentSelectedCar}
              requestOptions={axiosOptions}
            /> */}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

//export default App;
