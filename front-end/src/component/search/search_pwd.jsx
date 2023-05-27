import React, { Component } from "react";
import "./search_pwd.css";

export default class Search_pwd extends Component{

    render() { 
        return (
            <div className="search_pwd-box">
                <h2>비밀번호 찾기</h2>
                <form>

                    <div className="email-container">
                        <div className="email-box_1">
                            <div className="email-input_text">Email</div>
                            <input type="text" className="email-input"></input>
                        </div>
                        <div className="email-box_2">
                            <button type="submit" className="email-box_send">
                                이메일 보내기
                            </button>
                        </div>
                    </div>

                    <div className="mail_receive_code_container">
                        <input className="mail_receive_code"></input>
                    </div>

                    <div className="stop_search_pwd_container">
                        <div className="stop_search_pwd_container_button_1">확인</div>
                        <div className="stop_search_pwd_container_button_1">취소</div>
                    </div>

                </form>
            </div>
        )
    }
}