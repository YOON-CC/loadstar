import React, { useState, useEffect } from "react";
import "./board_object.css";
import store from "../../store";
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


const Board_object = () => {
    /*네비게이트*/
    const navigate = useNavigate();

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@토큰, 유저아이디@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //로컬스토리지 추출
    const user_Id = localStorage.getItem('user_Id');
    const access_token = localStorage.getItem('access-token');
    const board_Id = localStorage.getItem('board_Id');
    
    //쿠키에서 세션 추출 
    const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    const prefix = 'X-REFRESH-TOKEN=';
    const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    const endIndex = extractedValue.indexOf("%");
    const refresh_token = extractedValue.slice(0, endIndex);

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
    const [bookmark_state, setBookmark_state] = useState(null); // 북마크 상태변화를 강제로 수행

    const handleBoardView = async () => {

        try {   
            const response = await axios.get(`http://13.125.16.222/boards/${board_Id}`, {
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
                <div className="board_view_review_container_list_2">댓글작성일 : {comment.createdAt}</div>
                <div className="board_view_review_container_list_3">댓글수정일 : {comment.modifiedAt}</div>
                <button className="board_view_review_container_list_container_b1">수정</button>
                <button className="board_view_review_container_list_container_b2">삭제</button>
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
                boardId: board_Id,
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
            const response = await axios.delete(`http://13.125.16.222/bookmarks/${board_Id}`,{
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
                
                navigate('/delete');
            }
        }
        catch (error) {

        }
    }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@다양한 함수들@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /*높이 조절 함수*/
    const handleTextareaResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };
    const handleLogout = () => {
        navigate('/');
        store.dispatch({type:"HOME"});
    };
    return (
        <div className="board_object_body">
            {/* 헤더*/}
            <div className="board_object_header">
                <div className="board_object_header_c1">
                    <img className="board_object_header_c1_logo" src="/image/logo.png"></img>
                </div>
                <div className="board_object_header_c2">
                    <div className="board_object_header_c2_b1" onClick={handleLogout}>로그아웃</div>

                    <Link to="/mypage"><div className="board_object_header_c2_b2">마이페이지</div></Link>

                    <div className="board_object_header_c2_b3">
                        <img src="/image/alarm.png"></img>
                    </div>
                </div>
            </div>

            <div className="board_info_title_hashtag_container">
                {/* 글쓴이 아이디, 게시일 */}
                <div className="board_object_info">
                    
                </div>

                {/* 제목*/}
                <div className="board_object_title">
                    {boardview_title}
                </div>

                {/* 해시테그*/}
                <div className="board_object_hashtag">
                    {hashtagElements}
                </div>
            </div>
            {/*구분라인*/}
            <div className="board_object_line"></div>

            {/* 그래프*/}
            <div className="board_object_graph">
                <img className="board_object_graph_img" src="/image/그래프_사진.png"></img>
            </div>

            {/* 내용*/}
            <div className="board_object_content">
                {boardview_content}
            </div>
            
            {/*구분라인*/}
            <div className="board_object_line"></div>

            {/*댓글작성란*/}
            <div className="board_object_commentwrite">
                <form onSubmit={handleBoardComment}>
                    <textarea type="text" className="board_object_commentwrite_input" onChange={handleBoardComment_content_change} onInput={handleTextareaResize} placeholder="댓글을 작성해주세요!"></textarea>
                </form>   
            </div>

            {/*댓글보내기*/}
            <form onSubmit={handleBoardComment}>
                <button type="submit" className="board_object_commentwrite_btn" onClick={handleBoardComment_state_change}>댓글 작성</button>
            </form>
            
            {/*댓글리스트*/}
            <div className="board_view_review_container">
                {CommentList}
            </div>

            {/*푸터*/}
            <div className="board_object_footer">
                <img className="board_object_footer_c3" src="/image/logo.png"></img>
                <div className="board_object_footer_c1">LOADSTAR 2023</div>
                <div className="board_object_footer_c2">당신의 길라잡이</div>  
            </div>

            {/*즐겨찾기, 게시글 삭제 및 수정*/}
            <div className="board_object_tool">
                <div className="board_object_tool_c1">
                    {user_Id == boardview_userId && <button className = "board_object_tool_c1_btn" onClick={handleBoarddelete}>EDIT</button>} 
                    {user_Id != boardview_userId && <div className = "no_board_object_tool_c1_btn ">EDIT</div>} 
                </div>
                <div className="board_object_tool_c2">
                    {user_Id == boardview_userId && <button className = "board_object_tool_c2_btn" onClick={handleBoarddelete}>DELETE</button>}
                    {user_Id != boardview_userId && <div className = "no_board_object_tool_c2_btn">DELETE</div>} 
                </div>
                <div className = "board_object_tool_c3">
                    {bookmark === false && <img className="star" src="/image/star_1.png" onClick={handleBoardBookmark_1}></img>} 
                    {bookmark === true && <img className="star" src="/image/star_2.png" onClick={handleBoardBookmark_2}></img>} 
                </div>                
            </div>
        </div>
    )
    
}

export default Board_object;