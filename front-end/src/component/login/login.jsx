import React, { useState } from 'react';
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    
        const [id, setId] = useState('');
        const [password, setPassword] = useState('');

        const handleidChange = (event) => {
            setId(event.target.value)
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value)
        };

        //API 호출
        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await axios.post("http://13.125.16.222/users/login", {
                    username: id,
                    password: password
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    },
                });
                if (response.status === 200) {
                    const access_token = response.headers['x-access-token']
                    const refresh_token = response.headers['cookie']
                    const user_Id = response.data.userId
    
    
                    Cookies.set('X-REFRESH-TOKEN', refresh_token);
                    localStorage.setItem('access-token', access_token)
                    localStorage.setItem('user_Id', user_Id)

                    store.dispatch({type:'AFTER_LOGIN'});
                }
            }   
            catch (error) {
                Swal.fire({
                    title: 'Login',
                    text: '로그인에 실패했습니다.',
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        };
        
        return (
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={id} onChange={handleidChange} maxLength={10}></input>
                        <label>Id</label>
                    </div>

                    <div className="user-box">
                        <input type="password" value={password} onChange={handlePasswordChange} maxLength={10}></input> 
                        <label>Password</label>
                    </div>

                    <div className="user-button_container">
                        <button type="submit" className="user-button_container_login">SUBMIT</button>
                        <div className="user-button_container_cancel" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>CANCEL</div>
                    </div>

                    <div className="user-forget_container">
                        <div className="search" onClick={function(){
                            store.dispatch({type:'SEARCH_ID'});
                        }.bind(this)}>아이디찾기</div>

                        <div className="search" onClick={function(){
                            store.dispatch({type:'SEARCH_PWD'});
                        }.bind(this)}>비밀번호 찾기</div>
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
export default Login;