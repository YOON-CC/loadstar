import React, { Component } from "react";
import "./home_header.css";

export default class Home_header extends Component{

    render() { 
        return (
            <div className="home_header_body">
                
                <div className="home_header_body_1">
                    <div className="home_header_body_1_logo">로고</div>
                    <div className="home_header_body_1_form">
                        <div className="home_header_body_1_c1">로그인, 로그아웃</div>
                        <div className="home_header_body_1_c2">회원가입, 마이페이지</div>
                        <div className="home_header_body_1_c3">알림</div>
                    </div>
                </div>

                <div className="home_header_body_2">
                    <div className="home_header_body_2_c1">
                        <div className="home_header_body_2_c1_text">홈페이지 설명 텍스트</div>
                        <div className="home_header_body_2_c1_button_container">
                            <div className="home_header_body_2_c1_button_container_b1">게시글 올리기</div>
                            <div className="home_header_body_2_c1_button_container_b2">그래프 그리기</div>
                        </div>
                    </div>
                    <div className="home_header_body_2_c2">이미지</div>
                </div>
            </div>
        )
    }
}