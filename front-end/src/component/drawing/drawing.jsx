import React, { useState, useEffect} from 'react';
import ApexCharts from 'apexcharts';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

import { useDispatch } from "react-redux";


const ChartComponent = () => {
  //네비게이터, 리덕스
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //토큰 방식
  const access_token = localStorage.getItem('access-token');

  const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
  const prefix = 'X-REFRESH-TOKEN=';
  const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
  const endIndex = extractedValue.indexOf("%");
  const refresh_token = extractedValue.slice(0, endIndex);

  
  // 차트 데이터
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
              colors: '#FFFFFF', // x축 글 색상
              fontSize: '10px', // x축 글자 크기
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#FFFFFF', // y축 글 색상
              fontSize: '10px', // x축 글자 크기
            },
          },
        },
        colors: ['#FFFFFF'],
      };

      const chart = new ApexCharts(
        document.querySelector("#chart"),
        options
      );
      chart.render();

      chart.addEventListener('click', (event, chartContext, config) => {
        console.log('막대를 클릭했습니다!', config.dataPointIndex);
          // 클릭한 막대의 인덱스를 가져옴
        const dataIndex = config.dataPointIndex;

        // chartData 배열에서 클릭한 막대를 제외한 새로운 배열을 생성
        const newData = chartData.filter((_, index) => index !== dataIndex);

        // chartData를 업데이트하여 막대가 제거된 차트를 렌더링
        setChartData(newData);
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  //@@@@@@@@@@@@@@@@@@@@질문 관련 함수@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 버튼, 기간
  const [yesNoBtn1, setYesNoBtn1] = useState('');

  //클리어
  const [input1_clear, setInput1_clear] = useState('');
  const [input2_clear, setInput2_clear] = useState('');

  // 추가
  const [question_tag, setQuestion_tag] = useState('알고리즘');
  const handleAddData_addition = () => {

    const input1 = document.querySelector('.input1').value; // 예: '2023-1'
    const input2 = document.querySelector('.input2').value; // 예: '2023-5'

    //양식확인
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(input1)) {
      // 올바른 형식인 경우
      // 처리할 로직 작성
    } 
    else {
      // 올바르지 않은 형식인 경우
      Swal.fire({
        title: '양식을 올바르게 작성해주세요!',
        text: 'ex) 2023-08',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return 
    }
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(input2)) {
      // 올바른 형식인 경우
      // 처리할 로직 작성
    } 
    else {
      // 올바르지 않은 형식인 경우
      Swal.fire({
        title: '양식을 올바르게 작성해주세요!',
        text: 'ex) 2023-08',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return 
    }

    // 입력값에서 연도와 월을 추출
    const [year1, month1] = input1.split('-');
    const [year2, month2] = input2.split('-');



    // 연도와 월을 기반으로 Date 객체 생성 (일은 1일로 설정)
    const date1 = new Date(`${year1}-${month1}-1`);
    const date2 = new Date(`${year2}-${month2}-1`);

    const newData = {
      x: question_tag,
      y: [date1.getTime(), date2.getTime()],
    };
    
    setChartData(prevData => [...prevData, newData]);

    setInput1_clear('');
    setInput2_clear('');
  };

  //이전 돌아가기
  const handlebackQeution = () => { 
    setYesNoBtn1('');
    
    if (question === '저장'){
      setQuestion('Q. 부트캠프 경험이 있습니까?');
      setQuestion_tag('부트캠프')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 부트캠프 경험이 있습니까?'){
      setQuestion('Q. 개발 프로젝트를 하셨습니까?');
      setQuestion_tag('개발 프로젝트')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 개발 프로젝트를 하셨습니까?'){
      setQuestion('Q. 개발공부를 하셨습니까?');
      setQuestion_tag('개발공부')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 개발공부를 하셨습니까?'){
      setQuestion('Q. CS공부를 하셨습니까?');
      setQuestion_tag('CS')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. CS공부를 하셨습니까?'){
      setQuestion('Q. 알고리즘(코딩테스트) 공부를 하셨습니까?');
      setQuestion_tag('알고리즘')
      setInput1_clear('');
      setInput2_clear('');
    }
  }

  //다음 넘기기
  const [question, setQuestion] = useState('Q. 알고리즘(코딩테스트) 공부를 하셨습니까?');

  const handleNextQeution = () => { 
    setYesNoBtn1('');
    
    if (question === 'Q. 알고리즘(코딩테스트) 공부를 하셨습니까?'){
      setQuestion('Q. CS공부를 하셨습니까?');
      setQuestion_tag('CS')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. CS공부를 하셨습니까?'){
      setQuestion('Q. 개발공부를 하셨습니까?');
      setQuestion_tag('개발공부')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 개발공부를 하셨습니까?'){
      setQuestion('Q. 개발 프로젝트를 하셨습니까?');
      setQuestion_tag('개발 프로젝트')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 개발 프로젝트를 하셨습니까?'){
      setQuestion('Q. 부트캠프 경험이 있습니까?');
      setQuestion_tag('부트캠프')
      setInput1_clear('');
      setInput2_clear('');
    }
    else if (question === 'Q. 부트캠프 경험이 있습니까?'){
      setQuestion('저장');
      setQuestion_tag('')
      setInput1_clear('');
      setInput2_clear('');
    }
  }
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  //@@@@@@@@@@@@@@@@@@@@API 연동@@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [whether_drawing, setWhether_drawing] = useState(false);

  //처음에 데이터 받아오기
  const handleDrawingInfo = async () => {
    

    try {   
        const response = await axios.get('http://13.125.16.222/careers', {
            headers: {
                'X-ACCESS-TOKEN': access_token,
                'X-REFRESH-TOKEN': refresh_token
            }
        });
      
        if (response.status === 200) {
          //그래프 그렸는지 안그렸는지
          if (response.data.arr.length !== 0){// 이전에 그린 기록이 있다.
            setWhether_drawing(true) 
            setChartData(response.data.arr)
          }
        }
        

    } catch (error) {

    }
  };
  useEffect(() => {
      // 페이지가 로드될 때 한 번만 호출되는 로직
      handleDrawingInfo();
  }, []);

  //데이터 보내기
  const handleDrawingInfosend = async (event) => {
    event.preventDefault();

    if (whether_drawing === false){ // 이전에 데이터가 없고, 새로 넣을때
      try {
        const response = await axios.post("http://13.125.16.222/careers", {
            arr : chartData,
        }, 
        {
            headers: {
                'X-ACCESS-TOKEN': access_token,
                'X-REFRESH-TOKEN': refresh_token
            }
        });
        
        if (response.status === 200) {
          navigate('/delete');
        }
          
  
      } catch (error) {
  
      }
    }
    else{ // 이전에 데이터가 없고, 새로 추가할때
      try {
        const response = await axios.patch("http://13.125.16.222/careers", {
            arr : chartData,
        }, 
        {
            headers: {
                'X-ACCESS-TOKEN': access_token,
                'X-REFRESH-TOKEN': refresh_token
            }
        });
        
        if (response.status === 200) {
          navigate('/delete');
        }
          
  
      } catch (error) {
  
      }
    }

  };

  //로그아웃
  const handleLogout = () => {
    navigate('/');
    dispatch({ type: "HOME" });
  };

  return (
    <div className="chart_body">
      <div className="chart_body_not_100">
        <img src="/image/logo.png" alt="Logo" />
        <div className='chart_body_not_100_text1'>화면이 너무 작습니다!</div>
        <div className='chart_body_not_100_text2'>웹버전 전체화면, 100% 밑으로 이용해주세요!</div>
      </div>
      {/* 헤더 */}
      <div className="chart_header">
        <div className="chart_header_c1">
          <img className="chart_header_c1_logo" src="/image/logo.png" alt="Logo" />
        </div>
        <div className="chart_header_c2">
          <div className="chart_header_c2_b1" onClick={handleLogout}>로그아웃</div>
          <Link to="/mypage" style={{ textDecoration: 'none' }}>
            <div className="chart_header_c2_b2">마이페이지</div>
          </Link>
        </div>
      </div>

      {/* 차트 컨테이너 */}
      <div className="chart_container">
        <div id="chart" />
      </div>

      {/* 질문 */}
      <div className="chart_question">
        <div className="chart_question_container">
          <div className="chart_question_container_c1">{question}</div>
          <div className="chart_question_container_c2">
            <div className="chart_question_container_c2_b1">
              {question_tag !== '알고리즘' && <button onClick={handlebackQeution}>이전</button>}
            </div>

            {/* 질문 */}
            <div className="chart_question_container_c2_select">
              <div className="chart_question_container_c2_container">
                {/* yes, no 버튼 */}
                <div className="chart_question_container_c2_container_yes_no">
                  <div onClick={() => setYesNoBtn1("y")}>
                    {(yesNoBtn1 === "n" || yesNoBtn1 === '' && question !== '저장') && (
                      <div className="chart_question_container_c2_container_b1_default">YES</div>
                    )}
                    {(yesNoBtn1 === "y" && question !== '저장') && (
                      <div className="chart_question_container_c2_container_b1">YES</div>
                    )}
                  </div>
                  <div onClick={() => setYesNoBtn1("n")}>
                    {(yesNoBtn1 === "y" || yesNoBtn1 === ''  && question !== '저장') && (
                      <div className="chart_question_container_c2_container_b2_default">NO</div>
                    )}
                    {(yesNoBtn1 === "n"  && question !== '저장') && (
                      <div className="chart_question_container_c2_container_b2">NO</div>
                    )}
                  </div>
                </div>
                
                {question === '저장' && 
                <form onSubmit={handleDrawingInfosend}>
                  <button className='save'>
                    <img className="save_logo" src="/image/logo.png" alt="Logo"/>
                    <div className='save_text'>save</div>
                  </button>
                </form>}

                {/* 기간 */}
                {yesNoBtn1 === "y" && (
                  <div className="chart_question_container_c2_container_period">
                    <div className="chart_question_container_c2_container_period_title_1">기간을 입력해주세요! 시작일, 종료일(현재까지)</div>
                    <div className="chart_question_container_c2_container_period_input">
                      <input type="text" className="input1" value={input1_clear} placeholder="시작일 ex) 2023-01" onChange={e => setInput1_clear(e.target.value)} maxLength={7}/>
                      <input type="text" className="input2" value={input2_clear} placeholder="종료일 ex) 2023-12" onChange={e => setInput2_clear(e.target.value)} maxLength={7}/>
                      <div className= "addition_btn" onClick={handleAddData_addition}>+</div>
                    </div>
                  </div>
                )}
                {yesNoBtn1 === "n" && (
                  <div className="chart_question_container_c2_container_period">
                    <div className="chart_question_container_c2_container_period_title_2">다음으로 넘어가주세요!</div>
                  </div>
                )}



              </div>
            </div>

            <div className="chart_question_container_c2_b2">
              {question !== '저장' && yesNoBtn1 !== '' && <button onClick={handleNextQeution}>다음</button>}
            </div>
          </div>
        </div>
      </div>

      {/* css스타일 */}
      <style>
          {`
          /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
          @media (min-width: 1501px) { /*175 이전*/
              .chart_body{
                  position: relative;
                  background: linear-gradient(135deg, #2b197d, #4c3b9b, #4c3b9b, #4c3b9b, #2b197d);
                  height: 100vh;
                  width: 100%;
                  overflow: hidden;
              }
              .chart_body_not_100{
                  display: none;
              }
              .chart_body_not_100 img{
                  display: none;
              }
              .chart_body_not_100_text1{
                  display: none;
              }
              .chart_body_not_100_text2{
                  display: none;
              }
              /*차트 헤더*/
              .chart_header{
                  /* background: linear-gradient(135deg, #2b197d, #4c3b9b, #4c3b9b, #4c3b9b, #2b197d); */
                  height: 50px;
                  width: 100%;

                  display : flex;
                  justify-content: space-between;
              }
              .chart_header_c1{
                  /* background-color: aqua; */
                  height: 100%;
                  width: 65px;
                  margin-left: 10px;
              }
              .chart_header_c1_logo{
                  height: 100%;
                  width: 100%;
              }
              .chart_header_c2{
                  /* background-color: aqua; */
                  width: 195px;

                  display: flex;
                  justify-content: space-evenly;

                  margin-right: 10px;
              }
              .chart_header_c2_b1{
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
              .chart_header_c2_b2{
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
              .chart_header_c2_b3{
                  height: 25px;
                  width: 25px;
                  margin-top: 12px;
              }
              .chart_header_c2_b3 img{
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
              }
              /*차트*/
              .chart_container{
                  position: absolute;
                  background-color: rgba(255, 255, 255, 0.018);
                  /* background-color: rgb(0, 0, 0); */
                  border-radius: 20px;
                  width: 1450px;
                  left: 50%;
                  transform: translate(-50%);
                  padding: 20px;
                  /* margin-top: 20px; */
                  box-shadow: 0px 0px 1px rgb(0, 0, 0);

              }
              /*초반 질문*/
              .chart_question{
                  position: absolute;
                  /* background: linear-gradient(135deg, #2b197d, #4c3b9b, #4c3b9b, #4c3b9b, #2b197d); */
                  /* background-color: rgba(0, 0, 0, 0.27); */
                  height: 250px;
                  width: 100%;
                  margin-top: 425px;
              }
              .chart_question_container{
                  position: relative;
                  background-color: rgba(0, 0, 0, 0.27);
                  height: 100%;
                  width: 1490px;
                  border-radius: 10px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
              }
              .chart_question_container_c1{
                  /* background-color: aqua; */
                  width: 100%;
                  height: 50px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  font-size: 15px;
                  font-weight: bold;
                  color: #ffffff;
              }
              .chart_question_container_c2{
                  /* background-color: rgb(96, 101, 101); */
                  width: 100%;
                  height: 200px;
                  display: flex;
              }
              /*이전버튼*/
              .chart_question_container_c2_b1{
                  /* background-color: rgb(68, 241, 241); */
                  width: 120px;
                  height: 100%;
              }

              .chart_question_container_c2_b1 button{
                  background-color: rgba(255, 255, 255, 0.159);
                  width: 100px;
                  height: 35px; 
                  border-radius: 15px;
                  border: none;
                  margin-top: 145px;
                  margin-left: 10px;

                  color: #ffffff;
              }
              .chart_question_container_c2_b1 button:hover{
                  background-color: rgba(255, 255, 255, 0.053);
                  cursor: pointer;
                  color: #868686;
              }
              .chart_question_container_c2_select{
                  /* background-color: rgb(9, 135, 135); */
                  width: 1300px;
                  height: 100%;   
              }
              .chart_question_container_c2_container{
                  position: relative;
                  background-color: #0000000f;
                  /* background-color: #ff0000; */
                  width: 600px;
                  height: 180px;
                  top: 47%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 10px;
                  box-shadow: 0px 0px 2px 0px rgb(44, 44, 44);
              }
              .chart_question_container_c2_container_yes_no{
                  /* background-color: #4c3b9b; */
                  display: flex;
                  justify-content: space-evenly;
              }

              /*질문 버튼*/
              .chart_question_container_c2_container_b1_default{
                  background-color: #ffffff4b;
                  width: 120px;
                  height: 40px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  border-radius: 20px;
                  font-size: 15px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-top: 30px; 
                  color: #363636;
              }
              .chart_question_container_c2_container_b1{
                  background-color: #ffffff;
                  width: 120px;
                  height: 40px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  border-radius: 20px;
                  font-size: 15px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-top: 30px; 
              }
              .chart_question_container_c2_container_b2_default{
                  background-color: #ffffff4b;
                  width: 120px;
                  height: 40px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  border-radius: 20px;
                  font-size: 15px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-top: 30px; 
                  color: #363636;
              }
              .chart_question_container_c2_container_b2{
                  background-color: #ffffff;
                  width: 120px;
                  height: 40px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  border-radius: 20px;
                  font-size: 15px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-top: 30px; 
              }
              /*기간*/
              .chart_question_container_c2_container_period{
                  /* background-color: #4c3b9b; */
                  width: 100%;
                  margin-top: 25px;
              }
              .chart_question_container_c2_container_period_title_1{
                  /* background-color: #ffffff; */
                  width: 100%;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  color: #ffffff;
                  font-size: 12px;
                  font-weight: bold;
              }
              .chart_question_container_c2_container_period_title_2{
                  /* background-color: #ffffff; */
                  width: 100%;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  color: #ffffff;
                  font-size: 12px;
                  font-weight: bold;
                  margin-top: 50px;
              }
              .chart_question_container_c2_container_period_input{
                  /* background-color: #241f3a; */
                  width: 380px;
                  display: flex;
                  justify-content: space-evenly;
                  margin-top: 10px;
                  margin-left: 135px;

              }
              .chart_question_container_c2_container_period_input input{
                  position: relative;
                  width: 130px;
                  height: 30px;  

                  background: #25252576;
                  border-radius: 20px;
                  border: none;
                  color: #fff;
                  font-size: 70%;
                  font-weight: bold;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  
                  text-align: center;
                  border: none;
                  outline: none;
              }
              .addition_btn{
                  background-color: #00000026;
                  height: 27px;
                  width: 27px;
                  border-radius: 100px;
                  margin-top: 2px;
                  
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  color: #fff;
                  font-weight: bold;
                  cursor: pointer;
              }
              .addition_btn:hover{
                  background-color: #00000058;
              }
              /*저장*/
              .save{
                  position: relative;
                  background-color: rgba(0, 0, 0, 0.1);
                  border: none;
                  display: flex;
                  width: 300px;
                  height: 100px;
                  border-radius: 20px;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  cursor: pointer;
                  margin-top: 90px;
              }
              .save:hover{
                  background-color: rgba(0, 0, 0, 0.308);
              }
              .save_logo{
                  width: 110px;
                  height: 100px;
                  margin-left: 45px;
              }
              .save_text{
                  /* background-color: #2b197d; */
                  /* background: none; */
                  border: none;
                  width: 100px;
                  font-size: 30px;
                  color: #fff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  margin-top: 30px;
              }
              /*다음버튼*/
              .chart_question_container_c2_b2{
                  /* background-color: rgb(68, 241, 241); */
                  width: 120px;
                  height: 100%;
              }
              .chart_question_container_c2_b2 button{
                  background-color: rgba(255, 255, 255, 0.159);
                  width: 100px;
                  height: 35px; 
                  border-radius: 15px;
                  border: none;
                  margin-top: 145px;
                  margin-right: 10px;

                  color: #ffffff;
              }
              
              .chart_question_container_c2_b2 button:hover{
                  background-color: rgba(255, 255, 255, 0.053);
                  cursor: pointer;
                  color: #868686;
              }
          }
          /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
          @media (max-width: 1500px) { /*175 이전*/

              .chart_body_not_100{
                  position: absolute;
                  background: linear-gradient(135deg, #2b197d, #4c3b9b, #4c3b9b, #4c3b9b, #2b197d);
                  height: 270px;
                  width: 270px;

                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  border-radius: 10px;
              }
              .chart_body_not_100 img{
                  position: absolute;
                  height: 100px;
                  width: 120px;
                  top: 40%;
                  left: 50%;
                  transform: translate(-50%, -50%);
              }
              .chart_body_not_100_text1{
                  position: relative;
                  width: 100%;
                  margin-top: 150px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  font-size: 10px;
                  font-weight: bold;
                  color: #ffffff;
              }
              .chart_body_not_100_text2{
                  position: relative;
                  width: 100%;
                  margin-top: 10px;

                  display: flex;
                  justify-content: center;
                  align-items: center;

                  font-size: 10px;
                  font-weight: bold;
                  color: #ffffff;
              }
              .chart_body_container{
                  display: none;
              }
              /*차트 헤더*/
              .chart_header{
                  display: none;
              }
              .chart_header_c1{
                  display: none;
              }
              .chart_header_c1_logo{
                  display: none;
              }
              .chart_header_c2{
                  display: none;
              }
              .chart_header_c2_b1{
                  display: none;
              }
              .chart_header_c2_b2{
                  display: none;
              }
              .chart_header_c2_b3{
                  display: none;
              }
              .chart_header_c2_b3 img{
                  display: none;
              }
              /*차트*/
              .chart_container{
                  display: none;

              }
              /*초반 질문*/
              .chart_question{
                  display: none;
              }
              .chart_question_container{
                  display: none;
              }
              .chart_question_container_c1{
                  display: none;
              }
              .chart_question_container_c2{
                  display: none;
              }
              /*이전버튼*/
              .chart_question_container_c2_b1{
                  display: none;
              }

              .chart_question_container_c2_b1 button{
                  display: none;
              }
              .chart_question_container_c2_b1 button:hover{
                  display: none;
              }
              .chart_question_container_c2_select{
                  display: none;
              }
              .chart_question_container_c2_container{
                  display: none;
              }
              .chart_question_container_c2_container_yes_no{
                  display: none;
              }

              /*질문 버튼*/
              .chart_question_container_c2_container_b1_default{
                  display: none;
              }
              .chart_question_container_c2_container_b1{
                  display: none;
              }
              .chart_question_container_c2_container_b2_default{
                  display: none;
              }
              .chart_question_container_c2_container_b2{
                  display: none;
              }
              /*기간*/
              .chart_question_container_c2_container_period{
                  display: none;
              }
              .chart_question_container_c2_container_period_title_1{
                  display: none;
              }
              .chart_question_container_c2_container_period_title_2{
                  display: none;
              }
              .chart_question_container_c2_container_period_input{
                  display: none;
              }
              .chart_question_container_c2_container_period_input input{
                  display: none;
              }
              .addition_btn{
                  display: none;
              }
              .addition_btn:hover{
                  display: none;
              }
              /*저장*/
              .save{
                  display: none;
              }
              .save:hover{
                  display: none;
              }
              .save_logo{
                  display: none;
              }
              .save_text{
                  display: none;
              }
              /*다음버튼*/
              .chart_question_container_c2_b2{
                  display: none;
              }
              .chart_question_container_c2_b2 button{
                  display: none;
              }
              .chart_question_container_c2_b2 button:hover{
                  display: none;
              }
          }
          `}
      </style>
    </div>
  );
};

export default ChartComponent;