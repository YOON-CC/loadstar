import React, { useState, useEffect } from 'react';
import "./home_board_list.css";
import Board_view from "../board/board_view";
import axios from 'axios';


const Home_board_list = () => {
    const [view, setView] = useState(false);
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(0);
    const [first_Title, setFirst_Title] = useState([]);
    const [first_Tag, setFirst_Tag] = useState([]);
    const [divElements, setDivElements] = useState([]);

    const board_View = () => {
        setView(!view);
    };

    const hashtag_Show = () => {
        setShow(!show);
    };

    useEffect(() => {
        const handleBoardInfo = async () => {
            try {
            const response = await axios.get("http://13.125.16.222/boards/main", {
                params: {
                page: page
                },
                headers: {
                "Content-Type": "application/json"
                }
            });
        
            if (response.status === 200) {
                const temp_title = response.data.map(item => item.title);
                setFirst_Title(prevTitle => [...prevTitle, ...temp_title]);

                const temp_tag = response.data.map(item => item.hashtags);
                setFirst_Tag(prevTag => [...prevTag, ...temp_tag]);
            }
            } catch (error) {
            // 에러 처리
            }
        };
        
        handleBoardInfo();
    }, [page]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 100; // 스크롤 위치 임계값

            if (scrollPosition > scrollThreshold) {
            setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    useEffect(() => {
        const updatedDivElements = [];
        for (let i = 0; i < first_Title.length; i++) {
            const title = first_Title[i];
            const hash_tag = first_Tag[i];

            updatedDivElements.push(
            <div key={i} className="board-list" onClick={board_View}>
                <div className="board-list_c1">
                    <div className="board-list_c1_img">
                        <img className="home_header_body_1_graph_img" src="image/그래프_사진.png" alt="그래프 사진" />
                    </div>
                    <div className="board-list_c1_tag"></div>
                </div>
                <div className="board-list_c2">{title}</div>
                {hash_tag && hash_tag.length === 1 && (
                <div className="board-list_c3">
                    <div className="board-list_c3_tag">{hash_tag[0]}</div>
                </div>
                )}
                {hash_tag && hash_tag.length > 1 && (
                <div className="board-list_c3">
                    <div className="board-list_c3_tag">{hash_tag[0]}</div>
                    <div className="board-list_c3_tag">{hash_tag[1]}</div>
                    <div className="board-list_c3_tag_end">...</div>
                </div>
                )}
            </div>
            );
        }
        
        setDivElements(updatedDivElements);
    }, [first_Title, first_Tag]);

    return (
        <div className="home_board_list_body">
        {view && <Board_view view={view} board_View={board_View}></Board_view>}

        <div className="home_hashtag_body">
            <div className="home_hashtag_container">
            <div className="home_hashtag_container_c1">전체</div>
            <div className="home_hashtag_container_c1">참고글</div>
            <div className="home_hashtag_container_c1">질문글</div>
            <div className="hashtag" onClick={hashtag_Show}>해시태그 고리기</div>
            </div>
        </div>

        {show && (
            <div className="home_hashtag_container_view">
                <div className="home_hashtag_container_view_container">
                    <div className="list_1_container">
                        <div className="hashtag_title">기본설정</div>
                        <div className="list_1">
                            <div>전공자</div>
                            <div>비전공자</div>
                            <div>현직자</div>
                            <div>비현직자</div>
                            <div>프론트엔드</div>
                            <div>백엔드</div>
                        </div>
                    </div>
                    <div className="list_2_container">
                        <div className="hashtag_title">프로그래밍 언어</div>
                        <div className="list_2">
                            <div>html</div>
                            <div>css</div>
                            <div>javascript</div>
                            <div>typescript</div>
                            <div>react</div>
                            <div>java</div>
                        </div>
                        <div className="list_2">
                            <div>python</div>
                            <div>spring</div>
                            <div>springboot</div>
                            <div>node.js</div>
                        </div>
                    </div>
                    <div className="list_3_container">
                        <div className="hashtag_title">CS</div>
                        <div className="list_3">
                            <div>운영체제</div>
                            <div>네트워크</div>
                            <div>자료구조</div>
                            <div>컴퓨터구조</div>
                            <div>컴파일러</div>
                            <div>알고리즘</div>
                        </div>
                        <div className="list_3">
                            <div>데이터베이스</div>
                        </div>
                    </div>
                    <div className="list_4_container">
                        <div className="hashtag_title">활동</div>
                        <div className="list_4">
                            <div>부트캠프</div>
                            <div>개발외주</div>
                        </div>
                    </div>
                    <div className="hashtag_btn_container">
                        <div>적용하기</div>
                        <div onClick={hashtag_Show}>취소</div>
                    </div>
                </div>
            </div>
        )}

            <div className="board-list-container">
                {divElements}
            </div>
        </div>
    );
};

export default Home_board_list;