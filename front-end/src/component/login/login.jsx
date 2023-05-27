import React, { Component } from "react";
import "./login.css";

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
                        <button type="submit" className="user-button_container_login">
                            Submit
                        </button>

                        <button className="user-button_container_cancel">
                            Cancel
                        </button>
                    </div>

                    <div className="user-forget_container">
                        <div type="submit" className="search">
                            아이디찾기
                        </div>

                        <div className="search">
                            비밀번호찾기
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}