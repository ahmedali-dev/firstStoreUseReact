import React, { useState, Component } from "react";
import "./App.css";
import AddItem from "./component/addItem";
import Navbar from "./component/Navbar";
import Router from "./Router/Router";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router />
      </div>
    );
  }
}

export default App;
