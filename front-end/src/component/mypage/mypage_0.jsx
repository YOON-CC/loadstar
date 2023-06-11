import React, { useState } from "react";
import axios from 'axios';

const Mypage_0 = () => {

    return (
        
        <div className="mypage_0_container">

            <div className="cover1">아이디 보기</div>
            <div className="cover2">이메일 보기</div>
            <div className="mypage_0_container_1">
                <div>아이디</div>
                <div>이메일</div>
            </div>
            
            <div className="mypage_0_container_2">
                <div><img className="home_header_body_1_logo_img" src="image/logo.png"></img></div>
            </div>

        </div>
    )
    
}

export default Mypage_0;