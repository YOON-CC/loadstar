import React, { Component } from "react";
import Home_header from "./component/header/home_header";
import Home_board_list from "./component/body/home_board_list";
import Login from "./component/login/login";
import Search_id from "./component/search/search_id";
import Search_pwd from "./component/search/search_pwd";
import Change_pwd from "./component/change/change_pwd";
import Join from "./component/join/join";
import First_question from "./component/first_question/first_question";

export default class App extends Component{
  render() { 
    return (
      <div className="App">
        <Home_header></Home_header>
        {/* <Home_board_list></Home_board_list> */}
        {/* <Login></Login> */}
        {/* <Search_id></Search_id> */}
        {/* <Search_pwd></Search_pwd> */}
        {/* <Change_pwd></Change_pwd> */}
        {/* <Join></Join> */}
        {/* <First_question></First_question> */}
      </div>
    );
  }
}