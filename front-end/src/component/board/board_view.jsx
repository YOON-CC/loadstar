import React, { useState, Component, useEffect } from "react";
import store from "../../store";
import "./board_view.css";
import axios from 'axios';

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

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@api 받아오기@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //게시글 아이디, 게시글 유저인덱스, 제목, 내용,  그래프이미지, 해시테그, 댓글 목록
    const [boardview_boardId, setBoardview_boardId] = useState('');
    const [boardview_userId, setBoardview_userId] = useState('');
    const [boardview_title, setBoardview_title] = useState('');
    const [boardview_content, setBoardview_content] = useState('');
    const [boardview_graph, setBoardview_graph] = useState('');
    const [boardview_hashtags, setBoardview_hashtags] = useState([]);
    const [boardview_comment, setBoardview_comment] = useState([]);
    const [boardview_createAt, setBoardview_createAt] = useState('');
    const [boardview_modifiedAt, setBoardview_modifiedAt] = useState('');

    const handleBoardView = async () => {

        //로컬스토리지 추출
        const access_token = localStorage.getItem('access-token');
        
        //쿠키에서 세션 추출 
        const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
        const prefix = 'X-REFRESH-TOKEN=';
        const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
        const endIndex = extractedValue.indexOf("%");
        const refresh_token = extractedValue.slice(0, endIndex);
        
        //콘솔로 확인
        console.log("access_token입니다. : ", access_token)
        
        console.log("refresh_token입니다. : ",refresh_token);

        try {   
            const response = await axios.get(`http://13.125.16.222/boards/${view}`, {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
          
            console.log(response.data);

            if (response.status === 200) {
                setBoardview_boardId(response.data.boardId);
                setBoardview_userId(response.data.userId);
                setBoardview_title(response.data.title);
                setBoardview_content(response.data.content);
                setBoardview_graph(response.data.careerImage);
                setBoardview_hashtags(response.data.hashtags);
                setBoardview_comment(response.data.comments);
                setBoardview_createAt(response.data.createdAt);
                setBoardview_modifiedAt(response.data.modifiedAt);
            }

        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardView();
    }, []);

    const hashtagElements = boardview_hashtags.map((hashtag, index) => (
        <div key={index}>{hashtag}</div>
    ));

    console.log(boardview_boardId, boardview_userId, boardview_title, boardview_content, boardview_graph, 
    boardview_hashtags, boardview_comment, boardview_createAt, boardview_modifiedAt)

    return (
        <div className="board_view_container">
            <div className="board_view_container_1">
                {/* 헤더 */}
                <div className="board_view_header">
                    <div className="board_view_header_container">
                        <div className="board_view_header_box1">
                            <button className = "board_view_b1 "onClick={close_board}>돌아가기</button>
                        </div>

                        <div className="board_view_header_title">{boardview_title}</div>

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
                            {hashtagElements}
                        </div>
                    </div>

                    <div className="board_view_body_1_graph">
                        <img className="board_view_body_1_graph_img" src="image/그래프_사진.png"></img>
                    </div>

                    <div className="board_view_body_1_context">
                        {boardview_content}
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