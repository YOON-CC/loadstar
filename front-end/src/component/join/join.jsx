import React, { useState, Component } from "react";
import store from "../../store";
import "./join.css";
import axios from 'axios';

const Join = () => {

    const [newid, setnewId] = useState(''); //아이디
    const [newpassword, setnewPassword] = useState(''); //비밀번호
    const [newpassword_again, setnewPassword_again] = useState(''); //비밀번호찾기
    const [newemail, setnewemail] = useState(''); //이메일
    const [newcode, setnewcode] = useState(''); //승인코드

    const handlenewidChange = (event) => { //아이디
        setnewId(event.target.value)
    };

    const handlenewpasswordChange = (event) => { //비밀번호
        setnewPassword(event.target.value)
    };

    const handlenewpassword_againgChange = (event) => {//비밀번호찾기
        setnewPassword_again(event.target.value)
    };

    const handlenewemailgChange = (event) => {//이메일
        setnewemail(event.target.value)
    };

    const handlenewcodeChange = (event) => {//승인코드
        setnewcode(event.target.value)
    };

    //최종 보내기
    const handlejoinSubmit = async (event) => {
        event.preventDefault();

        // // 아이디 중복확인
        // try {
        //     const response = await axios.get("http://13.125.16.222/users/duplicated-username", {
        //         params: {
        //             username: newid
        //         },
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     });
          
        //     console.log(response.data);
        // }
        // catch (error) {
        //     console.error(error);
        // }

        //이메일 중복확인
        // try {
        //     const response = await axios.post("http://13.125.16.222/mails/check-mail", {
        //         email: newemail
        //     }, {
        //         headers: {
        //         "Content-Type": "application/json"
        //         }
        //     });
      
        //     console.log(response.data);
        // }
        // catch (error) {
        //     console.error(error);
        // }

        // 승인코드
        // try {
        //     const response = await axios.get("http://13.125.16.222/mails/check-key", {
        //         params: {
        //             // mail: newemail,
        //             mail : "happychan7@naver.com",
        //             key : newcode
        //         },
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     });
          
        //     console.log(response.data);
        // }
        // catch (error) {
        //     console.error(error);
        // }

        // //최종 회원가입
        // try {
        //     const response = await axios.post("http://13.125.16.222/users/signup", {
        //         // username: newid,
        //         // password: newpassword,
        //         // mail: newemail,
        //         // usernameCheck: true, //boolean, 반환값
        //         // emailCheck: true, //boolean, 반환값
        //         username: "newid",
        //         password: "newpassword",
        //         email: "newemail@gmail.com",
        //         usernameCheck: true, //boolean, 반환값
        //         emailCheck: true, //boolean, 반환값

        //     }, {
        //         headers: {
        //         "Content-Type": "application/json"
        //         }
        //     });
      
        //     console.log(response.data);
        // }
        // catch (error) {
        //     console.error(error);
        // }
    };

    //여기서 회원가입 가능 여부를 판단해야 한다.
    const handleJoin = () => {
        store.dispatch({ type: 'WELCOME' });
    };

    return (
        <div className="join-box">
            <h2>회원가입</h2>
            <form onSubmit={handlejoinSubmit}>
                {/* @@@ */}
                <div className="newid-container">
                    <div className="newid-box_1">
                        <div className="newid-input_text">Id</div>
                        <input type="text" value={newid} onChange={handlenewidChange} className="newid-input"></input>
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
                        <input type="text" value={newpassword} onChange={handlenewpasswordChange} className="newpwd-input"></input>
                    </div>
                    <div className="newpwd-box_2">
                        <div className="newpwd-input_text2">Password_again</div>
                        <input type="text" value={newpassword_again} onChange={handlenewpassword_againgChange} className="newpwd-input2"></input>
                    </div>           
                </div>

                {/* @@@ */}

                <div className="newemail-container">
                    <div className="newemail-box_1">
                        <div className="newemail-input_text">Email</div>
                        <input type="text" value={newemail} onChange={handlenewemailgChange} className="newemail-input"></input>
                    </div>
                    <div className="newemail-box_2">
                        <button type="submit" className="newemail-box_send">
                            보내기
                        </button>
                    </div>                
                </div>  

                {/* @@@ */}
                <div className="newmail_receive_code_container">
                    <input type="text" value={newcode} onChange={handlenewcodeChange} className="newmail_receive_code" placeholder="code"></input>
                    <button type="submit" className="newmail_receive_code_send">
                            확인
                    </button>
                </div>
                {/* @@@ */}

                <div className="newbtn-container">
                {/* onClick={handleJoin} */}
                    <button className="newbtn-container_1" >JOIN</button>
                    <div className="newbtn-container_2" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>CANCEL</div>          
                </div>  
            </form>
        </div>
    )
}


export default Join;