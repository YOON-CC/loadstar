import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import "./drawing.css";
import { Link, useNavigate} from 'react-router-dom';

const ChartComponent = () => {

  useEffect(() => {
    const options = {
      series: [
        {
          data: [
            {
              x: '알고리즘',
              y: [
                new Date('2019-03-02').getTime(),
                new Date('2019-03-04').getTime(),
              ],
            },
            {
              x: '부트캠프',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime(),
              ],
            },
            {
              x: 'CS공부',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime(),
              ],
            },
            {
              x: '개발',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-18').getTime(),
              ],
            },
            {
              x: '대외활동',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-18').getTime(),
              ],
            },
            {
              x: '기타',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-18').getTime(),
              ],
            },
          ],
        },
      ],
      chart: {
        height: 350, //한칸이 차지하는 높이
        type: 'rangeBar',
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 20, // 막대 높이를 10픽셀로 설정
          borderRadius: 5, // 경계선 둥근 정도를 5픽셀로 설정
        },
      },
      xaxis: {
        type: 'datetime',
      },
      colors: ['#FFFFFF'],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="chart_body">
      {/* 헤더 */}
      <div className="chart_header">
        <div className="chart_header_c1">
            <img className="chart_header_c1_logo" src="/image/logo.png"></img>
        </div>
        <div className="chart_header_c2">
            <div className="chart_header_c2_b1">로그아웃</div>

            <Link to="/mypage"><div className="chart_header_c2_b2">마이페이지</div></Link>

            <div className="chart_header_c2_b3">
                <img src="/image/alarm.png"></img>
            </div>
        </div>
      </div>

      {/* 차트 컨테이너 */}
      <div className="chart_container">
        <div id="chart"/>
      </div>

      {/* 질문 */}
      <div className="chart_question">
        <div className="chart_question_container"></div>
      </div>

    </div>
  );
};

export default ChartComponent;