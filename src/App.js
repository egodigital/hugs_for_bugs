import React from "react";
import { Tabs } from "antd";

import "./App.css";
import "antd/dist/antd.css";
import WrappedNormalLoginForm from "./Components/LogIn";
import Stepper from "./Components/Stepper";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Home" key="1">
            <WrappedNormalLoginForm />
          </TabPane>
          <TabPane tab="Rent" key="2">
            <Stepper></Stepper>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

//export default App;
