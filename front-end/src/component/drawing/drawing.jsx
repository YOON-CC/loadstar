import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import "./drawing.css";
import { Link, useNavigate } from 'react-router-dom';

const ChartComponent = () => {
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
        },
        colors: ['#FFFFFF'],
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
  }

  return (
    <div className="chart_body">
      {/* 헤더 */}
      <div className="chart_header">
        <div className="chart_header_c1">
          <img className="chart_header_c1_logo" src="/image/logo.png" alt="Logo" />
        </div>
        <div className="chart_header_c2">
          <div className="chart_header_c2_b1">로그아웃</div>
          <Link to="/mypage">
            <div className="chart_header_c2_b2">마이페이지</div>
          </Link>
          <div className="chart_header_c2_b3">
            <img src="/image/alarm.png" alt="Alarm" />
          </div>
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
              <button>이전</button>
            </div>

            {/* 질문 */}
            <div className="chart_question_container_c2_select">
              <div className="chart_question_container_c2_container">
                {/* yes, no 버튼 */}
                <div className="chart_question_container_c2_container_yes_no">
                  <div onClick={() => setYesNoBtn1("y")}>
                    {(yesNoBtn1 === "n" || yesNoBtn1 === '') && (
                      <div className="chart_question_container_c2_container_b1_default">YES</div>
                    )}
                    {yesNoBtn1 === "y" && (
                      <div className="chart_question_container_c2_container_b1">YES</div>
                    )}
                  </div>
                  <div onClick={() => setYesNoBtn1("n")}>
                    {(yesNoBtn1 === "y" || yesNoBtn1 === '') && (
                      <div className="chart_question_container_c2_container_b2_default">NO</div>
                    )}
                    {yesNoBtn1 === "n" && (
                      <div className="chart_question_container_c2_container_b2">NO</div>
                    )}
                  </div>
                </div>
                {/* 기간 */}
                {yesNoBtn1 === "y" && (
                  <div className="chart_question_container_c2_container_period">
                    <div className="chart_question_container_c2_container_period_title_1">기간을 입력해주세요! 시작일, 종료일(현재까지)</div>
                    <div className="chart_question_container_c2_container_period_input">
                      <input type="text" className="input1" value={input1_clear} placeholder="시작일 ex) 2023-01" onChange={e => setInput1_clear(e.target.value)}/>
                      <input type="text" className="input2" value={input2_clear} placeholder="종료일 ex) 2023-12" onChange={e => setInput2_clear(e.target.value)}/>
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
              <button onClick={handleNextQeution}>다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;