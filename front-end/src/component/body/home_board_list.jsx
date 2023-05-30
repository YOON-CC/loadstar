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
                    <div key={0} className="board-list">board {0}</div>
                    <div key={1} className="board-list">board {1}</div>
                    <div key={2} className="board-list">board {2}</div>
                    <div key={3} className="board-list">board {3}</div>
                    <div key={4} className="board-list">board {4}</div>
                    <div key={5} className="board-list">board {5}</div>
                    <div key={6} className="board-list">board {6}</div>
                    <div key={7} className="board-list">board {7}</div>
                    <div key={8} className="board-list">board {8}</div>
                    <div key={9} className="board-list">board {9}</div>
                    <div key={10} className="board-list">board {10}</div>
                    <div key={11} className="board-list">board {11}</div>
                    {BoardRows}
                </div>
                
            </div>
        )
    }
}