import React, { useState } from "react";
import store from "../../store";
import "./join.css";
import axios from 'axios';

const Join = () => {

    //input 변화 상태
    const [newid, setnewId] = useState(''); //아이디
    const [newpassword, setnewPassword] = useState(''); //비밀번호
    const [newpassword_again, setnewPassword_again] = useState(''); //비밀번호확인
    const [newemail, setnewemail] = useState(''); //이메일
    const [newcode, setnewcode] = useState(''); //승인코드

    //아이디 중복환인
    const [can_use_newid, setCan_use_newid] = useState('중복확인이 필요합니다!'); //아이디


    //회원가입 버튼 전, 다른 버튼보내는 상태
    const [sendid, setSendId] = useState(0); //아이디 중복 버튼
    const [sendemail, setSendemail] = useState(0); //이메일 보내기 버튼
    const [sendcode, setSendcode] = useState(0); //승인코드 확인 버튼

    //input 변화 상태 관리 함수
    const handlenewidChange = (event) => { //아이디
        setnewId(event.target.value)
        setSendId(0);
        setCan_use_newid('중복확인이 필요합니다!')
    };

    const handlenewpasswordChange = (event) => { //비밀번호
        setnewPassword(event.target.value)
    };

    const handlenewpassword_againgChange = (event) => {//비밀번호확인
        setnewPassword_again(event.target.value)
    };

    const handlenewemailgChange = (event) => {//이메일
        setnewemail(event.target.value)
        setSendemail(0);
        setnewcode('')
    };

    const handlenewcodeChange = (event) => {//승인코드
        setnewcode(event.target.value)
        setSendcode(0);
    };

    //회원가입 버튼 전, 다른 버튼보내는 상태 관리 함수
    const handlesendidChange = () => { //아이디
        setSendId(1);
    };
    const handlesendemailChange = () => { //이메일
        setSendemail(1);
    };
    const handlesendcodeChange = () => { //승인코드
        setSendcode(1);
    };



    //최종 보내기
    const handlejoinSubmit = async (event) => {
        event.preventDefault();

        //아이디 중복확인
        if(sendid === 1){
            // 
            try {
                const response = await axios.get("http://13.125.16.222/users/duplicated-username", {
                    params: {
                        username: newid
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            
                console.log(response.data);
                if (response.data.check === true){ // 아이디 확인이 된 것이다.
                    setSendId(2);
                    setCan_use_newid("사용 가능한 아이디 입니다!")
                }

            }
            catch (error) {
                if (error.response && error.response.status === 409) {
                    // 400 에러 처리
                    setCan_use_newid("사용할 수 없는 아이디 입니다!")
                } else {
                    // 네트워크 오류 등의 예외 처리
                    console.error('API 요청 중 오류 발생:', error);
                }            
            }
        }
        if(sendemail === 1){
            //이메일 중복확인
            console.log("서울대학교")
            try {
                const response = await axios.post("http://13.125.16.222/emails/check-email", {
                    email: newemail
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });
        
                console.log(response.data);
                if (response.data.message === "메일 전송이 완료되었습니다."){ // 이메일 승인이 된 것이다.
                    setSendemail(2);
                }
            }
            catch (error) {

            }
        }
        //코드 중복확인
        if(sendcode === 1){
            console.log("부경대학교")
            try {
                const response = await axios.get("http://13.125.16.222/emails/check-key", {
                  params: {
                    email: newemail,
                    key: newcode,
                  },
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
              
                console.log(response.data);
                if (response.data.result === true) {
                  // 코드 승인이 된 것이다.
                  setSendcode(2);
                }

            } catch (error) {

            }
        }

        if (newid && newpassword !== '' && newpassword_again !== ''
        && newemail !== '' && newcode !== '' && newpassword === newpassword_again 
        && sendid === 2 && sendemail === 2 && sendcode === 2){
            //최종 회원가입
            try {
                const response = await axios.post("http://13.125.16.222/users/signup", {
                    username: newid,
                    password: newpassword,
                    email: newemail,
                    usernameCheck: true, //boolean, 반환값
                    emailCheck: true, //boolean, 반환값

                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });
        
                console.log(response.data);
                store.dispatch({type:'WELCOME', payload: {
                    number: 6,
                }});
                
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    //여기서 회원가입 가능 여부를 판단해야 한다.
    const handleJoin = () => {
        store.dispatch({type:'WELCOME', payload: {
            number: 6,
            userId: 5
        }});
    };

    return (
        <div className="join-box">
            <h2>회원가입</h2>
            <button onClick={handleJoin}></button>
            <form onSubmit={handlejoinSubmit}>
                {/* @@@ */}
                <div className="newid-container">
                    <div className="newid-box_1">
                        <div className="newid-input_text">Id</div>
                        <input type="text" value={newid} onChange={handlenewidChange} className="newid-input"></input>
                    </div>
                    <div className="newid-box_2">
                        <button type="submit" className="newid-box_send" onClick={handlesendidChange}>
                            중복확인
                        </button>
                    </div>
                    {can_use_newid === "사용 가능한 아이디 입니다!" && <div className="newid-box_3">{can_use_newid}</div>}
                    {can_use_newid === "중복확인이 필요합니다!" && <div className="newid-box_4">{can_use_newid}</div>}
                    {can_use_newid === "사용할 수 없는 아이디 입니다!" && <div className="newid-box_5">{can_use_newid}</div>}
                </div>
                {/* @@@ */}

                <div className="newpwd-container">
                    <div className="newpwd-box_1">
                        <div className="newpwd-input_text">Password</div>
                        <input type="password" value={newpassword} onChange={handlenewpasswordChange} className="newpwd-input"></input>
                    </div>
                    <div className="newpwd-box_2">
                        <div className="newpwd-input_text2">Password_again</div>
                        <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} className="newpwd-input2"></input>
                    </div>
                </div>
                {/* @@@ */}

                <div className="newemail-container">
                    <div className="newemail-box_1">
                        <div className="newemail-input_text">Email</div>
                        <input type="text" value={newemail} onChange={handlenewemailgChange} className="newemail-input"></input>
                    </div>
                    <div className="newemail-box_2">
                        <button type="submit" className="newemail-box_send" onClick={handlesendemailChange}>
                            보내기
                        </button>
                    </div>                
                </div>  

                {/* @@@ */}
                <div className="newmail_receive_code_container">
                    <input type="text" value={newcode} onChange={handlenewcodeChange} className="newmail_receive_code" placeholder="code"></input>
                    <button type="submit" className="newmail_receive_code_send" onClick={handlesendcodeChange}>
                            확인
                    </button>
                </div>
                {/* @@@ */}

                <div className="newbtn-container">
                    {newid && newpassword !== '' && newpassword_again !== ''&& newemail !== '' && 
                    newcode !== '' && newpassword === newpassword_again && sendid === 2 && 
                    sendemail === 2 && sendcode === 2 ? (
                        <button className="newbtn-container_1" >JOIN</button>
                      ) : (
                        <div className="newbtn-container_3">JOIN</div>
                      )} 
                    <div className="newbtn-container_2" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>CANCEL</div>          
                </div>  
            </form>
        </div>
    )
}


export default Join;