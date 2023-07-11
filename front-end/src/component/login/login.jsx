import React, { useState } from 'react';
import "./login.css";
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

        const handleSubmit = async (event) => {
            event.preventDefault();

            //로그인 이후 이동 - 임시 코드
            // store.dispatch({type:'AFTER_LOGIN'});

            try {
                // const response = await axios.post("http://13.125.16.222/users/login", {
                const response = await axios.post("http://13.125.16.222/users/login", {
                    username: id,
                    password: password
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    },
                    // withCredentials: true // 쿠키를 포함한 요청 설정

                });
                if (response.status === 200) {
                    // 상태 코드가 200일 때 처리할 로직을 작성합니다.
                    console.log('로그인 요청이 성공하였습니다.');
                    const access_token = response.headers['x-access-token']
                    const refresh_token = response.headers['cookie']
                    const user_Id = response.data.userId
    
    
                    Cookies.set('X-REFRESH-TOKEN', refresh_token);
                    localStorage.setItem('access-token', access_token)
                    localStorage.setItem('user_Id', user_Id)



                    console.log("토큰들",access_token, refresh_token)
                    console.log("유저인덱스",user_Id)
                    console.log(response.data);

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
                        {/* password */}
                        <input type="password" value={password} onChange={handlePasswordChange} maxLength={10}></input> 
                        <label>Password</label>
                    </div>

                    <div className="user-button_container">
                        {/* <button type="submit" className="user-button_container_login" onClick={function(){
                            store.dispatch({type:'AFTER_LOGIN'});
                        }.bind(this)}>SUBMIT</button> */}

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
            </div>
        )

}
export default Login;