import React, { useState } from "react";
import store from "../../store";
import axios from 'axios';

const Change_pwd = () => {

    const { number, userId } = store.getState();
    console.log("비밀번호 변경에서 받은 값", number, userId)

    //새 비밀번호
    const [newpassword, setnewPassword] = useState(''); //비밀번호
    const [newpassword_again, setnewPassword_again] = useState(''); //비밀번호확인


    //비밀번호 동작 관리 함수
    const handlenewpasswordChange = (event) => { //비밀번호
        setnewPassword(event.target.value)
    };
    const handlenewpassword_againgChange = (event) => {//비밀번호확인
        setnewPassword_again(event.target.value)
    };

    //보내기 함수
    const handleChangeSubmit = async (event) => {
        event.preventDefault();

        //번수값

        try {
            const response = await axios.patch('http://13.125.16.222/users/find-password', {
                userId: userId, // 회원가입에서 받아온 값으로 대체해야 합니다.
                password: newpassword,
            });
            console.log('PATCH 요청 성공:', response.data);
            store.dispatch({type:'HOME'});
        } catch (error) {
            console.error('PATCH 요청 실패:', error);
            // 에러 처리 작업 추가
        }
    };

    return (
        <div className="login-box">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleChangeSubmit}>
                <div className="user-box">
                    <input type="password" value={newpassword} onChange={handlenewpasswordChange}></input>
                    <label>Password</label>
                </div>

                <div className="user-box">
                    <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange}></input>
                    <label>Password_again</label>
                </div>

                <div className="user-button_container">
                    {newpassword === newpassword_again && newpassword !== '' && newpassword_again !== ''? 
                    (<button type="submit" className="user-button_container_login">변경</button>) : 
                    (<div type="submit" className="user-button_container_login_2">변경</div>)}

                    <div className="user-button_container_cancel" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>Cancel</div>
                </div>

            </form>
        </div>
    )
}

export default Change_pwd;