import React, { Component } from "react";
import store from "../../store";
import "./join.css";


export default class Join extends Component{

    render() { 
        
        //여기서 회원가입 가능 여부를 판단해야 한다.
        const handleJoin = () => {
            store.dispatch({ type: 'WELCOME' });
        };

        return (
            <div className="join-box">
                <h2>회원가입</h2>
                <form>
                    {/* @@@ */}
                    <div className="newid-container">
                        <div className="newid-box_1">
                            <div className="newid-input_text">Id</div>
                            <input type="text" className="newid-input"></input>
                        </div>
                        <div className="newid-box_2">
                            <button type="submit" className="newid-box_send">
                                중복확인
                            </button>
                        </div>
                        <div className="newid-box_3">사용 가능한 아이디 입니다!</div>                 
                    </div>
                    {/* @@@ */}

                    <div className="newpwd-container">
                        <div className="newpwd-box_1">
                            <div className="newpwd-input_text">Password</div>
                            <input type="text" className="newpwd-input"></input>
                        </div>
                        <div className="newpwd-box_2">
                            <div className="newpwd-input_text2">Password_again</div>
                            <input type="text" className="newpwd-input2"></input>
                        </div>           
                    </div>

                    {/* @@@ */}

                    <div className="newemail-container">
                        <div className="newemail-box_1">
                            <div className="newemail-input_text">Email</div>
                            <input type="text" className="newemail-input"></input>
                        </div>
                        <div className="newemail-box_2">
                            <button type="submit" className="newemail-box_send">
                                보내기
                            </button>
                        </div>                
                    </div>  

                    {/* @@@ */}
                    <div className="newmail_receive_code_container">
                        <input className="newmail_receive_code" placeholder="code"></input>
                        <button type="submit" className="newmail_receive_code_send">
                                확인
                        </button>
                    </div>
                    {/* @@@ */}

                    <div className="newbtn-container">
                        <button className="newbtn-container_1" onClick={handleJoin}>JOIN</button>
                        <div className="newbtn-container_2" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>CANCEL</div>          
                    </div>  
                </form>
            </div>
        )
    }
}