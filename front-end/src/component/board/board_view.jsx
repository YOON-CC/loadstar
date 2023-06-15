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
            <div className="board_view_container_1">
                <div className="board_view_header">
                    <div className="board_view_header_box1">
                        <button className = "board_view_b1 "onClick={close_board}>돌아가기</button>
                    </div>

                    <div className="board_view_header_title">프론트엔드가 꿈인 같이 성장하는 개발자입니다! 참고하세요!</div>

                    <div className="board_view_header_box2">
                        <button className = "board_view_b2 "onClick={close_board}>게시글 수정</button>
                        <button className = "board_view_b3 "onClick={close_board}>게시글 삭제</button>
                    </div>
                </div>

                <div className="board_view_body">
                    <div className="board_view_body_1">
                        
                        <div className="board_view_body_1_container">
                            <div className="board_view_body_1_graph">
                                <img className="board_view_body_1_graph_img" src="image/faviconlogo.png"></img>
                            </div>
                        </div>
                        <div className="board_view_body_1_context">
                            안녕하세요! 저는 25살이되는 프론트엔드가 꿈인 ooo이라고 합니다. <br/>여러분들이 가시는 길에 조금이라도 도움이 될 수 있도록 
                            제 로드맵을 참고하시기를 바라며 글을 작성했습니다. <br/>
                            질문은 댓글로 남겨주세요~~^^!
                        </div>
                    </div>
                    <div className="board_view_body_2">
                        <form>
                            <div className = "board_view_body_2_form">
                                <div className="board_view_body_2_form_1">
                                    <div className="board_view_body_2_form_1_text">댓글작성</div>
                                    <input type="text" className="board_view_body_2_form_1_text_input"></input>
                                </div>
                                <div className="board_view_body_2_form_2">
                                    <button type="submit" className="newid-box_send">
                                        작성
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="comments_container">
                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디1</div>
                                <div className="comments_container_list_comment">댓글내용1</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디2</div>
                                <div className="comments_container_list_comment">댓글내용2</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디3</div>
                                <div className="comments_container_list_comment">댓글내용3</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디4</div>
                                <div className="comments_container_list_comment">댓글내용4</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디5</div>
                                <div className="comments_container_list_comment">댓글내용5</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디6</div>
                                <div className="comments_container_list_comment">댓글내용6</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디7</div>
                                <div className="comments_container_list_comment">댓글내용7</div>
                            </div>

                            <div className="comments_container_list">
                                <div className="comments_container_list_title">아이디8</div>
                                <div className="comments_container_list_comment">댓글내용8</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="board_view_footer">
                    <div>프론트엔드</div>
                    <div>전공자</div>
                    <div>비현직자</div>
                    <div>PYTHON</div>
                    <div>REACT</div>
                    <div>부스트캠프</div>
                </div>
                
            </div>
            
            
        </div>
    );
}

export default Board_view;