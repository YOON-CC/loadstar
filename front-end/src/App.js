import React, { useState  , Component } from "react";
import Home_header from "./component/header/home_header";
import Home_board_list from "./component/body/home_board_list";
import Login from "./component/login/login";
import Search_id from "./component/search/search_id";
import Search_pwd from "./component/search/search_pwd";
import Change_pwd from "./component/change/change_pwd";
import Join from "./component/join/join";
import First_question from "./component/first_question/first_question";
import Mypage from "./component/mypage/mypage";
import Board_post from "./component/board/board_post";
import Welcome from "./component/welcome/welcome";
import Board_delete_animation from "./component/board_delete_animation/board_delete_animation"
import store from "./store";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends Component{

  state = {
    number:store.getState().number,
  } 
  // board_view_sc = {sc:store.getState().sc} 
  constructor(props){
    super(props);
    
    store.subscribe(function(){
      this.setState({number:store.getState().number});
    }.bind(this));
  }


  render() {
    console.log(this.state.number)
    
    return (
      <div className="App">
        <Home_header></Home_header>
        {/* <BrowserRouter>
          <Routes>
            {(this.state.number === 0 || this.state.number === 7) && <Route path="/" element={<Home_board_list></Home_board_list>}></Route>}
            {this.state.number === 1 && <Route path="/Login" element={<Login></Login>}></Route>}
          </Routes>
        </BrowserRouter> */}
        {(this.state.number === 0 || this.state.number === 7) && <Home_board_list></Home_board_list>}
        {this.state.number === 1 && <Login></Login>} 
        {this.state.number === 2 && <Join></Join>} 
        {this.state.number === 3 && <Search_id></Search_id>} 
        {this.state.number === 4 && <Search_pwd></Search_pwd>} 
        {this.state.number === 5 && <Change_pwd></Change_pwd>} 
        {this.state.number === 6 && <Welcome></Welcome>}
        {this.state.number === 10 && <First_question></First_question>}
        
        {this.state.number === 8 && <Mypage></Mypage>}
        {this.state.number === 9 && <Board_post></Board_post>}
        {this.state.number === 11 && <Board_delete_animation></Board_delete_animation>}
      </div>
    );
  }
}