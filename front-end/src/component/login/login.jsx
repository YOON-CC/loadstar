import React, { Component } from "react";
import "./login.css";
import store from "../../store";

export default class Login extends Component{
    
    render() { 
        return (
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="user-box">
                        <input type="text"></input>
                        <label>Username</label>
                    </div>

                    <div className="user-box">
                        <input type="password"></input>
                        <label>Password</label>
                    </div>

                    <div className="user-button_container">
                        <button type="submit" className="user-button_container_login" onClick={function(){
                            store.dispatch({type:'AFTER_LOGIN'});
                        }.bind(this)}>submit</button>

                        <div className="user-button_container_cancel" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>Cancel</div>
       
                    </div>

                    <div className="user-forget_container">
                        <div type="submit" className="search" onClick={function(){
                            store.dispatch({type:'SEARCH_ID'});
                        }.bind(this)}>아이디찾기</div>

                        <div className="search" onClick={function(){
                            store.dispatch({type:'SEARCH_PWD'});
                        }.bind(this)}>비밀번호 찾기</div>
                    </div>

                </form>
            </div>
        )
    }
}