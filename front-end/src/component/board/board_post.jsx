import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import Home_header from '../header/home_header';

const Board_post = () => {
    const navigate = useNavigate();

    //토큰 받기
    const access_token = localStorage.getItem('access-token');
    const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    const prefix = 'X-REFRESH-TOKEN=';
    const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    const endIndex = extractedValue.indexOf("%");
    const refresh_token = extractedValue.slice(0, endIndex);

    //게시물 종류(참고글 or 질문글)
    const [posttype, setPosttype] = useState(0);
    
    //제목
    const [title, setTitle] = useState(''); 
    const handletitleChange = (event) => { 
        setTitle(event.target.value)
    };

    //내용
    const [content, setContent] = useState(''); 
    const handlecontentChange = (event) => { 
        setContent(event.target.value)
    };

    //해시테그
    const [d1, setD1] = useState(0);
    const [d2, setD2] = useState(0);
    const [d3, setD3] = useState(0);
    const [d4, setD4] = useState(0);
    const [d5, setD5] = useState(0);
    const [d6, setD6] = useState(0);
      
    const [h1, setH1] = useState(0);
    const [h2, setH2] = useState(0);
    const [h3, setH3] = useState(0);
    const [h4, setH4] = useState(0);
    const [h5, setH5] = useState(0);
    const [h6, setH6] = useState(0);
    const [h7, setH7] = useState(0);
    const [h8, setH8] = useState(0);
    const [h9, setH9] = useState(0);
    const [h10, setH10] = useState(0);

    const [cs1, setCs1] = useState(0);
    const [cs2, setCs2] = useState(0);
    const [cs3, setCs3] = useState(0);
    const [cs4, setCs4] = useState(0);
    const [cs5, setCs5] = useState(0);
    const [cs6, setCs6] = useState(0);
    const [cs7, setCs7] = useState(0);

    const [e1, setE1] = useState(0);
    const [e2, setE2] = useState(0);

    const allTags = [
        d1, d2, d3, d4, d5, d6,
        h1, h2, h3, h4, h5, h6, h7, h8, h9, h10,
        cs1, cs2, cs3, cs4, cs5, cs6, cs7,
        e1, e2, posttype
    ].filter(tag => tag !== 0);

    //api 연결
    const handlepostSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post("http://13.125.16.222/boards", {
                title : title,
                showGraph : "y",
                hashtags : allTags,
                content : content,
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });

            //요청 성공
            if (response.status === 200) {
                // store.dispatch({type:"AFTER_LOGIN"});
                Swal.fire({
                    title: 'Post',
                    text: '게시물을 등록했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                navigate('/');
              
            }
        }
        catch (error) {
        }
    }
    
    return (
        <div>
            <Home_header></Home_header>
            <div className="board_post_container">
                <h2>게시글 작성</h2>
                <form onSubmit={handlepostSubmit}>
                    <div className="board_post_container_title">
                        <input type="text" onChange={handletitleChange} maxLength={20}></input>
                        <label>제목</label>
                    </div>

                    <div className="board_post_container_check">
                        <div className="board_post_container_check_2">
                            <div className="board_post_container_check_2_title">Is it a question?</div>
                            <div className="board_post_container_check_1_title_container">
                                <div className ="show_or_not_graph_container">
                                    {posttype === 0 && <div className ="show_or_not_graph_container_default" onClick={() => setPosttype("질문글")}>질문글</div>}
                                    {posttype !== 0 && <div className ="show_or_not_graph_container_check" onClick={() => setPosttype(0)}>질문글</div>}

                                </div>
                            </div>
                        </div>
                        <div className="board_post_container_check_3">
                            <div className="board_post_container_check_3_hashtag">
                                {/* 기본설정 */}
                                {d1 === 0 && <div className="none_click_tag" onClick={() => {setD1("비현직자"); setD2(0)}}>비현직자</div>}
                                {d1 !== 0 && <div className="click_tag" onClick={() => setD1(0)}>비현직자</div>}

                                {d2 === 0 && <div className="none_click_tag" onClick={() => {setD2("현직자"); setD1(0)}}>현직자</div>}
                                {d2 !== 0 && <div className="click_tag" onClick={() => setD2(0)}>현직자</div>}

                                {d3 === 0 && <div className="none_click_tag" onClick={() => {setD3("비전공자"); setD4(0);}}>비전공자</div>}
                                {d3 !== 0 && <div className="click_tag" onClick={() => setD3(0)}>비전공자</div>}

                                {d4 === 0 && <div className="none_click_tag" onClick={() => {setD4("전공자"); setD3(0);}}>전공자</div>}
                                {d4 !== 0 && <div className="click_tag" onClick={() => setD4(0)}>전공자</div>}

                                {d5 === 0 && <div className="none_click_tag" onClick={() => {setD5("front"); setD6(0);}}>front</div>}
                                {d5 !== 0 && <div className="click_tag" onClick={() => setD5(0)}>front</div>}

                                {d6 === 0 && <div className="none_click_tag" onClick={() => {setD6("back"); setD5(0);}}>back</div>}
                                {d6 !== 0 && <div className="click_tag" onClick={() => setD6(0)}>back</div>}

                                {/* 언어 */}
                                {h1 === 0 && <div className="none_click_tag" onClick={() => setH1("html")}>html</div>}
                                {h1 !== 0 && <div className="click_tag" onClick={() => setH1(0)}>html</div>}

                                {h2 === 0 && <div className="none_click_tag" onClick={() => setH2("css")}>css</div>}
                                {h2 !== 0 && <div className="click_tag" onClick={() => setH2(0)}>css</div>}

                                {h3 === 0 && <div className="none_click_tag" onClick={() => setH3("javascript")}>javascript</div>}
                                {h3 !== 0 && <div className="click_tag" onClick={() => setH3(0)}>javascript</div>}

                                {h4 === 0 && <div className="none_click_tag" onClick={() => setH4("typescript")}>typescript</div>}
                                {h4 !== 0 && <div className="click_tag" onClick={() => setH4(0)}>typescript</div>}

                                {h5 === 0 && <div className="none_click_tag" onClick={() => setH5("react")}>react</div>}
                                {h5 !== 0 && <div className="click_tag" onClick={() => setH5(0)}>react</div>}

                                {h6 === 0 && <div className="none_click_tag" onClick={() => setH6("java")}>java</div>}
                                {h6 !== 0 && <div className="click_tag" onClick={() => setH6(0)}>java</div>}

                                {h7 === 0 && <div className="none_click_tag" onClick={() => setH7("python")}>python</div>}
                                {h7 !== 0 && <div className="click_tag" onClick={() => setH7(0)}>python</div>}

                                {h8 === 0 && <div className="none_click_tag" onClick={() => setH8("spring")}>spring</div>}
                                {h8 !== 0 && <div className="click_tag" onClick={() => setH8(0)}>spring</div>}

                                {h9 === 0 && <div className="none_click_tag" onClick={() => setH9("springboot")}>springboot</div>}
                                {h9 !== 0 && <div className="click_tag" onClick={() => setH9(0)}>springboot</div>}

                                {h10 === 0 && <div className="none_click_tag" onClick={() => setH10("node.js")}>node.js</div>}
                                {h10 !== 0 && <div className="click_tag" onClick={() => setH10(0)}>node.js</div>}
                                {/* CS */}
                                {cs1 === 0 && <div className="none_click_tag" onClick={() => setCs1("운영체제")}>운영체제</div>}
                                {cs1 !== 0 && <div className="click_tag" onClick={() => setCs1(0)}>운영체제</div>}

                                {cs2 === 0 && <div className="none_click_tag" onClick={() => setCs2("네트워크")}>네트워크</div>}
                                {cs2 !== 0 && <div className="click_tag" onClick={() => setCs2(0)}>네트워크</div>}
                                
                                {cs3 === 0 && <div className="none_click_tag" onClick={() => setCs3("자료구조")}>자료구조</div>}
                                {cs3 !== 0 && <div className="click_tag" onClick={() => setCs3(0)}>자료구조</div>}

                                {cs4 === 0 && <div className="none_click_tag" onClick={() => setCs4("컴퓨터구조")}>컴퓨터구조</div>}
                                {cs4 !== 0 && <div className="click_tag" onClick={() => setCs4(0)}>컴퓨터구조</div>}

                                {cs5 === 0 && <div className="none_click_tag" onClick={() => setCs5("알고리즘")}>알고리즘</div>}
                                {cs5 !== 0 && <div className="click_tag" onClick={() => setCs5(0)}>알고리즘</div>}

                                {cs6 === 0 && <div className="none_click_tag" onClick={() => setCs6("데이터베이스")}>데이터베이스</div>}
                                {cs6 !== 0 && <div className="click_tag" onClick={() => setCs6(0)}>데이터베이스</div>}

                                {cs7 === 0 && <div className="none_click_tag" onClick={() => setCs7("컴파일러")}>컴파일러</div>}
                                {cs7 !== 0 && <div className="click_tag" onClick={() => setCs7(0)}>컴파일러</div>}
                                {/* 기타 */}
                                {e1 === 0 && <div className="none_click_tag" onClick={() => setE1("부트캠프")}>부트캠프</div>}
                                {e1 !== 0 && <div className="click_tag" onClick={() => setE1(0)}>부트캠프</div>}

                                {e2 === 0 && <div className="none_click_tag" onClick={() => setE2("개발외주")}>개발외주</div>}
                                {e2 !== 0 && <div className="click_tag" onClick={() => setE2(0)}>개발외주</div>}
                            </div>
                        </div>
                    </div>


                    <div className="board_post_container_detail">
                        <div>내용</div>
                        <textarea type="text" onChange={handlecontentChange}></textarea>

                    </div>

                    {(title === '' || content ==='') && (
                        <div className="board_post_container_button">
                            <div className="board_post_container_button_post_no">게시글 post</div>
                            <Link to="/" style={{ textDecoration: 'none' }}><div className="board_post_container_button_cancel">취소</div></Link>
                        </div>   
                    )}

                    {title !== '' && content !=='' && (
                        <div className="board_post_container_button">
                            <button className="board_post_container_button_post">게시글 post</button>
                            <Link to="/" style={{ textDecoration: 'none' }}><div className="board_post_container_button_cancel">취소</div></Link>
                        </div>   
                    )}

                </form>

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
                        .board_post_container{
                            position: absolute;
                            left: 50%;
                            width: 800px;
                            padding: 30px;
                            transform: translate(-50%);
                            background: rgb(255, 255, 255);
                            box-sizing: border-box;
                            box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                            border-radius: 30px;
                            margin-top: 230px;
                        }

                        .board_post_container h2 {
                            margin: 0 0 30px;
                            padding: 0;
                            color: #4a3b8b;
                            text-align: center;
                        }

                        .board_post_container_title{
                            position: relative;
                        }

                        /*제목*/
                        .board_post_container_title input {
                            width: 100%;
                            padding: 10px 0;
                            font-size: 16px;
                            color: #4a3b8b;
                            margin-bottom: 10px;
                            border: none;
                            border-bottom: 1px solid #4a3b8b;
                            outline: none;
                            background: transparent;
                        }
                        .board_post_container_title label {
                            position: absolute;
                            top:0;
                            left: 0;
                            padding: 10px 0;
                            font-size: 16px;
                            color: #4a3b8b;
                            pointer-events: none;
                            transition: .5s;
                        }

                        .board_post_container_title input:focus ~ label,
                        .board_post_container_title input:valid ~ label {
                            top: -20px;
                            left: 0;
                            font-size: 12px;
                        }

                        /*체크 컨테이너*/
                        .board_post_container_check{
                            /* background-color: beige; */
                            height: 80px;
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                        }

                        /*체크 컨테이너 - 첫 체크*/
                        .board_post_container_check_1{
                            background-color: rgb(58, 48, 114);
                            height: 100%;
                            width: 20%;
                            border-radius: 10px;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                        }

                        .board_post_container_check_1_title{
                            /* background-color: rgb(195, 195, 136); */
                            height: 40%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                            color: #fff;
                            font-size: 12px;
                        }

                        .board_post_container_check_1_title_container{
                            /* background-color: rgb(75, 75, 36); */
                            height: 60%;
                            width: 100%;
                            display: flex;
                            justify-content: space-evenly;
                        }

                        .show_or_not_graph_container{
                            /* background-color: rgb(168, 157, 225); */
                            height: 25px;
                            margin-top: 10px;
                            width: 40%;
                            border-radius: 20px;
                        }
                        .show_or_not_graph_container_default{
                            background-color: #30265a;
                            height: 100%;
                            width: 100%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 12px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .show_or_not_graph_container_check{
                            background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                            height: 100%;
                            width: 100%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #4a3b8b;
                            font-size: 12px;
                            font-weight: bold;
                            cursor: pointer;
                        }


                        /*체크 컨테이너 - 두번째 체크*/
                        .board_post_container_check_2{
                            background-color: rgb(58, 48, 114);
                            height: 100%;
                            width: 18%;
                            border-radius: 10px;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                        }

                        .board_post_container_check_2_title{
                            height: 40%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                            color: #fff;
                            font-size: 12px;
                        }

                        .board_post_container_check_2_title_container{
                            background-color: rgb(18, 12, 50);
                            height: 25px;
                            margin-top: 3px;
                            width: 40%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 12px;
                            font-weight: bold;
                            margin-left: 55px;
                        }


                        /*체크 컨테이너 - 세번째 체크*/
                        .board_post_container_check_3{
                            /* background-color: rgb(235, 235, 123); */
                            height: 100%;
                            width: 80%;
                        }

                        .board_post_container_check_3_hashtag{
                            background-color: rgb(58, 48, 114);
                            border-radius: 10px;
                            height: 90%;
                            width: 100%;
                            flex-wrap: wrap;
                            display: flex;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                            overflow: auto;
                            padding-bottom: 8px;
                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar {
                            width: 5px;
                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar-thumb {
                            background-color: #ffffff;
                            border-radius: 10px;
                            border: 1px solid transparent;
                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar-track {
                            border-radius: 50px;
                        }

                        .none_click_tag{
                            position: relative;
                            background-color: #30265a;
                            height: 23px;
                            width: 85px;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 12px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-top: 8px;
                            margin-left: 12px;
                        }
                        .click_tag{
                            position: relative;
                            background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                            height: 23px;
                            width: 85px;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #4a3b8b;
                            font-size: 12px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-top: 8px;
                            margin-left: 12px;
                        }

                        /*내용*/
                        .board_post_container_detail div{
                            margin-top: 10px;
                            font-size: 12px;
                            color: #4a3b8b;
                            /* background-color: blueviolet; */
                        }
                        .board_post_container_detail textarea {
                            height: 100px;
                            width: 100%;

                            /* background-color: rgb(58, 48, 114); */
                            border-radius: 10px;
                            border : 2px solid #4a3b8b;
                            
                            color: #4a3b8b;
                            font-size: 12px;
                            font-weight: bold;
                            margin-top: 10px;
                            margin-left: -4px;
                            box-shadow: 0 0px 5px 0 rgb(147, 146, 146);

                            resize: none; /* 사용자가 크기 조절하지 못하도록 비활성화 */
                            outline: none;
                            
                        }

                        /*버튼 컨테이너*/
                        .board_post_container_button{
                            /* background-color: beige ; */
                            height: 40px;
                            width: 100%;
                            margin-top: 20px;
                            display: flex;
                            justify-content: space-evenly;
                        }
                        .board_post_container_button_post_no{
                            background-color:#d6d5d5 ;
                            height: 100%;
                            width: 130px;

                            border-radius: 10px;
                            border: none;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-weight: bold;
                            font-size: 13px;
                        }

                        .board_post_container_button_post{
                            background: linear-gradient(135deg, #13074b, #372978, #13074b);
                            height: 100%;
                            width: 130px;

                            border-radius: 10px;
                            border: none;

                            color: #fff;
                            font-weight: bold;
                        }
                        .board_post_container_button_post:hover{
                            background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                            cursor: pointer;
                        }
                        .board_post_container_button_cancel{
                            background: linear-gradient(135deg, #13074b, #372978, #13074b);
                            height: 100%;
                            width: 130px;
                            display : flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-weight: bold;
                            font-size: 14px;

                            border-radius: 10px;
                            border: none;
                        }
                        .board_post_container_button_cancel:hover{
                            background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                            cursor: pointer;
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
                        .board_post_container{
                            position: absolute;
                            left: 50%;
                            width: 270px;
                            padding: 15px;
                            transform: translate(-50%);
                            background: rgb(255, 255, 255);
                            box-sizing: border-box;
                            box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                            border-radius: 15px;
                            margin-top: 140px;
                        }

                        .board_post_container h2 {
                            font-size: 20px;
                            color: #4a3b8b;
                            text-align: center;
                        }

                        .board_post_container_title{
                            position: relative;
                        }

                        /*제목*/
                        .board_post_container_title input {
                            width: 100%;
                            padding: 10px 0;
                            font-size: 12px;
                            color: #4a3b8b;
                            margin-bottom: 10px;
                            border: none;
                            border-bottom: 1px solid #4a3b8b;
                            outline: none;
                            background: transparent;
                        }
                        .board_post_container_title label {
                            position: absolute;
                            top:0;
                            left: 0;
                            padding: 10px 0;
                            font-size: 10px;
                            color: #4a3b8b;
                            pointer-events: none;
                            transition: .5s;
                        }

                        .board_post_container_title input:focus ~ label,
                        .board_post_container_title input:valid ~ label {
                            top: -20px;
                            left: 0;
                            font-size: 12px;
                        }

                        /*체크 컨테이너*/
                        .board_post_container_check{
                            /* background-color: rgb(210, 0, 0); */
                            height: 175px;
                            width: 100%;
                        }

                        /*체크 컨테이너 - 첫 체크*/
                        .board_post_container_check_1{
                            background-color: rgb(58, 48, 114);
                            height: 40px;
                            width: 130px;
                            border-radius: 5px;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                            margin-left: 55px;
                        }

                        .board_post_container_check_1_title{
                            /* background-color: rgb(195, 195, 136); */
                            height: 40%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                            color: #fff;
                            font-size: 10px;
                        }

                        .board_post_container_check_1_title_container{
                            /* background-color: rgb(75, 75, 36); */
                            height: 60%;
                            width: 100%;
                            display: flex;
                            justify-content: space-evenly;
                        }

                        .show_or_not_graph_container{
                            /* background-color: rgb(168, 157, 225); */
                            height: 20px;
                            margin-top: 1px;
                            width: 40%;
                            border-radius: 20px;
                            font-size: 10px;
                        }
                        .show_or_not_graph_container_default{
                            background-color: #30265a;
                            height: 100%;
                            width: 100%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 10px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .show_or_not_graph_container_check{
                            background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                            height: 100%;
                            width: 100%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #4a3b8b;
                            font-size: 10px;
                            font-weight: bold;
                            cursor: pointer;
                        }


                        /*체크 컨테이너 - 두번째 체크*/
                        .board_post_container_check_2{
                            background-color: rgb(58, 48, 114);
                            height: 40px;
                            width: 130px;
                            border-radius: 5px;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                            margin-top: 10px;
                            margin-left: 55px;

                        }

                        .board_post_container_check_2_title{
                            height: 40%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                            color: #fff;
                            font-size: 10px;
                        }

                        .board_post_container_check_2_title_container{
                            background-color: rgb(18, 12, 50);
                            height: 25px;
                            margin-top: 3px;
                            width: 40%;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 10px;
                            font-weight: bold;
                            margin-left: 55px;
                        }


                        /*체크 컨테이너 - 세번째 체크*/
                        .board_post_container_check_3{
                            /* background-color: rgb(235, 235, 123); */
                            height: 80px;
                            width: 100%;
                        }

                        .board_post_container_check_3_hashtag{
                            background-color: rgb(58, 48, 114);
                            border-radius: 5px;
                            height: 110px;
                            width: 130px;
                            flex-wrap: wrap;
                            display: flex;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(87, 87, 87);
                            overflow-x: auto;
                            padding-bottom: 8px;
                            margin-top: 10px;
                            margin-left: 55px;

                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar {
                            width: 2px;
                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar-thumb {
                            background-color: #ffffff;
                            border-radius: 10px;
                            border: 1px solid transparent;
                        }
                        .board_post_container_check_3_hashtag::-webkit-scrollbar-track {
                            border-radius: 50px;
                        }

                        .none_click_tag{
                            position: relative;
                            background-color: #30265a;
                            height: 23px;
                            width: 100px;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 10px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-top: 8px;
                            margin-left: 14px;
                        }
                        .click_tag{
                            position: relative;
                            background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                            height: 23px;
                            width: 100px;
                            border-radius: 20px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #4a3b8b;
                            font-size: 10px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-top: 8px;
                            margin-left: 14px;
                        }

                        /*내용*/
                        .board_post_container_detail div{
                            margin-top: 10px;
                            font-size: 13px;
                            color: #4a3b8b;
                            /* background-color: blueviolet; */
                        }
                        .board_post_container_detail textarea {
                            height: 100px;
                            width: 100%;

                            /* background-color: rgb(58, 48, 114); */
                            border-radius: 10px;
                            border : 2px solid #4a3b8b;
                            margin-left: -4px;
                            color: #4a3b8b;
                            font-size: 10px;
                            font-weight: bold;
                            margin-top: 10px;
                            box-shadow: 0 0px 5px 0 rgb(147, 146, 146);
                            resize: none; /* 사용자가 크기 조절하지 못하도록 비활성화 */
                            outline: none;
                            
                        }

                        /*버튼 컨테이너*/
                        .board_post_container_button{
                            /* background-color: beige ; */
                            height: 40px;
                            width: 100%;
                            margin-top: 20px;
                            display: flex;
                            justify-content: space-evenly;
                        }

                        .board_post_container_button_post{
                            background: linear-gradient(135deg, #13074b, #372978, #13074b);
                            height: 100%;
                            width: 110px;

                            border-radius: 10px;
                            border: none;

                            color: #fff;
                            font-weight: bold;
                        }

                        .board_post_container_button_post_no{
                            background-color:#d6d5d5 ;
                            height: 100%;
                            width: 110px;
                            border-radius: 10px;
                            border: none;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-weight: bold;
                            font-size: 14px;
                        }

                        .board_post_container_button_post:hover{
                            background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                            cursor: pointer;
                        }
                        .board_post_container_button_cancel{
                            background: linear-gradient(135deg, #13074b, #372978, #13074b);
                            height: 100%;
                            width: 110px;
                            display : flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-weight: bold;
                            font-size: 14px;

                            border-radius: 10px;
                            border: none;
                        }
                        .board_post_container_button_cancel:hover{
                            background: linear-gradient(135deg, #05001a, #0d0042, #05001a);
                            cursor: pointer;
                        }
                    }
                    `}
                </style>
            </div>
        </div>
    )
    
}

export default Board_post;