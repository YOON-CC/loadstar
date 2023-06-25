import React, { useState, useEffect  } from "react";
import "./mypage.css";
import Mypage_0 from "./mypage_0";
import Mypage_1 from "./mypage_1";
import Mypage_2 from "./mypage_2";
import Mypage_3 from "./mypage_3";
import store from "../../store";
import axios from 'axios';
import Cookies from 'js-cookie';

const First_question = () => {

    const [mypagenum, setMypagenum] = useState(0);

    //userId와 이메일 받아오기
    const [mypage_userId, setMypage_userId] = useState('');
    const [mypage_email, setMypage_email] = useState('');

    //작성글 제목 받아오기
    const [mypage_boardtitle, setMypage_boardtitle] = useState([]);

    //데이터 받아오기 
    const handleMypage_user_info = async () => {

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
        console.log("user id입니다. : ", user_Id)
        console.log("access_token입니다. : ", access_token)
        
        console.log("refresh_token입니다. : ",refresh_token);

        try {   
            const response = await axios.get(`http://13.125.16.222/users/mypage/${user_Id}`, {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });
          
            console.log(response.data);

            if (response.status === 200) {
                setMypage_userId(response.data.username);
                setMypage_email(response.data.email);
                setMypage_boardtitle(response.data.boards)
            }

        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleMypage_user_info();
    }, []);

    return (
        <div className="mypage_container">
            <div className="mypage_container_1">
                <div className="mypage_container_1_box_0" onClick={() => setMypagenum(0)}>회원정보</div>
                <div className="mypage_container_1_box_1" onClick={() => setMypagenum(1)}>나의활동</div>
                <div className="mypage_container_1_box_2" onClick={() => setMypagenum(2)}>이용방법</div>
                <div className="mypage_container_1_box_3" onClick={() => setMypagenum(3)}>ABOUT</div>
                <div className="mypage_container_1_box_4" onClick={function(){
                        store.dispatch({type:'AFTER_LOGIN'});
                    }.bind(this)}>나가기</div>
                <div className="mypage_container_1_box_5"><img className="home_header_body_1_logo_img" src="image/logo.png"></img></div>
            </div>
            <div className="mypage_container_2">
                {mypagenum === 0 && <Mypage_0 value1={mypage_userId} value2={mypage_email}></Mypage_0>}
                {mypagenum === 1 && <Mypage_1 value_title={mypage_boardtitle}></Mypage_1>}
                {mypagenum === 2 && <Mypage_2></Mypage_2>}
                {mypagenum === 3 && <Mypage_3></Mypage_3>}
            </div>

        </div>
    )
    
}

export default First_question;