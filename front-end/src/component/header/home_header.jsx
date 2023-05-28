import React, { Component } from "react";
import Before_login from "./before_login"
import After_login from "./after_login";
import "./home_header.css";

import store from "../../store.js";

export default class Home_header extends Component{
    state = {number:store.getState().number} 
    constructor(props){
      super(props);
      store.subscribe(function(){
        this.setState({number:store.getState().number});
      }.bind(this));
    }

    render() { 
        return (
            <div className="home_header_body">
                
                <div className="home_header_body_1">
                    <div className="home_header_body_1_logo">로고</div>

                    {(this.state.number === 0 || this.state.number === 1 ||
                      this.state.number === 2 || this.state.number === 3 ||
                      this.state.number === 4 || this.state.number === 5 ||
                      this.state.number === 6) && <Before_login></Before_login>} 

                    {this.state.number === 7 && <After_login></After_login>} 
                </div>

                <div className="home_header_body_2">
                    <div className="home_header_body_2_c1">
                        <div className="home_header_body_2_c1_text">홈페이지 설명 텍스트</div>
                        <div className="home_header_body_2_c1_button_container">
                            <div className="home_header_body_2_c1_button_container_b1">게시글 올리기</div>
                            <div className="home_header_body_2_c1_button_container_b2">그래프 그리기</div>
                        </div>
                    </div>
                    <div className="home_header_body_2_c2">이미지</div>
                </div>
            </div>
        )
    }
}