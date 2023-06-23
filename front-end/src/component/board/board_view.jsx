import React, { useState, Component } from "react";
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

    //즐겨찾기 상태
    const [bookmark, setBookmark] = useState(0);
    console.log(bookmark)
    
    return (
        <div className="board_view_container">
            <div className="board_view_container_1">
                {/* 헤더 */}
                <div className="board_view_header">
                    <div className="board_view_header_container">
                        <div className="board_view_header_box1">
                            <button className = "board_view_b1 "onClick={close_board}>돌아가기</button>
                        </div>

                        <div className="board_view_header_title">프론트엔드가 꿈인 같이 성장하는 개발자입니다! 참고하세요!</div>

                        <div className="board_view_header_box2">
                            <button className = "board_view_b2 "onClick={close_board}>게시글 수정</button>
                            <button className = "board_view_b3 "onClick={close_board}>게시글 삭제</button>
                            <div className = "board_view_b4" onClick={() => setBookmark(bookmark+1)}>
                                {bookmark % 2 === 0 && <img className="star" src="image/star_1.png"></img>} 
                                {bookmark % 2 === 1 && <img className="star" src="image/star_2.png"></img>} 
                            </div>
                        </div>
                    </div>
                </div>

                {/* 바디 */}
                <div className="board_view_body">

                    <div className="board_view_body_1_hashtag">
                        <div className="board_view_body_1_hashtag_list_container">
                            <div>현직자</div>
                            <div>전공자</div>
                            <div>프론트엔드</div>
                            <div>HTML</div>
                            <div>CSS</div>
                            <div>javascript</div>
                            <div>Typescript</div>
                            <div>node.js</div>
                            <div>react</div>
                            <div>redux</div>
                            <div>next.js</div>
                            <div>graphQL</div>
                            <div>Python</div>
                        </div>
                    </div>

                    <div className="board_view_body_1_graph">
                        <img className="board_view_body_1_graph_img" src="image/그래프_사진.png"></img>
                    </div>

                    <div className="board_view_body_1_context">
                        안녕하세요! 저는 25살이되는 프론트엔드가 꿈인 ooo이라고 합니다. <br/>여러분들이 가시는 길에 조금이라도 도움이 될 수 있도록 
                        제 로드맵을 참고하시기를 바라며 글을 작성했습니다. <br/>
                        질문은 댓글로 남겨주세요~~^^!
                    </div>

                </div>

                {/* 댓글 */}
                <div className="board_view_comment">
                    <form>
                        <div className="board_view_comment_container">
                            <div className="board_view_comment_container_1">
                                <div className="board_view_comment_container_1_text">댓글작성</div>
                                <input type="text" className="board_view_comment_container_1_input"></input>
                            </div>
                            <div className="board_view_comment_container_2">
                                <button type="submit" className="board_view_comment_container_2_send">
                                    작성
                                </button>
                            </div>
                        </div >

                        <div className="board_view_review_container">
                            <div className="board_view_review_container_list"></div>
                            <div className="board_view_review_container_list"></div>
                            <div className="board_view_review_container_list"></div>
                            <div className="board_view_review_container_list"></div>
                            <div className="board_view_review_container_list"></div>
                            <div className="board_view_review_container_list"></div>
                        </div>
                    </form>   
                </div>               

            </div>
            
            
        </div>
    );
}

export default Board_view;