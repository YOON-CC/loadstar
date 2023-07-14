import React, { useState } from 'react';
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./login.css";
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
                        <div className="login_search_id" onClick={function(){
                            store.dispatch({type:'SEARCH_ID'});
                        }.bind(this)}>아이디찾기</div>

                        <div className="login_search_pwd" onClick={function(){
                            store.dispatch({type:'SEARCH_PWD'});
                        }.bind(this)}>비밀번호 찾기</div>
                    </div>

                </form>

                {/* css스타일 */}
                {/* <style>
                    {`
                    
                    `}
                </style> */}
            </div>
        )

}
export default Login;