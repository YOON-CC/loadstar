import React, { Component } from "react";
import store from "../../store";
import "./board_view.css";

function Board_view({ view, board_View }) {

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
    // 스크롤 위치를 고정시키고, body에 스크롤 위치를 반영
    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    

    const close_board = () => {
        // 자식 컴포넌트에서 부모 컴포넌트의 toggleView 함수 호출
        board_View();

        const scrollTop = parseInt(document.body.style.top || '0', 10);
        
        // 고정된 스크롤 위치를 원래대로 되돌리고, body의 스크롤 스타일을 초기화
        document.body.style.overflow = '';
        // document.body.style.position = '';
        document.body.style.top = '';
    
        // 스크롤 위치를 원래대로 복원
        window.scrollTo(0, -scrollTop);
    };

    return (
        <div className="board_view_container">
            <div></div>
            <button className = "b2 "onClick={close_board}>해제</button>
        </div>
    );
}

export default Board_view;