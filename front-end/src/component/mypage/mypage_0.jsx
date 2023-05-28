import React, { Component } from "react";


export default class Mypage_0 extends Component{


    render() { 
        console.log(this.state)

        return (
            
            <div className="mypage_0_container">
                
                <div className="mypage_0_container_1">
                    <div>아이디</div>
                    <div>이메일</div>
                </div>
                
                <div className="mypage_0_container_2">
                    <div>그래프 사진</div>
                </div>

            </div>
        )
    }
}