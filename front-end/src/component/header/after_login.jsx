import React, { Component } from "react";
import Alarm from "../alarm/alarm";
import store from "../../store";


export default class After_login extends Component{

    constructor(props) {
        super(props);
        this.state = {alarm : 0};
    }

    render() { 
        console.log(this.state)

        return (
            
            <div className="home_header_body_1_form_after">
                <div className="home_header_body_1_c1" onClick={function(){
                    store.dispatch({type:'HOME'});
                }.bind(this)}>로그아웃</div>

                <div className="home_header_body_1_c2" onClick={function(){
                    store.dispatch({type:"MYPAGE"});
                }.bind(this)}>마이페이지</div>

                <div className="home_header_body_1_c3"  onClick={() => this.setState({ alarm: this.state.alarm + 1 })}>알림</div>
                {this.state.alarm % 2 === 1 && <Alarm></Alarm>}
            </div>
        )
    }
}