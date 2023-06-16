import React, { Component } from "react";
import "./board_post.css";
import store from "../../store";

export default class Login extends Component{
    
    render() { 
        return (
            <div className="board_post_container">
                <h2>게시글 작성</h2>
                <form>
                    <div className="board_post_container_title">
                        <input type="text"></input>
                        <label>제목</label>
                    </div>

                    <div className="board_post_container_check">

                        <div className="board_post_container_check_1">
                            <div className="board_post_container_check_1_title">show your graph?</div>
                            <div className="board_post_container_check_1_title_container">
                                <div>YES</div>
                                <div>NO</div>
                            </div>
                        </div>

                        <div className="board_post_container_check_2">
                            <div className="board_post_container_check_2_title">질문 글이면 눌러주세요</div>
                            <div className="board_post_container_check_2_title_container">질문</div>
                        </div>

                        <div className="board_post_container_check_3">
                            <div className="board_post_container_check_3_hashtag">
                                <div className="board_post_container_check_3_hashtag_list">카테고리1</div>
                                <div className="board_post_container_check_3_hashtag_list">카테고리2</div>
                                <div className="board_post_container_check_3_hashtag_list">카테고리3</div>
                                <div className="board_post_container_check_3_hashtag_list">카테고리4</div>
                                <div className="board_post_container_check_3_hashtag_list">카테고리5</div>
                            </div>
                        </div>

                    </div>

                    <div className="board_post_container_detail">
                        <div>내용</div>
                        <input type="text"></input>

                    </div>

                    <div className="board_post_container_button">
                        <button className="board_post_container_button_post" onClick={function(){
                            store.dispatch({type:"AFTER_LOGIN"});
                        }.bind(this)}>게시글 post</button>
                        
                        <div className="board_post_container_button_cancel" onClick={function(){
                            store.dispatch({type:"AFTER_LOGIN"});
                        }.bind(this)}>취소</div>
                    </div>   

                </form>
            </div>
        )
    }
}