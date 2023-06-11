import React, { useState } from 'react';
import "./login.css";
import store from "../../store";
import axios from 'axios';


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

            try {
                const response = await axios.post("http://13.125.16.222/users/login", {
                    username: id,
                    password: password
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });
          
                console.log(response.data);
                store.dispatch({type:'AFTER_LOGIN'});
            }
            catch (error) {
                console.error(error);
            }
        };
        
        return (
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={id} onChange={handleidChange}></input>
                        <label>Id</label>
                    </div>

                    <div className="user-box">
                        {/* password */}
                        <input type="text" value={password} onChange={handlePasswordChange}></input> 
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