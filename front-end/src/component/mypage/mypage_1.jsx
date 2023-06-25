import React, { Component } from "react";



const Mypage_1 = (props) => {

    const title_arr = props.value_title;


    return (
        <div className="mypage_1_container">
            <div className="mypage_1_container_1">
                <div className="mypage_1_container_1_title">내가쓴 글</div>
                <div className="mypage_1_container_1_content">
                    {title_arr.map((text, index) => (
                        <div key={index}>{text.length > 6 ? text.slice(0, 6) + "..." : text}</div>
                    ))}
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
export default Mypage_1;