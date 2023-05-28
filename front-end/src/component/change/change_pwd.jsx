import React, { Component } from "react";
import store from "../../store";

export default class Change_pwd extends Component{

    render() { 
        return (
            <div className="login-box">
                <h2>비밀번호 변경</h2>
                <form>
                    <div className="user-box">
                        <input type="text"></input>
                        <label>Password</label>
                    </div>

                    <div className="user-box">
                        <input type="password"></input>
                        <label>Password_again</label>
                    </div>

                    <div className="user-button_container">
                        <button type="submit" className="user-button_container_login">
                            변경
                        </button>

                        <div className="user-button_container_cancel" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>Cancel</div>
                    </div>

                </form>
            </div>
        )
    }
}