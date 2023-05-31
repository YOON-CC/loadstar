import React, { Component, useEffect, useState} from "react";
import "./home_board_list.css";



export default class Home_board_list extends Component{
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            const newBoard = <div key={scrollPosition} className="board-list">board {scrollPosition}</div>;
            this.setState(prevState => ({ boards: [...prevState.boards, newBoard] }));
        }
    };
    
    
    render() { 
        const { boards } = this.state;

        const BoardRows = [];
        for (let i = 0; i < boards.length; i += 3) {
          const row = boards.slice(i, i + 3);
          const tempboard = <div key={i} className="board-row">{row}</div>;
          BoardRows.push(tempboard);
        }

        const default_count = 6;

        const divElements = [];
        for (let i = 0; i < default_count; i++) {
          divElements.push(
           <div key={i} className="board-list">                        
                <div className="board-list_c1">
                    <div className="board-list_c1_img">
                        <img className="home_header_body_1_logo_img" src="image/logo.png"></img>
                        </div>
                    <div className="board-list_c1_tag"></div>
                </div>
                <div className="board-list_c2">프론트엔드가 꿈인 같이 성장하는..</div>
                <div className="board-list_c3">
                    <div className="board-list_c3_tag">전공자</div>
                    <div className="board-list_c3_tag">front-end</div>
                    <div className="board-list_c3_tag_end">...</div>
                </div>
            </div>);
        }
        return (
            
            <div className="home_board_list_body">

                <div className="home_hashtag_body">
                    <div className="home_hashtag_container">
                        <div className="home_hashtag_container_c1">전체</div>
                        <div className="home_hashtag_container_c1">참고글</div>
                        <div className="home_hashtag_container_c1">질문글</div>

                        <div className="home_hashtag_container_c2">
                            해시테그 고르기
                        </div >
                    </div>
                </div>
                
                <div className="board-list-container">
                    {divElements}
                    {BoardRows}
                </div>
                
            </div>
        )
    }
}