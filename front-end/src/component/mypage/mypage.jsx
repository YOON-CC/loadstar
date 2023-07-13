import React, { useState, useEffect  } from "react";
import Home_header from '../header/home_header';
import Mypage_0 from "./mypage_0";
import Mypage_1 from "./mypage_1";
import Mypage_2 from "./mypage_2";
import Mypage_3 from "./mypage_3";
import axios from 'axios';
import { Link } from 'react-router-dom';

const First_question = () => {

    //마이페이지 페이지 상태관리
    const [mypagenum, setMypagenum] = useState(0);

    //userId와 이메일 받아오기
    const [mypage_userId, setMypage_userId] = useState('');
    const [mypage_email, setMypage_email] = useState('');

    //작성글 보드idx 받아오기 
    const [mypage_boardId, setMypage_boardId] = useState([]);

    //작성글 제목 받아오기
    const [mypage_boardtitle, setMypage_boardtitle] = useState([]);
    
    //북마크 보드idx 받아오기 
    const [mypage_bookmarkId, setMypage_bookmarkId] = useState([]);
    
    //북마크 제목 받아오기
    const [mypage_boardbookmark, setMypage_boardbookmark] = useState([]);

    //데이터 받아오기 
    const handleMypage_user_info = async () => {

        //로컬스토리지 추출
        const access_token = localStorage.getItem('access-token');
        
        //쿠키에서 세션 추출 
        const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
        const prefix = 'X-REFRESH-TOKEN=';
        const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
        const endIndex = extractedValue.indexOf("%");
        const refresh_token = extractedValue.slice(0, endIndex);

        try {   
            const response = await axios.get("http://13.125.16.222/users/my-page", {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });

            if (response.status === 200) {
                setMypage_userId(response.data.username);
                setMypage_email(response.data.email);

                const mypage_boardId = response.data.boards.map(boards => boards.boardId);
                setMypage_boardId(mypage_boardId);

                const mypage_boardTitles = response.data.boards.map(boards => boards.title);
                setMypage_boardtitle(mypage_boardTitles);

                const mypage_boardbookmark_Id = response.data.bookmarks.map(bookmarks => bookmarks.boardId);
                setMypage_bookmarkId(mypage_boardbookmark_Id);

                const mypage_boardbookmark = response.data.bookmarks.map(bookmarks => bookmarks.title);
                setMypage_boardbookmark(mypage_boardbookmark);
            }

        } catch (error) {

        }
    };

    useEffect(() => {
        handleMypage_user_info();
    }, []);

    return (
        <div>
            <Home_header></Home_header>
            <div className="mypage_container">
                <div className="mypage_container_1" >
                    <div className="mypage_container_1_box_0" onClick={() => setMypagenum(0)}>회원정보</div>
                    <div className="mypage_container_1_box_1" onClick={() => setMypagenum(1)}>나의활동</div>
                    <div className="mypage_container_1_box_2" onClick={() => setMypagenum(2)}>이용방법</div>
                    <div className="mypage_container_1_box_3" onClick={() => setMypagenum(3)}>ABOUT</div>
                    <Link to="/" style={{ textDecoration: 'none' }}><div className="mypage_container_1_box_4">나가기</div></Link>
                    <div className="mypage_container_1_box_5"><img className="home_header_body_1_logo_img" src="image/logo.png"></img></div>
                </div>
                <div className="mypage_container_2">
                    {mypagenum === 0 && <Mypage_0 value1={mypage_userId} value2={mypage_email}></Mypage_0>}
                    {mypagenum === 1 && <Mypage_1  value_boardId={mypage_boardId} value_title={mypage_boardtitle} value_bookmarkId={mypage_bookmarkId} value_bookmark={mypage_boardbookmark}></Mypage_1>}
                    {mypagenum === 2 && <Mypage_2></Mypage_2>}
                    {mypagenum === 3 && <Mypage_3></Mypage_3>}
                </div>

            </div>

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
                    .mypage_container{
                        position: absolute;
                        left: 50%;
                        height: 360px;
                        width: 800px;
                        padding: 5px;
                        transform: translate(-50%);
                        background: rgb(255, 255, 255);
                        backdrop-filter: blur(3px); 
                        border-radius: 20px;
                        margin-top: 240px;

                        display: flex;
                        justify-content: space-between;

                        box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                    }
                    .mypage_container_1{
                        position: relative;
                        /* background: rgba(78, 78, 78); */
                        height: 100%;
                        width: 20%;
                        
                    }

                    .mypage_container_1_box_0{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;
                        
                        height: 50px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 17px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .mypage_container_1_box_0:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_1{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;
                        height: 50px;
                        width: 100%;
                        margin-top: 5px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 17px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .mypage_container_1_box_1:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_2{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;
                        height: 50px;
                        width: 100%;
                        margin-top: 5px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 17px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .mypage_container_1_box_2:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_3{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;
                        height: 50px;
                        width: 100%;
                        margin-top: 5px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 17px;
                        font-weight: bold;
                        color: #ffffff;
                    }
                    .mypage_container_1_box_3:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_4{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;
                        height: 50px;
                        width: 100%;
                        margin-top: 5px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 17px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .mypage_container_1_box_4:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_4.cover1{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_5{
                        /* background-color: #fff; */
                        width: 80px;
                        height: 80px;
                        margin-top: 5px;
                        margin-left: 40px;
                    }

                    /*마이페이지 내용*/

                    .mypage_container_2{
                        /* background: rgb(0, 255, 60); */
                        height: 100%;
                        width: 79.4%;
                    }

                    /*회원정보*/
                    .mypage_0_container{
                        position: relative;
                        height: 100%;
                        width: 100%;
                        /* background: rgb(0, 170, 255); */
                    }

                    .mypage_0_container_1{
                        height: 15%;
                        width: 100%;
                        /* background: rgb(73, 116, 137);  */
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .mypage_0_container_1 div{
                        height: 30px;
                        width: 200px;
                        margin-top: 12px;
                        background: #000000; 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        font-weight: bold;
                        border-radius: 20px;
                        color: #fff;

                        box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(255, 255, 255);
                        
                    }
                    .cover1{
                        position: absolute;
                        height: 30px;
                        width: 200px;
                        margin-top: 12px;
                        margin-left: 78px;
                        background: rgb(61, 61, 61); 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        font-weight: bold;
                        border-radius: 20px;
                        color: #838383;
                    }
                    .cover1:hover{
                        opacity: 0;
                        cursor: pointer;
                    }
                    .cover2{
                        position: absolute;
                        height: 30px;
                        width: 200px;
                        margin-top: 12px;
                        margin-left: 356.5px;
                        background: rgb(61, 61, 61); 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        font-weight: bold;
                        border-radius: 20px;
                        color: #838383;
                    }
                    .cover2:hover{
                        opacity: 0;
                        cursor: pointer;
                    }

                    .mypage_0_container_2{
                        position: relative;
                        height: 85%;
                        width: 100%;
                        background-color: rgb(0, 0, 0, 0.1);
                        backdrop-filter: blur(3px); 
                        border-radius: 15px;

                    }
                    .mypage_0_container_2 div{
                        position: absolute;

                        height: 200px;
                        width: 200px;
                        /* background: rgb(54, 222, 35); */
                        
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%); 
                    }

                    /*내가 쓴글*/
                    .mypage_1_container{
                        height: 340px;
                        width: 615px;
                        /* background: rgb(170, 211, 255); */
                        padding : 10px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    /*내가 쓴글*/
                    .mypage_1_container_1{
                        /* background: linear-gradient(135deg, #2d2260, #46339d, #46339d, #2d2260, #2d2260); */
                        background-color: #41357c;
                        background: linear-gradient(135deg, #41357c, #4d3c9a, #41357c);
                        box-shadow: 0px 0px 5px 0px rgb(147, 147, 147), 0px 0px 5px 0px rgb(88, 88, 88);

                        height: 100%;
                        width: 48%;
                        border-radius: 15px;

                    }
                    .mypage_1_container_1_title{
                        height: 30px;
                        width: 130px;
                        border-radius: 10px;
                        margin-left: 80px;
                        margin-top: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        color: #ffffff;
                    }
                    .mypage_1_container_1_content{
                        background-color: #2b283b;
                        height: 265px;
                        width: 270px;
                        border-radius: 15px;
                        margin-left: 12px;
                        margin-top: 10px;
                        overflow: auto; /* 스크롤을 표시하도록 설정 */
                        overflow-x: hidden;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        padding-bottom: 10px;
                    }
                    .mypage_1_container_1_content::-webkit-scrollbar {
                        display: none;
                    }
                    .mypage_1_container_1_content div{
                        position: relative;
                        background-color: rgba(255, 255, 255, 0.132);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        height: 50px;
                        width: 250px;
                        border-radius: 10px;
                        margin-left: 10px;
                        margin-top: 10px; 

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #ffffff;
                        font-size: 12px;

                    }
                    .mypage_1_container_1_content div:hover{
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.232);
                    }

                    /*북마크*/
                    .mypage_1_container_2{
                        background: linear-gradient(135deg, #41357c, #4d3c9a, #41357c);
                        box-shadow: 0px 0px 5px 0px rgb(147, 147, 147), 0px 0px 5px 0px rgb(88, 88, 88);

                        height: 100%;
                        width: 48%;
                        border-radius: 15px;

                    }
                    .mypage_1_container_2_title{
                        height: 30px;
                        width: 130px;
                        border-radius: 10px;
                        margin-left: 80px;
                        margin-top: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        color: #ffffff;
                    }
                    .mypage_1_container_2_content{
                        background-color: #2b283b;
                        height: 265px;
                        width: 270px;
                        border-radius: 15px;
                        margin-left: 12px;
                        margin-top: 10px;
                        overflow: auto; /* 스크롤을 표시하도록 설정 */
                        overflow-x: hidden;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        padding-bottom: 10px;
                    }
                    .mypage_1_container_2_content::-webkit-scrollbar {
                        display: none; 
                    }
                    .mypage_1_container_2_content div{
                        position: relative;
                        background-color: rgba(255, 255, 255, 0.132);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        height: 50px;
                        width: 250px;
                        border-radius: 10px;
                        margin-left: 10px;
                        margin-top: 10px; 

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #ffffff;
                        font-size: 12px;
                    }
                    .mypage_1_container_2_content div:hover{
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.232);
                    }

                    /*이용방법*/
                    .mypage_2_container{
                        height: 100%;
                        width: 100%;
                        background: rgb(201, 202, 213);
                    }

                    /*ABOUT*/
                    .mypage_3_container{
                        height: 340px;
                        width: 100%;
                        /* background: rgb(255, 245, 129); */
                        padding-top: 20px;
                    }
                    .mypage_3_loadstar{
                        /* background-color: #fff; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        font-weight: bold;
                        color: #4a3b8b;
                    }
                    .mypage_3_version_container{
                        /* background-color: #981111; */
                        height: 200px;
                        padding: 10px;
                        display: flex;
                    }
                    .mypage_3_version_container_img{
                        /* background-color: aqua; */
                        height: 200px;
                        width: 250px;
                        margin-left: 55px;

                    }
                    .mypage_3_version_container_contents{
                        background-color: rgb(110, 117, 117);
                        height: 125px;
                        width: 250px;
                        padding-top: 75px;
                        color: #ffffff;
                    }
                    .mypage_3_version_container_contents div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 20px;
                        color: #dddddd;

                    }
                    .mypage_3_version_developer{
                        /* background-color: #11988a; */
                        height: 60px;
                        width: 500px;
                        display: flex;
                        justify-content: space-evenly;
                        margin-left: 65px;
                    }
                    .mypage_3_version_developer div{
                        background-color: black;
                        height: 30px;
                        width: 100px;
                        color: #ffffff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 20px;
                        margin-top: 15px;
                    }
                    .mypage_3_version_developer div:hover{
                        background-color: rgb(48, 48, 48);
                        cursor: pointer;
                        color: #838383;
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
                    .mypage_container{
                        position: absolute;
                        left: 50%;
                        height: 190px;
                        width: 250px;
                        padding: 5px;
                        transform: translate(-50%);
                        background: rgb(255, 255, 255);
                        backdrop-filter: blur(3px); 
                        border-radius: 10px;
                        margin-top: 140px;

                        display: flex;
                        justify-content: space-between;

                        box-shadow: 0px 0px 10px 0px rgb(136, 136, 136), 0px 0px 10px 0px rgb(22, 0, 78);
                    }

                    .mypage_container_1{
                        position: relative;
                        /* background: rgb(68, 44, 44); */
                        height: 100%;
                        width: 20%;
                        
                    }

                    .mypage_container_1_box_0{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 5px;
                        
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                    }
                    .mypage_container_1_box_0:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_1{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 5px;
                        
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 5px;
                    }
                    .mypage_container_1_box_1:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_2{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 5px;
                        
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 5px;
                    }
                    .mypage_container_1_box_2:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_3{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 5px;
                        
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 5px;
                    }
                    .mypage_container_1_box_3:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_4{
                        background-color: rgb(0, 0, 0, 0.3);
                        backdrop-filter: blur(3px); 
                        border-radius: 5px;
                        
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 5px;
                    }
                    .mypage_container_1_box_4:hover{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_4.cover1{
                        background-color: rgba(0, 0, 0, 0.73);
                        cursor: pointer;
                    }

                    .mypage_container_1_box_5{
                        
                        height: 45px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 5px;
                    }

                    /*마이페이지 내용*/

                    .mypage_container_2{
                        /* background: rgb(0, 255, 60); */
                        height: 100%;
                        width: 78%;
                    }

                    /*회원정보*/
                    .mypage_0_container{
                        position: relative;
                        height: 100%;
                        width: 100%;
                        /* background: rgb(0, 170, 255); */
                    }

                    .mypage_0_container_1{
                        height: 50px;
                        width: 100%;
                        /* background: rgb(73, 116, 137);  */
                        /* display: flex;
                        justify-content: space-evenly; */
                    }
                    .mypage_0_container_1 div{
                        height: 20px;
                        width: 100%;
                        /* margin-top: 12px; */
                        background: #000000; 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        border-radius: 5px;
                        color: #fff;

                        box-shadow: 0px 0px 5px 0px rgb(0, 0, 0), 0px 0px 5px 0px rgb(255, 255, 255);
                        margin-top: 5px;

                    }
                    .cover1{
                        position: absolute;
                        height: 20px;
                        width: 100%;
                        background: rgb(61, 61, 61); 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        border-radius: 5px;
                        color: #838383;
                    }
                    .cover1:hover{
                        opacity: 0;
                        cursor: pointer;
                    }
                    .cover2{
                        position: absolute;
                        height: 20px;
                        width: 100%;
                        margin-top: 25px;
                        background: rgb(61, 61, 61); 
                        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        font-weight: bold;
                        border-radius: 5px;
                        color: #838383;
                    }
                    .cover2:hover{
                        opacity: 0;
                        cursor: pointer;
                    }

                    .mypage_0_container_2{
                        position: relative;
                        height: 70%;
                        width: 100%;
                        background-color: rgb(0, 0, 0, 0.1);
                        backdrop-filter: blur(3px); 
                        border-radius: 10px;
                    }
                    .mypage_0_container_2 div{
                        position: absolute;

                        height: 160px;
                        width: 200px;
                        /* background: rgb(54, 222, 35); */
                        
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%); 
                    }

                    /*내가 쓴글*/
                    .mypage_1_container{
                        height: 95%;
                        width: 95%;
                        /* background: rgb(170, 211, 255); */
                        padding : 5px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    /*내가 쓴글*/
                    .mypage_1_container_1{
                        background: linear-gradient(135deg, #41357c, #4d3c9a, #41357c);
                        box-shadow: 0px 0px 5px 0px rgb(147, 147, 147), 0px 0px 5px 0px rgb(88, 88, 88);

                        height: 100%;
                        width: 45%;
                        border-radius: 5px;

                    }
                    .mypage_1_container_1_title{
                        height: 15px;
                        width: 70px;
                        border-radius: 5px;
                        margin-left: 7px;
                        margin-top: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;


                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        color: #ffffff;
                    }
                    .mypage_1_container_1_content{
                        background-color: #2b283b;
                        height: 140px;
                        width: 70px;
                        border-radius: 5px;
                        margin-left: 7px;
                        margin-top: 5px;
                        overflow: auto; /* 스크롤을 표시하도록 설정 */
                        overflow-x: hidden;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        padding-bottom: 10px;
                    }
                    .mypage_1_container_1_content::-webkit-scrollbar {
                        display: none;
                    }
                    .mypage_1_container_1_content div{
                        position: relative;
                        background-color: rgba(255, 255, 255, 0.132);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        height: 33px;
                        width: 60px;
                        border-radius: 5px;
                        margin-left: 5px;
                        margin-top: 5px; 
                        font-size: 10px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        font-size: 10px;
                    }
                    .mypage_1_container_1_content div:hover{
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.232);
                    }

                    /*북마크*/
                    .mypage_1_container_2{
                        background: linear-gradient(135deg, #41357c, #4d3c9a, #41357c);
                        box-shadow: 0px 0px 5px 0px rgb(147, 147, 147), 0px 0px 5px 0px rgb(88, 88, 88);

                        height: 100%;
                        width: 45%;
                        border-radius: 5px;

                    }
                    .mypage_1_container_2_title{
                        height: 15px;
                        width: 70px;
                        border-radius: 5px;
                        margin-left: 7px;
                        margin-top: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;


                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        color: #ffffff;
                    }
                    .mypage_1_container_2_content{
                        background-color: #2b283b;
                        height: 140px;
                        width: 70px;
                        border-radius: 5px;
                        margin-left: 7px;
                        margin-top: 5px;
                        overflow: auto; /* 스크롤을 표시하도록 설정 */
                        overflow-x: hidden;

                        background-color: rgba(255, 255, 255, 0.194);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        padding-bottom: 10px;
                    }
                    .mypage_1_container_2_content::-webkit-scrollbar {
                        display: none;
                    }
                    .mypage_1_container_2_content div{
                        position: relative;
                        background-color: rgba(255, 255, 255, 0.132);
                        /* box-shadow: 0px 0px 5px rgb(0, 0, 0); */
                        height: 33px;
                        width: 60px;
                        border-radius: 5px;
                        margin-left: 5px;
                        margin-top: 5px; 
                        font-size: 10px;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        font-size: 10px;
                    }
                    .mypage_1_container_2_content div:hover{
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.232);
                    }

                    /*이용방법*/
                    .mypage_2_container{
                        height: 100%;
                        width: 100%;
                        background: rgb(201, 202, 213);
                    }

                    /*ABOUT*/
                    .mypage_3_container{
                        height: 100%;
                        width: 100%;
                        /* background: rgb(255, 245, 129); */
                        /* padding-top: 20px; */
                    }
                    .mypage_3_loadstar{
                        /* background-color: #782323; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 11px;
                        font-weight: bold;
                        color: #4a3b8b;
                    }
                    .mypage_3_version_container{
                        /* background-color: #981111; */
                        height: 60px;
                        display: flex;
                        margin-top: 10px;
                    }
                    .mypage_3_version_container_img{
                        /* background-color: aqua; */
                        height: 60px;
                        width: 80px;
                    }
                    .mypage_3_version_container_contents{
                        background-color: rgb(110, 117, 117);
                        height: 60px;
                        width: 105px;
                        color: #ffffff;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                    }
                    .mypage_3_version_container_contents div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        /* color: #6c3636; */
                    }
                    .mypage_3_version_developer{
                        /* background-color: #11988a; */
                        margin-top: 10px;
                        height: 20px;
                        width: 100%;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .mypage_3_version_developer div{
                        background-color: black;
                        height: 20px;
                        width: 50px;
                        color: #ffffff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 20px;
                        font-size: 10px;
                    }
                    .mypage_3_version_developer div:hover{
                        background-color: rgb(48, 48, 48);
                        cursor: pointer;
                        color: #838383;
                    }
                }
                `}
            </style>
        </div>
    )
    
}

export default First_question;