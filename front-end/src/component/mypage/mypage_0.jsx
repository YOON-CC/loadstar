import React, { useState, useEffect } from "react";
import axios from 'axios';
import ApexCharts from 'apexcharts';

const Mypage_0 = (props) => {

    const [chartData, setChartData] = useState([]);

    // const handleBoardView = async () => {

    //     try {   
    //         const response = await axios.get(`http://13.125.16.222/boards/${board_Id}`, {
    //             headers: {
    //                 'X-ACCESS-TOKEN': access_token,
    //                 'X-REFRESH-TOKEN': refresh_token
    //             }
    //         });
          
    //         console.log(response.data);

    //         if (response.status === 200) {    
    //             setChartData(response.data.arr);
    //         }
            

    //     } catch (error) {

    //     }
    // };


    // handleBoardView();

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
    return (
        
        <div className="mypage_0_container">

            <div className="cover1">아이디 보기</div>
            <div className="cover2">이메일 보기</div>
            <div className="mypage_0_container_1">
                <div>{props.value1}</div>
                <div>{props.value2}</div>
            </div>
            
            <div className="mypage_0_container_2">
                <div><img className="home_header_body_1_logo_img" src="image/logo.png"></img></div>
                {/* <div className="board_object_chart_container">
                    <div id="chart" />
                </div> */}
            </div>

        </div>
    )
    
}

export default Mypage_0;