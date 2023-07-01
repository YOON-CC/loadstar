import React, { useState, useEffect } from "react";
import store from "../../store";
import "./board_view.css";
import axios from 'axios';

function Board_view({ view, board_View }) {

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
    // 스크롤 위치를 고정시키고, body에 스크롤 위치를 반영
    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    

    const close_board = (p) => {
        // 자식 컴포넌트에서 부모 컴포넌트의 toggleView 함수 호출
        if (p == "close"){
            store.dispatch({type:'DELETE_ANIMATION'});
        }
        else{
            board_View();

            const scrollTop = parseInt(document.body.style.top || '0', 10);
            
            // 고정된 스크롤 위치를 원래대로 되돌리고, body의 스크롤 스타일을 초기화
            document.body.style.overflow = '';
            // document.body.style.position = '';
            document.body.style.top = '';
        
            // 스크롤 위치를 원래대로 복원
            window.scrollTo(0, -scrollTop);
        }
    };

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@토큰, 유저아이디@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //로컬스토리지 추출
    const user_Id = localStorage.getItem('user_Id');
    const access_token = localStorage.getItem('access-token');
    
    //쿠키에서 세션 추출 
    const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    const prefix = 'X-REFRESH-TOKEN=';
    const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    const endIndex = extractedValue.indexOf("%");
    const refresh_token = extractedValue.slice(0, endIndex);
    
    //콘솔로 확인
    // console.log("access_token입니다. : ", access_token)
    
    // console.log("refresh_token입니다. : ",refresh_token);
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@초반 api 받아오기@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //게시글 아이디, 게시글 유저인덱스, 제목, 내용,  그래프이미지, 해시테그, 댓글 목록
    const [boardview_boardId, setBoardview_boardId] = useState('');
    const [boardview_userId, setBoardview_userId] = useState('');
    const [boardview_username, setBoardview_username] = useState('');
    const [boardview_title, setBoardview_title] = useState('');
    const [boardview_content, setBoardview_content] = useState('');
    const [boardview_graph, setBoardview_graph] = useState('');
    const [boardview_hashtags, setBoardview_hashtags] = useState([]);
    const [boardview_comment, setBoardview_comment] = useState([]);
    const [boardview_createAt, setBoardview_createAt] = useState('');
    const [boardview_modifiedAt, setBoardview_modifiedAt] = useState('');

    //댓글 작성
    const [boardview_comment_content_change, setBoardview_comment_content_change] = useState('');

    //댓글 전송
    const [boardview_commentwrite, setBoardview_commentwrite] = useState(0);
    
    //북마크 상태
    const [bookmark, setBookmark] = useState('');
    const [bookmark_state, setBookmark_state] = useState(0); // 북마크 상태변화를 강제로 수행

    const handleBoardView = async () => {

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
                setBoardview_userId(response.data.userId); // 게시글을 쓴 사용자 유저 인덱스
                setBoardview_username(response.data.username)
                setBoardview_title(response.data.title);
                setBoardview_content(response.data.content);
                setBoardview_graph(response.data.careerImage);
                setBoardview_hashtags(response.data.hashtags);
                setBoardview_comment(response.data.comments);
                setBoardview_createAt(response.data.createdAt);
                setBoardview_modifiedAt(response.data.modifiedAt);

                setBoardview_commentwrite(0);
                
                setBookmark(response.data.bookmark)
            }
            

        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardView();
    }, [boardview_commentwrite, bookmark, bookmark_state]);

    const hashtagElements = boardview_hashtags.map((hashtag, index) => (
        <div key={index}>{hashtag}</div>
    ));

    // console.log(boardview_boardId, boardview_userId, boardview_title, boardview_content, boardview_graph, bookmark,
    // boardview_hashtags, boardview_comment, boardview_createAt, boardview_modifiedAt)

    // console.log("댓글",boardview_comment)

    const CommentList = boardview_comment.map(comment => (
        <div key={comment.commentId} className="board_view_review_container_list">
            <div className="board_view_review_container_list_container">
                <div className="board_view_review_container_list_1">{comment.username}</div>
                <div className="board_view_review_container_list_2">댓글생성일 : {comment.createdAt}</div>
                <div className="board_view_review_container_list_3">댓글수정일 : {comment.modifiedAt}</div>
            </div>
            <div className="board_view_review_container_list_4">{comment.commentContent}</div>
        </div>
    ));

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@댓글 작성 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoardComment = async (event) => {
        event.preventDefault();
        //로컬스토리지 추출
            
        //댓글작성
        try {
            const response = await axios.post("http://13.125.16.222/comments", {
                boardId : boardview_boardId,
                userId : user_Id,
                content : boardview_comment_content_change,
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
            // console.log(response.data);

            // if (response.status === 200) {

            // }
        }
        catch (error) {

        }
        
    }
    const handleBoardComment_state_change = () => {
        setBoardview_commentwrite(1);
    };

    const handleBoardComment_content_change = (event) => { 
        setBoardview_comment_content_change(event.target.value)
    };

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@북마크 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoardBookmark_1 = async () => {
        try {
            const response = await axios.post("http://13.125.16.222/bookmarks", {
                userId: user_Id,
                boardId: boardview_boardId,
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });

            if (response.status === 200) {
                console.log("북마크 온!")
                setBookmark_state(1);
            }
        }
        catch (error) {

        }
    }
    const handleBoardBookmark_2 = async () => {
        try {
            const response = await axios.delete(`http://13.125.16.222/bookmarks/${boardview_boardId}`,{
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
            
            if (response.status === 200) {
                console.log("북마크 해제")
                setBookmark_state(0);
            }
        }
        catch (error) {

        }
    }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글 삭제 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoarddelete = async () => {
        try {
            const response = await axios.delete(`http://13.125.16.222/boards/${boardview_boardId}`,{
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
            
            if (response.status === 200) {
                close_board("close");
            }
        }
        catch (error) {

        }
    }

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
                            {user_Id == boardview_userId && <button className = "board_view_b2" onClick={close_board}>게시글 수정</button>} 
                            {user_Id != boardview_userId && <div className = "board_view_b2_no ">게시글 수정</div>} 

                            {user_Id == boardview_userId && <button className = "board_view_b3" onClick={handleBoarddelete}>게시글 삭제</button>}
                            {user_Id != boardview_userId && <div className = "board_view_b3_no">게시글 삭제</div>} 

                            <div className = "board_view_b4">
                                {bookmark === false && <img className="star" src="image/star_1.png" onClick={handleBoardBookmark_1}></img>} 
                                {bookmark === true && <img className="star" src="image/star_2.png" onClick={handleBoardBookmark_2}></img>} 
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
                    <form onSubmit={handleBoardComment}>
                        <div className="board_view_comment_container">
                            <div className="board_view_comment_container_1">
                                <div className="board_view_comment_container_1_text">댓글작성</div>
                                <input type="text" className="board_view_comment_container_1_input" onChange={handleBoardComment_content_change}></input>
                            </div>
                            <div className="board_view_comment_container_2">
                                <button type="submit" className="board_view_comment_container_2_send" onClick={handleBoardComment_state_change}>
                                    작성
                                </button>
                            </div>
                        </div >

                        <div className="board_view_review_container">
                            <div className="board_view_review_container_list">
                                {CommentList}
                            </div>
                        </div>
                    </form>   
                </div>               

            </div>
            
            
        </div>
    );
}

export default Board_view;