import React, { Component } from "react";
import store from "../../store";
import "./join.css";


export default class Join extends Component{

    render() { 
        return (
            <div className="join-box">
                <h2>회원가입</h2>
                <form>
                    
                    <div className="join_id_container">
                        <div className="join_id_container_1">
                            <div className="join_id_container_1_text">
                                아이디 입력
                            </div>
                            <input className="join_id_container_1_input">

                            </input>
                        </div>
                        <div className="join_id_container_2">
                            사용가능한 아이디 입니다!
                        </div>
                    </div>

                    <div className="join_pwd_container">
                        <div className="join_pwd_container_1">
                            <div className="join_pwd_container_1_text">
                                비밀번호
                            </div>
                            <input className="join_pwd_container_1_input">

                            </input>
                        </div>

                        <div className="join_pwd_container_2">
                            <div className="join_pwd_container_2_text">
                                비밀번호 확인
                            </div>
                            <input className="join_pwd_container_2_input">

                            </input>
                        </div>
                    </div>

                    <div className="join_email_container">
                        <div className="join_email_container_1">
                            <div className="join_email_container_1_text">
                                이메일
                            </div>
                            <input className="join_email_container_1_input">

                            </input>
                        </div>

                        <div className="join_email_container_2">
                            <button className="join_email_container_2_send">
                                보내기
                            </button>
                        </div>
                    </div>

                    <div className="join_code_container">
                        <div className="join_code_container_1">
                            <div className="join_code_container_1_text">
                                승인코드
                            </div>
                            <input className="join_code_container_1_input">

                            </input>
                        </div>

                        <div className="join_code_container_2">
                            <button className="join_code_container_2_send">
                                확인
                            </button>
                        </div>
                    </div>

                    <div className="join_button_container">
                        <div className="join_button_container_1">
                            <button className="join_button_container_1_join"onClick={function(){
                                store.dispatch({type:'FIRST_QUESTION'});
                            }.bind(this)}>확인</button>
                        </div>

                        <div className="join_button_container_2">
                            <div className="join_button_container_2_cancel" onClick={function(){
                                store.dispatch({type:'HOME'});
                            }.bind(this)}>Cancel</div>
                        </div>
                    </div>


                </form>
            </div>
        )
    }
}