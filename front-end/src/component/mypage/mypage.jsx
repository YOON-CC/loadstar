import React, { Component } from "react";
import "./mypage.css";
import Mypage_0 from "./mypage_0";
import Mypage_1 from "./mypage_1";
import Mypage_2 from "./mypage_2";
import store from "../../store";

export default class First_question extends Component{

    constructor(props) {
        super(props);
        this.state = {mypage_num : 0};
    }

    render() { 
        return (
            <div className="mypage_container">
                <div className="mypage_container_1">
                    <div className="mypage_container_1_box_0" onClick={() => this.setState({ mypage_num: 0})}>회원정보</div>
                    <div className="mypage_container_1_box_1" onClick={() => this.setState({ mypage_num: 1})}>이용방법</div>
                    <div className="mypage_container_1_box_2" onClick={() => this.setState({ mypage_num: 2})}>ABOUT</div>
                    <div className="mypage_container_1_box_3" onClick={function(){
                            store.dispatch({type:'AFTER_LOGIN'});
                        }.bind(this)}>나가기</div>
                    <div className="mypage_container_1_box_4">이미지</div>
                </div>
                <div className="mypage_container_2">
                    {this.state.mypage_num === 0 && <Mypage_0></Mypage_0>}
                    {this.state.mypage_num === 1 && <Mypage_1></Mypage_1>}
                    {this.state.mypage_num === 2 && <Mypage_2></Mypage_2>}
                </div>

            </div>
        )
    }
}