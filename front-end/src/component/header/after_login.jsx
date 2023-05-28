import React, { Component } from "react";
import store from "../../store";

export default class After_login extends Component{

    render() { 
        return (
            <div className="home_header_body_1_form_after">
                <div className="home_header_body_1_c1" onClick={function(){
                    store.dispatch({type:'HOME'});
                }.bind(this)}>로그아웃</div>

                <div className="home_header_body_1_c2">마이페이지</div>
                <div className="home_header_body_1_c3">알림</div>
            </div>
        )
    }
}