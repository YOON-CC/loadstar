import React, { useState } from "react";
import "./search_pwd.css";
import store from "../../store";
import axios from 'axios';

const Search_pwd = () => {

    //이메일, 승인코드
    const [newemail, setnewemail] = useState(''); 
    const [newcode, setnewcode] = useState('');

    //변경 전, 다른 버튼보내는 상태
    const [sendemail, setSendemail] = useState(0); //이메일 보내기 버튼
    const [sendcode, setSendcode] = useState(0); //승인코드 확인 버튼

    //받은 유저 index
    const [useridx, setUseridx] = useState(0); //승인코드 확인 버튼

    //이메일, 승인코드 컨트롤 함수
    const handlenewemailgChange = (event) => {//이메일
        setnewemail(event.target.value)
        setSendemail(0);
        setnewcode('')
    };
    const handlenewcodeChange = (event) => {//승인코드
        setnewcode(event.target.value)
        setSendcode(0);
    };

    //비밀번호 버튼 전, 다른 버튼보내는 상태 관리 함수
    const handlesendemailChange = () => { //이메일
        setSendemail(1);
    };
    const handlesendcodeChange = () => { //승인코드
        setSendcode(1);
    };

    const handlejoinSubmit = async (event) => {
        event.preventDefault();
        if(sendemail === 1){
            //이메일 중복확인
            console.log("서울대학교")
            try {
                const response = await axios.post("http://13.125.16.222/emails/find-password/send-email", {
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
                const response = await axios.get("http://13.125.16.222/emails/find-password/check-key", {
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
                  setUseridx(response.data.userId)
                }

            } catch (error) {

            }
        }
    };

    return (
        <div className="search_pwd-box">
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handlejoinSubmit}>
                <div className="email-container">
                    <div className="email-box_1">
                        <div className="email-input_text">Email</div>
                        <input type="text" className="email-input" value={newemail} onChange={handlenewemailgChange}></input>
                    </div>
                    <div className="email-box_2">
                        <button type="submit" className="email-box_send" onClick={handlesendemailChange}>
                            보내기
                        </button>
                    </div>
                </div>

                <div className="mail_receive_code_container">
                    <input className="mail_receive_code" placeholder="code" value={newcode} onChange={handlenewcodeChange}></input>
                    <button type="submit" className="mail_receive_code_send" onClick={handlesendcodeChange}>
                            확인
                    </button>
                </div>

                <div className="stop_search_pwd_container">
                    {newemail !== '' && newcode !== '' && sendemail === 2 && sendcode === 2 ? (
                        <div className="stop_search_pwd_container_button_1" onClick={function(){
                            store.dispatch({type:'CHANGE_PWD', payload: {
                                number: 5,
                                userId: useridx
                            }});
                        }.bind(this)}>비밀번호 변경</div>) : (
                        <div className="stop_search_pwd_container_button_2">비밀번호 변경</div>)}

                    {/* <div className="stop_search_pwd_container_button_1" onClick={function(){
                        store.dispatch({type:'CHANGE_PWD'});
                    }.bind(this)}>비밀번호 변경</div> */}

                    <div className="stop_search_pwd_container_button_1" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>취소</div>
                </div>

            </form>
        </div>
    )
    
}

export default Search_pwd;