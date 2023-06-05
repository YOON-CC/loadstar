import React, { Component } from "react";
import store from "../../store";

export default class Before_login extends Component{

    render() { 
        return (
            <div className="home_header_body_1_form_before">

                <div className="home_header_body_1_c1" onClick={function(){
                    store.dispatch({type:"LOGIN"});
                }.bind(this)}>로그인</div>

                <div className="home_header_body_1_c2"onClick={function(){
                    store.dispatch({type:"JOIN"});
                }.bind(this)}>회원가입</div>

            </div>
        )
    }
}