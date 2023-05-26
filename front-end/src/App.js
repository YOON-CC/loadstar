import React, { Component } from "react";
import Home_header from "./component/header/home_header";
import Home_board_list from "./component/body/home_board_list";


export default class App extends Component{
  render() { 
  return (
    <div className="App">
      <Home_header></Home_header>
      <Home_board_list></Home_board_list>
    </div>
  );
}
}