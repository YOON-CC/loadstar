import React, { Component } from "react";
import Before_login from "./before_login"
import After_login from "./after_login";
import "./home_header.css";

import store from "../../store.js";
import { Link } from 'react-router-dom';

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
                    <div className="home_header_body_1_logo">
                      <img className="home_header_body_1_logo_img" src="/image/logo.png"></img>
                    </div>

                    <After_login></After_login>
                </div>

                <div className="home_header_body_2">
                    <div className="home_header_body_2_c1">
                      <div className="home_header_body_2_c1_text">
                        <div className="home_header_body_2_c1_text_1">DRAW AND SHOW</div>
                        <div className="home_header_body_2_c1_text_2">YOUR DREAM</div>
                        <div className="home_header_body_2_c1_text_3"></div>
                        <div className="home_header_body_2_c1_text_4">당신의 길라잡이 LOADSTAR</div>
                      </div>

                      <div className="home_header_body_2_c1_button_container">
                        <Link to="/boardwrite"> 
                          <div className="home_header_body_2_c1_button_container_b1">
                            <div className="b1_img"><img src="/image/post.png"></img></div>
                            <div className="b1_text">게시글 올리기</div>
                          </div>
                        </Link>
                          
                        <div className="home_header_body_2_c1_button_container_b2">
                          <div className="b2_img"><img src="/image/drawing.png"></img></div>
                          <div className="b2_text">그래프 그리기</div>
                        </div>
                      </div>
                    </div>
                    <div className="home_header_body_2_c2">
                      <img className="home_header_body_2_main_image" src="/image/main_image.png"></img>
                    </div>
                </div>
            </div>
        )
    }
}