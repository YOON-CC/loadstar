import React, { Component } from "react";


export default class Mypage_1 extends Component{

    render() { 
        console.log(this.state)

        return (
            
            <div className="mypage_1_container">
                <div className="mypage_1_container_1">
                    <div className="mypage_1_container_1_title">내가쓴 글</div>
                    <div className="mypage_1_container_1_content">
                        <div>글1</div>
                        <div>글2</div>
                        <div>글3</div>
                        <div>글4</div>
                        <div>글5</div>
                        <div>글6</div>
                    </div>
                </div>

                <div className="mypage_1_container_2">
                    <div className="mypage_1_container_2_title">BOOK MARK</div>
                    <div className="mypage_1_container_2_content">
                        <div>글1</div>
                        <div>글2</div>
                        <div>글3</div>
                        <div>글4</div>
                        <div>글5</div>
                        <div>글6</div>
                    </div>
                </div>
            </div>
        )
    }
}