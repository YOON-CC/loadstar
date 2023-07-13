import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';

const Change_pwd = () => {

    const { number, userId } = store.getState();

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

    //API 호출
    const handleChangeSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.patch('http://13.125.16.222/users/find-password', {
                userId: userId, 
                password: newpassword,
            });

            if (response.status === 200){
                Swal.fire({
                    title: '비밀번호 변경',
                    text: '비밀번호가 변경되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                // console.log('PATCH 요청 성공:', response.data);
                store.dispatch({type:'HOME'});
            }

        } catch (error) {
            // console.error('PATCH 요청 실패:', error);
        }
    };

    return (
        <div className="login-box">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleChangeSubmit}>
                <div className="user-box">
                    <input type="password" value={newpassword} onChange={handlenewpasswordChange} maxLength={10}></input>
                    <label>Password</label>
                </div>

                <div className="user-box">
                    <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} maxLength={10}></input>
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

            {/* css스타일 */}
            <style>
                {`
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (min-width: 901px) { /*175 이전*/
                    .login-box {
                        position: absolute;
                        top: 38%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 500px;
                        padding: 40px;
                
                        background: rgb(255, 255, 255);
                        box-sizing: border-box;
                        box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                        border-radius: 30px;
                        margin-top: 100px;
                    }
                
                    .login-box h2 {
                        margin: 0 0 30px;
                        padding: 0;
                        color: #4a3b8b;
                        text-align: center;
                    }
                
                    .login-box .user-box {
                        position: relative;
                    }
                
                    .login-box .user-box input {
                        width: 100%;
                        padding: 10px 0;
                        font-size: 16px;
                        color: #4a3b8b;
                        margin-bottom: 30px;
                        border: none;
                        border-bottom: 1px solid #4a3b8b;
                        outline: none;
                        background: transparent;
                    }
                    .login-box .user-box label {
                        position: absolute;
                        top:0;
                        left: 0;
                        padding: 10px 0;
                        font-size: 16px;
                        color: #4a3b8b;
                        pointer-events: none;
                        transition: .5s;
                    }
                
                    .login-box .user-box input:focus ~ label,
                    .login-box .user-box input:valid ~ label {
                        top: -20px;
                        left: 0;
                        font-size: 12px;
                    }
                
                
                    .user-button_container{
                        position: relative;
                        /* background-color: aqua; */
                        height: 45px;
                        display: flex;
                        justify-content: space-around;
                    }
                    .user-button_container_login {
                        position: relative;
                        width: 180px;
                        height: 45px;  
                
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    .user-button_container_login:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                        cursor: pointer;
                    }
                
                    .user-button_container_cancel {
                        position: relative;
                        width: 180px;
                        height: 45px;  
                
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 13px;
                        font-weight: bold;
                
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    } 
                    .user-button_container_cancel:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                        cursor: pointer;
                    }
                
                    .user-forget_container{
                        position: relative;
                        /* background-color: rgb(10, 90, 90); */
                        height: 20px;
                        display: flex;
                        justify-content: space-around;
                        cursor: pointer;
                    }
                
                    .user-forget_container .search{
                        /* background-color: #c3ff00; */
                        position: relative;
                        width: 180px;
                        height: 20px;  
                        margin-top: 5px;
                
                        color: #13074b;
                        font-size: 10px;
                        font-weight: bold;
                
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                
                    /*비밀번호 변경 비활성화*/
                    .user-button_container_login_2 {
                        position: relative;
                        width: 180px;
                        height: 45px;  
                
                        background: rgb(205, 205, 205);
                        border-radius: 10px;
                        border: none;
                        color: #acacac;
                        font-size: 13px;
                        font-weight: bold;
                
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (max-width: 900px) { /*175 이후*/
                    .login-box {
                        position: absolute;
                        top: 38%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 270px;
                        padding: 20px;
                
                        background: rgb(255, 255, 255);
                        box-sizing: border-box;
                        box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                        border-radius: 15px;
                        margin-top: 80px;
                    }  
                    .login-box h2 {
                        font-size: 20px;
                        color: #4a3b8b;
                        text-align: center;
                    }
                    .login-box .user-box {
                        position: relative;
                    }
                
                    .login-box .user-box input {
                        width: 100%;
                        padding: 10px 0;
                        font-size: 12px;
                        color: #4a3b8b;
                        margin-bottom: 30px;
                        border: none;
                        border-bottom: 1px solid #4a3b8b;
                        outline: none;
                        background: transparent;
                    }
                    .login-box .user-box label {
                        position: absolute;
                        top:0;
                        left: 0;
                        padding: 10px 0;
                        font-size: 10px;
                        color: #4a3b8b;
                        pointer-events: none;
                        transition: .5s;
                    }
                    .login-box .user-box input:focus ~ label,
                    .login-box .user-box input:valid ~ label {
                        top: -20px;
                        left: 0;
                        font-size: 12px;
                    }
                    .user-button_container{
                        position: relative;
                        /* background-color: aqua; */
                        height: 45px;
                        display: flex;
                        justify-content: space-around;
                    }
                    .user-button_container_login {
                        position: relative;
                        width: 100px;
                        height: 35px;  
                
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .user-button_container_login:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                        cursor: pointer;
                    }
                
                    .user-button_container_cancel {
                        position: relative;
                        width: 100px;
                        height: 35px;  
                
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    } 
                    .user-button_container_cancel:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                        cursor: pointer;
                    }
                
                    .user-forget_container{
                        position: relative;
                        /* background-color: rgb(10, 90, 90); */
                        height: 20px;
                        display: flex;
                        justify-content: space-around;
                        cursor: pointer;
                    }
                
                    .user-forget_container .search{
                        /* background-color: #c3ff00; */
                        position: relative;
                        width: 180px;
                        height: 20px;  
                        margin-top: 5px;
                
                        color: #13074b;
                        font-size: 10px;
                        font-weight: bold;
                
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                
                    /*비밀번호 변경 비활성화*/
                    .user-button_container_login_2 {
                        height: 35px;  
                        width: 100px;
                        background: rgb(205, 205, 205);
                        border-radius: 10px;
                        border: none;
                        color: #acacac; 
                        font-size: 12px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default Change_pwd;