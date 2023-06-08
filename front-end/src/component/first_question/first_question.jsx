import React, { useState } from "react";
import "./first_question.css";
import store from "../../store";
import axios from 'axios';


const First_question = () => {

    const { number, userId } = store.getState();

    console.log("질문에서 받은 값", number, userId)
    //중복 체크 방지
    const [checkbox1Checked, setCheckbox1Checked] = useState(false);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);
    const [checkbox3Checked, setCheckbox3Checked] = useState(false);
    const [checkbox4Checked, setCheckbox4Checked] = useState(false);
    const [checkbox5Checked, setCheckbox5Checked] = useState(false);
    const [checkbox6Checked, setCheckbox6Checked] = useState(false);

    //기간 입력
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    //체크 안되도록 하는 함수
    const handleCheckbox1Change = (event) => {
        const checked = event.target.checked;
        setCheckbox1Checked(checked);
        if (checked) {
            setCheckbox2Checked(false);
        }
    };
    const handleCheckbox2Change = (event) => {
        const checked = event.target.checked;
        setCheckbox2Checked(checked);
        if (checked) {
            setCheckbox1Checked(false);
        }
    };
    const handleCheckbox3Change = (event) => {
        const checked = event.target.checked;
        setCheckbox3Checked(checked);
        if (checked) {
            setCheckbox4Checked(false);
        }
    };
    const handleCheckbox4Change = (event) => {
        const checked = event.target.checked;
        setCheckbox4Checked(checked);
        if (checked) {
            setCheckbox3Checked(false);
        }
    };
    const handleCheckbox5Change = (event) => {
        const checked = event.target.checked;
        setCheckbox5Checked(checked);
        if (checked) {
            setCheckbox6Checked(false);
        }
    };
    const handleCheckbox6Change = (event) => {
        const checked = event.target.checked;
        setCheckbox6Checked(checked);
        if (checked) {
            setCheckbox5Checked(false);
        }
    };

    //기간 입력 받기
    const handleyearChange = (event) => { //년도
        setYear(event.target.value)
    };
    const handlemonthChange = (event) => { //월
        setMonth(event.target.value)
    };

    //보내기 함수
    const handleJoinSubmit = async (event) => {
        event.preventDefault();

        //번수값
        let major_value;
        let frontBack_value;
        let current_value;

        //전공자 비전공자
        if(checkbox1Checked){major_value = 'y'} else{major_value = 'n'}
        //프론트 백엔드
        if(checkbox3Checked){frontBack_value = 'y'} else{frontBack_value = 'n'}
        //프론트 백엔드
        if(checkbox5Checked){current_value = 'y'} else{current_value = 'n'}

        try {
            const response = await axios.patch('http://13.125.16.222/users/first-question', {
                userId: userId, // 회원가입에서 받아온 값으로 대체해야 합니다.
                major: major_value,
                frontBack: frontBack_value,
                current: current_value,
                year: year, // 변수 year는 적절한 값으로 대체해야 합니다.
                month: month, // 변수 month는 적절한 값으로 대체해야 합니다.
            });
            console.log('PATCH 요청 성공:', response.data);
            store.dispatch({type:'HOME'});
        } catch (error) {
            console.error('PATCH 요청 실패:', error);
            // 에러 처리 작업 추가
        }
    };

    return (
        <div className="question-box">
            <h2>QUESTION</h2>
            <form onSubmit={handleJoinSubmit}>
                <div className="question_container">
                    <div className="question">QUESTION 1</div>
                    <div className="answer_1">
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox1Checked} onChange={handleCheckbox1Change}></input>전공자</label>
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox2Checked} onChange={handleCheckbox2Change}></input>비전공자</label>
                    </div>
                    <div className="question">QUESTION 2</div>
                    <div className="answer_2">   
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox3Checked} onChange={handleCheckbox3Change}></input>프론트엔드</label>
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox4Checked} onChange={handleCheckbox4Change}></input>백엔드</label>
                    </div>
                    <div className="question">QUESTION 3</div>
                    <div className="answer_3">
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox5Checked} onChange={handleCheckbox5Change}></input>현직자</label>
                        <label><input type="checkbox" name="color" value="blue" checked={checkbox6Checked} onChange={handleCheckbox6Change}></input>비현직자</label>
                    </div>
                    <div className="question">개발공부 기간 입력</div>
                    <div className="answer_4">
                        <input type="text" className="answer_4_year" placeholder="YEAR" onChange={handleyearChange}></input>
                        <input type="text" className="answer_4_month" placeholder="MONTH" onChange={handlemonthChange}></input>
                    </div>
                </div>

                <div className="question_button_container">
                    <button className="question_button_container_c1">
                        확인
                    </button>
                    <div className="question_button_container_c2" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>건너뛰기</div>
                </div>

            </form>
        </div>
    )
    
}

export default First_question;