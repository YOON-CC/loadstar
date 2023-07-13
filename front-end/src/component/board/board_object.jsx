import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import store from "../../store";
import axios from 'axios';
import ApexCharts from 'apexcharts';
import { Link, useNavigate} from 'react-router-dom';

const Board_object = () => {
    /*네비게이트*/
    const navigate = useNavigate();
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

    //그래프
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (chartData.length > 0) {
          const options = {
            series: [
              {
                data: chartData,
              },
            ],
            chart: {
              height: 350,
              type: 'rangeBar',
              zoom: {
                enabled: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: 20,
                borderRadius: 5,
              },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: '#251666', // x축 글 색상
                    },
                },
                axisBorder: {
                    color: '#251666', // X축 선 색상
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#251666', // y축 글 색상
                    },
                },
            },
            colors: ['#251666'],
          };
    
          const chart = new ApexCharts(
            document.querySelector("#chart"),
            options
          );
          chart.render();
    
          return () => {
            chart.destroy();
          };
        }
    }, [chartData]);

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@초반 api 받아오기@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //게시글 아이디, 게시글 유저인덱스, 제목, 내용,  그래프이미지, 해시테그, 댓글 목록
    const [boardview_boardId, setBoardview_boardId] = useState('');
    const [boardview_userId, setBoardview_userId] = useState('');
    const [boardview_username, setBoardview_username] = useState('');
    const [boardview_title, setBoardview_title] = useState('');
    const [boardview_content, setBoardview_content] = useState('');
    const [boardview_hashtags, setBoardview_hashtags] = useState([]);
    const [boardview_comment, setBoardview_comment] = useState([]);
    const [boardview_createAt, setBoardview_createAt] = useState('');
    const [boardview_modifiedAt, setBoardview_modifiedAt] = useState('');

    //댓글 작성
    const [boardview_comment_content_change, setBoardview_comment_content_change] = useState('');

    //댓글 전송
    const [boardview_commentwrite, setBoardview_commentwrite] = useState(0);
    
    //댓글 삭제
    const [boardview_commentdelete, setBoardview_commentdelete] = useState(0);

    //북마크 상태
    const [bookmark, setBookmark] = useState('');
    const [bookmark_state, setBookmark_state] = useState(null); // 북마크 상태변화를 강제로 수행

    //편집 강제 수행
    const [edit_state, setEdit_state] = useState(null); // 북마크 상태변화를 강제로 수행


    const handleBoardView = async () => {

        try {   
            const response = await axios.get(`http://13.125.16.222/boards/${board_Id}`, {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
          
            if (response.status === 200) {
                setBoardview_boardId(response.data.boardId);
                setBoardview_userId(response.data.userId); // 게시글을 쓴 사용자 유저 인덱스
                setBoardview_username(response.data.username)
                setBoardview_title(response.data.title);
                setBoardview_content(response.data.content);
                setBoardview_hashtags(response.data.hashtags);
                setBoardview_comment(response.data.comments);
                setBoardview_createAt(response.data.createdAt.split("T")[0]);
                setBoardview_modifiedAt(response.data.modifiedAt.split("T")[0]);
                
                setChartData(response.data.arr);

                setBoardview_commentwrite(0);
                setBoardview_commentdelete(0);
                setEdit_state(0);
                
                setBookmark(response.data.bookmark)
            }
            

        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardView();
    }, [boardview_commentwrite, bookmark, bookmark_state, boardview_commentdelete, edit_state]);

    const hashtagElements = boardview_hashtags.map((hashtag, index) => (
        <div key={index}>{hashtag}</div>
    ));

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@댓글 삭제 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoardcommentdelete = async (boardview_comment_userId, event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://13.125.16.222/comments/${boardview_comment_userId}`,{
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
            
            if (response.status === 200) {
                Swal.fire({
                    title: '댓글삭제',
                    text: '댓글을 삭제했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                setBoardview_commentdelete(1)
            }
        }
        catch (error) {

        }
    } 


    const CommentList = boardview_comment.map(comment => (
        <div key={comment.commentId} className="board_view_review_container_list">
            <div className="board_view_review_container_list_container">
                <div className="board_view_review_container_list_1">{comment.username} </div>
                <div className="board_view_review_container_list_2">댓글작성일 : {comment.createdAt.split("T")[0]}</div>
                <div className="board_view_review_container_list_3">댓글수정일 : {comment.modifiedAt.split("T")[0]}</div>
                {comment.userId == user_Id && (
                    <div className="board_view_review_container_list_3_btn_container">
                        <form onSubmit={(event) => handleBoardcommentdelete(comment.commentId, event)}>
                            <button className="board_view_review_container_list_container_btn">삭제</button>
                        </form>
                    </div>
                )}
                {comment.userId != user_Id && (
                    <div className="board_view_review_container_list_3_btn_container">
                        <div className="board_view_review_container_list_3_btn_container_no_owner">삭제</div>
                    </div>
                )}
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
            if (response.status === 200) {
                Swal.fire({
                    title: '댓글작성',
                    text: '댓글작성을 완료했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
            }
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
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@편집@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /*편집모드*/
    const [boardedit_mode, setBoardEdit_mode] = useState(false);
    const handleEditmode = (event) => {
        setBoardEdit_mode(!boardedit_mode)
    };

    /*제목변경*/
    const [boardedit_title, setBoardedit_title] = useState(boardview_title);

    const handleboardedit_titleChange = (event) => { //년도
        setBoardedit_title(event.target.value)
    };
    /*해시태그 변경*/
    const [send_edit_hashtag, setSendEditHashtag] = useState([]);

    /*내용변경*/
    const [boardedit_content, setBoardedit_content] = useState(boardview_content);
    const handleboardedit_contentChange = (event) => { //년도
        setBoardedit_content(event.target.value)
    };

    const handleBoardEditSubmit = async (event) => {
        event.preventDefault();
        
        if (boardedit_title === '' || boardedit_content === ''){
            Swal.fire({
                title: 'Edit',
                text: '제목 또는 내용을 입력해주세요!',
                icon: 'warning',
                confirmButtonText: '확인',
            });
        }
        try {
            const response = await axios.patch(`http://13.125.16.222/boards/${boardview_boardId}`, {
                title : boardedit_title,
                content : boardedit_content,
                hashtags : send_edit_hashtag
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Edit',
                    text: '게시물이 수정되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                setBoardEdit_mode(false)
                setEdit_state(1)
            }

        } catch (error) {
            Swal.fire({
                title: 'Edit',
                text: '편집되지 않았습니다!',
                icon: 'error',
                confirmButtonText: '확인',
            });
            // 에러 처리 작업 추가
        }
    };
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@해시태그 편집들@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /*해시테그 boardview_hashtags*/
    const [edit_hashtags, setEditHashtags] = useState([
        { text: '질문글', selected: false },

        { text: '비현직자', selected: false },
        { text: '현직자', selected: false },
        { text: '전공자', selected: false },
        { text: '비전공자', selected: false },
        { text: 'front', selected: false },
        { text: 'back', selected: false },

        { text: 'html', selected: false },
        { text: 'css', selected: false },
        { text: 'javascript', selected: false },
        { text: 'typescript', selected: false },
        { text: 'react', selected: false },
        { text: 'java', selected: false },
        { text: 'python', selected: false },
        { text: 'spring', selected: false },
        { text: 'springboot', selected: false },
        { text: 'node.js', selected: false },

        { text: '운영체제', selected: false },
        { text: '네트워크', selected: false },
        { text: '자료구조', selected: false },
        { text: '컴퓨터구조', selected: false },
        { text: '컴파일러', selected: false },
        { text: '알고리즘', selected: false },
        { text: '데이터베이스', selected: false },

        { text: '부트캠프', selected: false },
        { text: '개발외주', selected: false },
    ]);
      
    useEffect(() => {
        setEditHashtags((prevEditHashtags) => {
          return prevEditHashtags.map((editHashtag) => {
            return {
              ...editHashtag,
              selected: boardview_hashtags.some((hashtag) => hashtag === editHashtag.text),
            };
          });
        });
      }, [boardview_hashtags]);

    const handleClick = (index) => {
        setEditHashtags((prevHashtags) => {
            const updatedHashtags = prevHashtags.map((hashtag, i) => {
                if (i === index) {
                    return { ...hashtag, selected: !hashtag.selected };
                } else if (hashtag.text === '비현직자' && prevHashtags[index].text === '현직자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '현직자' && prevHashtags[index].text === '비현직자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '전공자' && prevHashtags[index].text === '비전공자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '비전공자' && prevHashtags[index].text === '전공자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === 'front' && prevHashtags[index].text === 'back') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === 'back' && prevHashtags[index].text === 'front') {
                    return { ...hashtag, selected: false };
                } else {
                    return hashtag;
                }
            });
      
          return updatedHashtags;
        });
    };

    useEffect(() => {
        const selectedHashtags = edit_hashtags.filter((hashtag) => hashtag.selected);
        const selectedHashtagTexts = selectedHashtags.map((hashtag) => hashtag.text);
        setSendEditHashtag(selectedHashtagTexts);
    }, [edit_hashtags]);


    //네비게이트 자동 실행
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
                    <Link to="/mypage" style={{ textDecoration: 'none' }}><div className="board_object_header_c2_b2">마이페이지</div></Link>
                </div>
            </div>

            <div className="board_info_title_hashtag_container">
                {/* 글쓴이 아이디, 게시일 */}
                <div className="board_object_info">
                    <div className="board_object_info_owner">작성자 : {boardview_username}</div>
                    <div className="board_object_info_edit_container">
                        <div>작성일 : {boardview_createAt}</div>
                        <div>수정일 : {boardview_modifiedAt}</div>
                    </div>
                </div>

                {/* 제목*/}
                {boardedit_mode === false && (
                    <div className="board_object_title">
                        {boardview_title}
                    </div>
                )}
                {boardedit_mode === true && (
                    <div className="board_object_title">
                        <input className="board_object_title_edit" placeholder={boardview_title} onChange={handleboardedit_titleChange}></input>
                    </div>
                )}

                {/* 해시테그*/}
                {boardedit_mode === false && (
                    <div className="board_object_hashtag">
                        {hashtagElements}
                    </div>
                )}
                {boardedit_mode === true && (
                    <div className="board_object_hashtag_edit_mode">
                        {edit_hashtags.map((hashtag, index) => (
                        <div key={index} style={{ backgroundColor: hashtag.selected ? 'white' : '#0000000e' }} onClick={() => handleClick(index)}>
                            {hashtag.text}
                        </div>
                        ))}
                    </div>
                )}
                

            </div>

            {/* 그래프*/}
            <div className="board_object_chart_container">
                <div id="chart" />
            </div>

            {/* 내용*/}
            {boardedit_mode === false && (
                <div className="board_object_content">
                    {boardview_content}
                </div>
                )}
            {boardedit_mode === true && (
                <div className="board_object_content">
                    <textarea className="board_object_content_edit" placeholder={boardview_content} onChange={handleboardedit_contentChange}></textarea>
                </div>
            )}
            
            {/*구분라인*/}
            <div className="board_object_line"></div>

            {/*댓글작성란*/}
            <div className="board_object_commentwrite">
                <form onSubmit={handleBoardComment}>
                    <textarea type="text" className="board_object_commentwrite_input" onChange={handleBoardComment_content_change} placeholder="댓글을 작성해주세요!"></textarea>
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
            {boardedit_mode === false && (
            <div className="board_object_tool">
                <div className="board_object_tool_c1">
                    {user_Id == boardview_userId && <button className = "board_object_tool_c1_btn" onClick={handleEditmode}>EDIT</button>} 
                    {user_Id != boardview_userId && <div className = "no_board_object_tool_c1_btn">EDIT</div>} 
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
            )}
            {boardedit_mode === true && (
                <div className="board_object_tool">
                    <form onSubmit={handleBoardEditSubmit}>
                        <button className="board_object_tool_edit_1">
                            저장
                        </button>
                    </form>
                    <div className="board_object_tool_edit_2" onClick={handleEditmode}>
                        취소
                    </div>           
                </div>
            )}
            {boardedit_mode === true && (
                <div className="boardedit_mode_background"></div>
            )}


            {/* css스타일 */}
            <style>
                {`
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (min-width: 901px) { /*175 이전*/
                    .board_object_body{
                        /* background-color: #ffffff11; */
                        /* background: linear-gradient(135deg, #13074b, #372978, #372978, #13074b, #13074b); */
                    }
                    /*헤더*/
                    .board_object_header{
                        background: linear-gradient(135deg, #13074b, #372978, #372978, #13074b, #13074b);
                        height: 50px;
                        width: 100%;
                        box-shadow: 0px 0px 5px rgb(0, 0, 0), 0px 0px 5px rgb(72, 72, 72);

                        display: flex;
                        justify-content: space-between;
                    }
                    .board_object_header_c1{

                        /* background-color: aqua; */
                        height: 100%;
                        width: 65px;
                        margin-left: 10px;
                    }
                    .board_object_header_c1_logo{
                        height: 100%;
                        width: 100%;
                    }
                    .board_object_header_c2{
                        /* background-color: aqua; */
                        width: 195px;

                        display: flex;
                        justify-content: space-evenly;

                        margin-right: 10px;
                    }
                    .board_object_header_c2_b1{
                        height: 20px;
                        width: 80px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;

                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;

                        display: flex;
                        justify-content: center;
                        margin-top: 11px;
                        padding-top: 3px;
                        cursor: pointer;
                    }
                    .board_object_header_c2_b2{
                        height: 20px;
                        width: 80px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;

                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;

                        display: flex;
                        justify-content: center;
                        margin-top: 11px;
                        padding-top: 3px;
                        cursor: pointer;
                    }
                    .board_object_header_c2_b3{
                        height: 25px;
                        width: 25px;
                        margin-top: 12px;
                    }
                    .board_object_header_c2_b3 img{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                    /*게시글 정보, 제목, 해시테그 컨테이너*/
                    .board_info_title_hashtag_container{
                        position: relative;
                        background: linear-gradient(135deg, #251666, #4d3c9b, #4d3c9b, #251666, #251666);
                        width: 900px;
                        left: 50%;
                        transform: translate(-50%);
                        padding: 20px;
                        margin-top: 80px;
                        border-radius: 20px;
                        box-shadow: 0px 0px 5px rgb(0, 0, 0);
                        z-index: 1;
                    }
                    /*제목*/
                    .board_object_title{
                        position: relative;
                        /* background-color: aqua; */
                        /* height: 100px; */
                        width: 580px;
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);

                        white-space: normal;
                        word-wrap: break-word;

                        font-size: 30px;
                        font-weight: bold;
                        color: #ffffff;
                        
                    }
                    .board_object_title_edit{
                        outline: none;
                        border: none;
                    }
                    .board_object_content_edit{
                        height: 200px;
                        width: 99%;
                        border: none;
                        resize: none; 
                        outline: none;
                    }
                    .board_object_tool_edit_1{
                        background-color: #ffffff0e;
                        height: 77px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 50px 50px 0px 0px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 10px;
                    }
                    .board_object_tool_edit_1:hover{
                        background-color: #82828246;
                    }
                    .board_object_tool_edit_2{
                        background-color: #ffffff0e;
                        height: 77px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 0px 0px 50px 50px ;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 10px;
                    }
                    .board_object_tool_edit_2:hover{
                        background-color: #82828246;
                    }
                    .board_object_hashtag{
                        position: relative;
                        /* background-color: rgb(124, 124, 124); */
                        width: 600px;
                        left: 50%;
                        transform: translate(-50%);
                        margin-top: 10px;
                        display: flex;
                        flex-wrap: wrap;
                        /* justify-content: space-between; */
                    }
                    .board_object_hashtag div{
                        background-color: #ffffff;
                        height: 30px;
                        width: 90px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50px;
                        margin-top: 10px;
                        
                        font-size: 12px;
                        font-weight: bold;
                        color: #372978;
                        margin-left: 9px;
                        
                    }
                    /*편집모드*/
                    .board_object_hashtag_edit_mode{
                        position: relative;
                        /* background-color: rgb(124, 124, 124); */
                        width: 600px;
                        left: 50%;
                        transform: translate(-50%);
                        margin-top: 10px;
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .board_object_hashtag_edit_mode div{
                        height: 30px;
                        width: 90px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50px;
                        margin-top: 10px;
                        
                        font-size: 12px;
                        font-weight: bold;
                        color: #8c8c8c;
                        margin-left: 9px;
                        cursor: pointer;
                    }

                    /*게시글 정보*/
                    .board_object_info{
                        position: relative;
                        background-color: rgba(250, 250, 250, 0.137);
                        height: 40px;
                        width: 800px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);
                        border-radius: 10px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .board_object_info_owner{
                        /* background-color: #251666; */
                        /* width: 200px; */
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        color: #ffffff;
                        font-weight: bold;
                        margin-left: 25px;
                    }
                    .board_object_info_edit_container{
                        height: 100%;
                        /* display: flex;
                        justify-content: space-between; */
                        margin-left: 360px;
                        margin-top: 4px;
                        
                    }
                    .board_object_info_edit_container div{
                        /* background-color: #251666; */
                        width: 160px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-weight: bold;
                        color: #ffffff;
                        font-size: 12px;
                    }
                    
                    /*구분라인*/
                    .board_object_line{
                        position: relative;
                        background-color: rgb(124, 124, 124);
                        height: 1px;
                        width: 940px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);
                    }
                    /*그래프*/
                    .board_object_chart_container{
                        position: relative;
                        background-color: rgba(81, 61, 163, 0.128);
                        border-radius: 20px;
                        width: 900px;
                        left: 50%;
                        transform: translate(-50%);
                        padding: 20px;
                        margin-top: 10px;
                        /* box-shadow: 0px 0px 4px rgb(57, 57, 57); */
                    }
                    /* .board_object_graph{
                        position: relative;
                        background-color: rgb(170, 48, 48);
                        height: 300px;
                        width: 600px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   
                        box-shadow: 0px 0px 1px 0px rgb(0, 0, 0), 0px 0px 1px 0px rgb(0, 0, 0);

                    }
                    .board_object_graph img{
                        width: 100%;
                        height: 100%;
                    } */
                    /*내용*/
                    .board_object_content{
                        position: relative;
                        background-color: rgb(255, 255, 255);
                        width: 935px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   

                        border-left: 7px solid #372978; /* 왼쪽 경계선의 굵기와 색상을 설정합니다. */
                        font-weight: bold;
                        font-size: 13px;
                        z-index: 1;
                    }
                    /*댓글 작성*/
                    .board_object_commentwrite{
                        position: relative;
                        /* background-color: rgb(170, 48, 48); */
                        height: 80px;
                        width: 600px;
                        padding: 10px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   
                    }
                    .board_object_commentwrite_input{
                        width: 100%; /* 부모 요소의 넓이에 맞게 조절 */
                        resize: none; /* 사용자가 크기 조절하지 못하도록 비활성화 */
                        outline: none;

                        overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
                        min-height: 80px; /* 최소 높이 설정 */
                        box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 계산 */

                        font-size: 12px;
                        font-weight: bold;
                        border: 2px solid #28005f; /* 테두리 색상을 여기에 지정합니다 */
                        background-color: rgb(255, 255, 255);


                    }
                    /*댓글 작성 버튼*/
                    .board_object_commentwrite_btn{
                        position: relative;
                        height: 30px;
                        width: 100px;
                        margin-left: 250px;
                        left: 50%;
                        transform: translate(-50%);   
                        cursor: pointer;


                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 20px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .board_object_commentwrite_btn:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                    }
                    /*댓글 리스트*/
                    .board_view_review_container{
                        position: relative;
                        /* background-color: rgb(170, 48, 48); */

                        width: 600px;
                        
                        margin-top: 10px;
                        left: 50%;
                        transform: translate(-50%); 
                    }
                    .board_view_review_container_list{
                        background-color: #15004011;
                        /* height:65px; */
                        width: 100%;

                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .board_view_review_container_list_container{
                        width: 100%;
                        display: flex;
                        /* justify-content: space-evenly; */
                    }
                    .board_view_review_container_list_1{
                        background-color: #240b55f5;
                        width: 100px;
                        height:20px;
                        border-radius: 5px 0px 0px 0px;        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;

                    }
                    .board_view_review_container_list_2{
                        background-color: #433264f5;
                        width: 200px;
                        height:20px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;
                    }
                    .board_view_review_container_list_3{
                        background-color: #433264f5;
                        width: 200px;
                        height:20px;     

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;

                    }
                    .board_view_review_container_list_3_btn_container{
                        display: flex;
                    }
                    .board_view_review_container_list_3_btn_container_no_owner{
                        background-color: #68597577;
                        height: 100%;
                        width: 100px;
                        border-radius: 0px 5px 0px 0px;

                        display: flex;
                        color: #ffffff;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                    }

                    .board_view_review_container_list_container_btn{
                        background-color: #240b55f5;
                        width: 100px;
                        height:20px;     
                        border: none;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;
                        border-radius: 0px 5px 0px 0px;
                    }
                    .board_view_review_container_list_container_btn:hover{
                        background-color: #0e0422f5;
                        cursor: pointer;
                    }
                    .board_view_review_container_list_4{
                        position: relative;

                        background-color: #0000000f;
                        width: 100%;
                        /* height:40px; */
                        border-radius: 0px 0px 5px 5px;
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;

                        white-space: pre-wrap;
                        word-break: break-word;
                    }
                    .board_object_footer{
                        position: relative;
                        /* background-color: #372978; */
                        height: 300px;
                        width: 600px;
                        margin-top: 100px;
                        left: 50%;
                        transform: translate(-50%);   
                    }
                    /*푸터*/
                    .board_object_footer_c1{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 17px;
                        font-weight: bold;
                    }
                    .board_object_footer_c2{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 13px;
                        font-weight: bold;
                        color: #2d2d2d;
                    }
                    .board_object_footer_c3{
                        background-color: #372978;
                        height: 100px;
                        width: 110px;

                        font-size: 17px;
                        font-weight: bold;
                        margin-left: 245px;
                    }
                    /*고정 컨테이너*/
                    .board_object_tool{
                        position: fixed;
                        background: linear-gradient(135deg, #31275e, #4d3c9b, #4d3c9b, #31275e, #31275e);
                        width: 70px;
                        height: 185px;
                        top: 50%;
                        left: 90%;
                        transform: translate(-50%, -50%);
                        border-radius: 50px;
                        box-shadow: 0px 0px 3px rgb(0, 0, 0);
                        z-index: 1;
                    }
                    .board_object_tool_c1_btn{
                        background-color: #ffffff0e;
                        height: 50px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 10px;

                    }
                    .board_object_tool_c1_btn:hover{
                        background-color: #82828246;
                    }
                    .no_board_object_tool_c1_btn{
                        background-color: #00000019;
                        height: 50px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #959595;
                        margin-top: 10px;
                    }
                    .board_object_tool_c2_btn{
                        background-color: #ffffff0e;
                        height: 50px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 10px;
                    }
                    .board_object_tool_c2_btn:hover{
                        background-color: #82828246;
                    }
                    .no_board_object_tool_c2_btn{
                        background-color: #00000019;
                        height: 50px;
                        width: 50px;
                        font-size: 16px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #959595;
                        margin-top: 10px;
                    }
                    .star{
                        width: 40px;
                        height: 40px;
                        margin-left: 15px;
                        margin-top: 10px;
                        cursor: pointer;
                    }
                    .boardedit_mode_background{
                        position: fixed;
                        background-color: #000000b1;
                        height: 100vh;
                        width: 100%;

                        top : 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        z-index: 0;
                    }
                }
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (max-width: 900px) { /*175 이후*/
                    .board_object_body{
                        /* background-color: #fcffa8; */
                    }
                    /*헤더*/
                    .board_object_header{
                        background: linear-gradient(135deg, #13074b, #372978, #372978, #13074b, #13074b);
                        height: 50px;
                        width: 100%;
                        box-shadow: 0px 0px 5px rgb(0, 0, 0), 0px 0px 5px rgb(72, 72, 72);

                        display: flex;
                        justify-content: space-between;
                    }
                    .board_object_header_c1{
                        /* background-color: aqua; */
                        height: 100%;
                        width: 65px;
                        margin-left: 5px;
                    }
                    .board_object_header_c1_logo{
                        height: 100%;
                        width: 100%;
                    }
                    .board_object_header_c2{
                        /* background-color: aqua; */
                        width: 200px;

                        display: flex;
                        justify-content: space-evenly;

                    }
                    .board_object_header_c2_b1{
                        height: 20px;
                        width: 70px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;

                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;

                        display: flex;
                        justify-content: center;
                        margin-top: 10px;
                        padding-top: 3px;
                        cursor: pointer;
                    }
                    .board_object_header_c2_b2{
                        height: 20px;
                        width: 70px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;

                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;

                        display: flex;
                        justify-content: center;
                        margin-top: 10px;
                        padding-top: 3px;
                        cursor: pointer;
                    }
                    .board_object_header_c2_b3{
                        height: 25px;
                        width: 25px;
                        margin-top: 10px;
                    }
                    .board_object_header_c2_b3 img{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                    /*게시글 정보, 제목, 해시테그 컨테이너*/
                    .board_info_title_hashtag_container{
                        position: relative;
                        background: linear-gradient(135deg, #251666, #4d3c9b, #4d3c9b, #251666, #251666);
                        width: 230px;
                        left: 50%;
                        transform: translate(-50%);
                        padding: 20px;
                        margin-top: 30px;
                        border-radius: 20px;
                        box-shadow: 0px 0px 5px rgb(0, 0, 0);
                        z-index: 1;
                    }
                    /*제목*/
                    .board_object_title{
                        position: relative;
                        /* background-color: aqua; */
                        /* height: 100px; */
                        width: 240px;
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);

                        white-space: normal;
                        word-wrap: break-word;

                        font-size: 15px;
                        font-weight: bold;
                        color: #ffffff;
                    }
                    .board_object_hashtag{
                        position: relative;
                        /* background-color: rgb(124, 124, 124); */
                        width: 240px;
                        left: 50%;
                        transform: translate(-50%);
                        margin-top: 10px;
                        display: flex;
                        flex-wrap: wrap;
                        /* justify-content: space-between; */
                    }
                    .board_object_hashtag div{
                        background-color: #ffffff;
                        height: 30px;
                        width: 75px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50px;
                        margin-top: 10px;
                        
                        font-size: 10px;
                        font-weight: bold;
                        color: #372978;
                        margin-left: 4px;
                    }
                    
                    .board_object_content_edit{
                        height: 100px;
                        width: 100%;
                        border: none;
                        resize: none; 
                        outline: none;
                    }
                    /*편집모드*/
                    .board_object_hashtag_edit_mode{
                        position: relative;
                        /* background-color: rgb(124, 124, 124); */
                        width: 240px;
                        left: 50%;
                        transform: translate(-50%);
                        margin-top: 10px;
                        display: flex;
                        flex-wrap: wrap;
                        /* justify-content: space-between; */
                    }
                    .board_object_hashtag_edit_mode div{
                        background-color: #ffffff;
                        height: 30px;
                        width: 75px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50px;
                        margin-top: 10px;
                        
                        font-size: 10px;
                        font-weight: bold;
                        color: #7b68cf;
                        margin-left: 4px;
                        cursor: pointer;
                    }
                    /*게시글 정보*/
                    .board_object_info{
                        position: relative;
                        background-color: rgba(250, 250, 250, 0.137);
                        height: 40px;
                        width: 240px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);
                        border-radius: 10px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .board_object_info_owner{
                        /* background-color: #251666; */
                        /* width: 200px; */
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        color: #ffffff;
                        font-weight: bold;
                        margin-left: 10px;
                        font-size: 10px;
                    }
                    .board_object_info_edit_container{
                        height: 100%;
                        /* background-color: #0d0042; */
                        /* margin-left: 30px; */
                        margin-top: 7px;
                        margin-right: 5px;
                    }
                    .board_object_info_edit_container div{
                        /* background-color: #251666; */
                        width: 100px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-weight: bold;
                        color: #ffffff;
                        font-size: 10px;
                    }
                    /*구분라인*/
                    .board_object_line{
                        position: relative;
                        background-color: rgb(124, 124, 124);
                        height: 1px;
                        width: 240px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);
                    }
                    /*그래프*/
                    .board_object_chart_container{
                        position: relative;
                        background-color: rgba(27, 16, 71, 0.341);
                        border-radius: 20px;
                        width: 230px;
                        left: 50%;
                        transform: translate(-50%);
                        padding: 20px;
                        margin-top: 10px;
                        /* box-shadow: 0px 0px 1px rgb(0, 0, 0); */
                    }
                    /* .board_object_graph{
                        position: relative;
                        background-color: rgb(170, 48, 48);
                        height: 140px;
                        width: 240px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   
                        box-shadow: 0px 0px 1px 0px rgb(0, 0, 0), 0px 0px 1px 0px rgb(0, 0, 0);

                    }
                    .board_object_graph img{
                        width: 100%;
                        height: 100%;
                    } */
                    /*내용*/
                    .board_object_content{
                        position: relative;
                        /* background-color: rgb(148, 7, 7); */
                        width: 220px;
                        padding-top: 3px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   

                        border-left: 7px solid #372978; /* 왼쪽 경계선의 굵기와 색상을 설정합니다. */
                        font-weight: bold;
                        font-size: 13px;
                        z-index: 1;
                    }
                    /*댓글 작성*/
                    .board_object_commentwrite{
                        position: relative;
                        /* background-color: rgb(170, 48, 48); */
                        height: 80px;
                        width: 270px;
                        padding: 10px;
                        
                        margin-top: 20px;
                        left: 50%;
                        transform: translate(-50%);   
                    }
                    .board_object_commentwrite_input{
                        width: 100%; /* 부모 요소의 넓이에 맞게 조절 */
                        resize: none; /* 사용자가 크기 조절하지 못하도록 비활성화 */
                        outline: none;

                        overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
                        min-height: 80px; /* 최소 높이 설정 */
                        box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 계산 */

                        font-size: 12px;
                        font-weight: bold;
                        border: 2px solid #28005f; /* 테두리 색상을 여기에 지정합니다 */
                        background-color: rgb(255, 255, 255);


                    }
                    /*댓글 작성 버튼*/
                    .board_object_commentwrite_btn{
                        position: relative;
                        height: 30px;
                        width: 100px;
                        margin-left: 85px;
                        left: 50%;
                        transform: translate(-50%);   
                        cursor: pointer;


                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        border-radius: 20px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .board_object_commentwrite_btn:hover{
                        background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                    }
                    /*댓글 리스트*/
                    .board_view_review_container{
                        position: relative;
                        /* background-color: rgb(170, 48, 48); */

                        width: 270px;
                        
                        margin-top: 10px;
                        left: 50%;
                        transform: translate(-50%); 
                    }
                    .board_view_review_container_list{
                        background-color: #15004011;
                        /* height:65px; */
                        width: 100%;

                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    .board_view_review_container_list_container{
                        width: 100%;
                        /* display: flex; */
                        /* justify-content: space-evenly; */
                    }
                    .board_view_review_container_list_1{
                        background-color: #433264f5;
                        width: 270px;
                        height:25px;
                        border-radius: 5px 5px 0px 0px;        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;

                    }
                    .board_view_review_container_list_2{
                        background-color: #240b55f5;
                        width: 270px;
                        height:25px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;
                    }
                    .board_view_review_container_list_3{
                        background-color: #240b55f5;
                        width: 270px;
                        height:25px;     

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        color: #ffffff;

                    }
                    /*댓글삭제 #68597577*/ 
                    .board_view_review_container_list_container_btn{
                        width: 100%;
                        background-color: #433264f5;
                        border: none;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        color: #ffffff;
                        cursor: pointer;
                    }
                    .board_view_review_container_list_container_btn:hover{
                        background-color: #0e0422f5;
                    }
                    .board_view_review_container_list_3_btn_container_no_owner{
                        background-color: #68597577;
                        width: 100%;

                        display: flex;
                        color: #ffffff;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                    }


                    .board_object_footer{
                        position: relative;
                        /* background-color: #372978; */
                        height: 300px;
                        width: 600px;
                        margin-top: 100px;
                        left: 50%;
                        transform: translate(-50%);   
                    }
                    /*푸터*/
                    .board_object_footer_c1{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 17px;
                        font-weight: bold;
                    }
                    .board_object_footer_c2{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 13px;
                        font-weight: bold;
                        color: #2d2d2d;
                    }
                    .board_object_footer_c3{
                        background-color: #372978;
                        height: 100px;
                        width: 110px;

                        font-size: 17px;
                        font-weight: bold;
                        margin-left: 245px;
                    }
                    /*고정 컨테이너*/
                    .board_object_tool{
                        position: relative;
                        background: linear-gradient(135deg, #31275e, #4d3c9b, #4d3c9b, #31275e, #31275e);
                        width: 200px;
                        height: 50px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 50px;
                        box-shadow: 0px 0px 3px rgb(0, 0, 0);
                        display: flex;
                        z-index: 1;
                    }
                    .board_object_tool_c1_btn{
                        background-color: #ffffff0e;
                        height: 45px;
                        width: 45px;
                        font-size: 10px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 2.5px;
                        margin-left: 15px;

                    }
                    .board_object_tool_c1_btn:hover{
                        background-color: #8282828d;
                    }
                    .no_board_object_tool_c1_btn{
                        background-color: #6f6f6f0e;
                        height: 45px;
                        width: 45px;
                        font-size: 10px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #7a7a7a;
                        margin-top: 2.5px;
                        margin-left: 50px;
                    }
                    .board_object_tool_c2_btn{
                        background-color: #ffffff0e;
                        height: 45px;
                        width: 45px;
                        font-size: 10px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 2.5px;
                        margin-left: 20px;
                    }
                    .board_object_tool_c2_btn:hover{
                        background-color: #82828246;
                    }
                    .no_board_object_tool_c2_btn{
                        background-color: #6f6f6f0e;
                        height: 45px;
                        width: 45px;
                        font-size: 10px;
                        border-radius: 50px;
                        border: none;

                        margin-left: 10px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #7a7a7a;
                        margin-top: 2.5px;
                        margin-left: 20px;
                    }
                    .star{
                        width: 30px;
                        height: 30px;
                        margin-left: 15px;
                        margin-top: 10px;
                        cursor: pointer;
                        margin-left: 20px;
                    }
                    .board_object_tool_edit_1{
                        background-color: #ffffff0e;
                        height: 40px;
                        width: 93px;
                        font-size: 16px;
                        border-radius: 50px 0px 0px 50px;
                        border: none;

                        margin-left: 5px;
                        margin-top: 5px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .board_object_tool_edit_1:hover{
                        background-color: #82828246;
                    }
                    .board_object_tool_edit_2{
                        background-color: #ffffff0e;
                        height: 40px;
                        width: 93px;
                        font-size: 16px;
                        border-radius: 0px 50px 50px 0px;
                        border: none;

                        margin-left: 5px;
                        margin-top: 5px;
                        cursor: pointer;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .board_object_tool_edit_2:hover{
                        background-color: #82828246;
                    }
                    .boardedit_mode_background{
                        position: fixed;
                        background-color: #000000b1;
                        height: 200vh;
                        width: 100%;

                        top : 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        z-index: 0;
                    }
                }       
                `}
            </style>
        </div>
    )
    
}

export default Board_object;