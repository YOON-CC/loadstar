import React, { useState, Component } from "react";
import "./board_post.css";
import store from "../../store";


const Board_post = () => {

    //그래프 보여주기 체크
    const [showgraph, setShowgraph] = useState('');
    console.log("그래프 보여주기 여부",showgraph)

    //게시물 종류(참고글 or 질문글)
    const [posttype, setPosttype] = useState('');
    console.log("게시글 종류",posttype)

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
                            <div className ="show_or_not_graph_container" onClick={() => setShowgraph(1)}>
                                {(showgraph === 0 || showgraph === '') && <div className ="show_or_not_graph_container_default">YES</div>}
                                {showgraph === 1 && <div className ="show_or_not_graph_container_check">YES</div>}
                            </div>
                            <div className ="show_or_not_graph_container" onClick={() => setShowgraph(0)}>
                                {(showgraph === 1 || showgraph === '') && <div className ="show_or_not_graph_container_default">NO</div>}
                                {showgraph === 0 && <div className ="show_or_not_graph_container_check">NO</div>}
                            </div>
                        </div>
                    </div>

                    <div className="board_post_container_check_2">
                        <div className="board_post_container_check_2_title">what is the post type?</div>
                        <div className="board_post_container_check_1_title_container">
                            <div className ="show_or_not_graph_container" onClick={() => setPosttype(1)}>
                                {(posttype === 0 || posttype === '') && <div className ="show_or_not_graph_container_default">참고글</div>}
                                {posttype === 1 && <div className ="show_or_not_graph_container_check">참고글</div>}
                            </div>
                            <div className ="show_or_not_graph_container" onClick={() => setPosttype(0)}>
                                {(posttype === 1 || posttype === '') && <div className ="show_or_not_graph_container_default">질문글</div>}
                                {posttype === 0 && <div className ="show_or_not_graph_container_check">질문글</div>}
                            </div>
                        </div>
                    </div>
                    <div className="board_post_container_check_3">
                        <div className="board_post_container_check_3_hashtag">
                            <div>현직자</div>
                            <div>비현직자</div>
                            <div>전공자</div>
                            <div>비전공자</div>
                            <div>프론트엔드</div>
                            <div>백엔드</div>
                            <div>HTML</div>
                            <div>CSS</div>
                            <div>javascript</div>
                            <div>Typescript</div>
                            <div>node.js</div>
                            <div>react</div>
                            <div>redux</div>
                            <div>next.js</div>
                            <div>graphQL</div>
                            <div>Python</div>
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

export default Board_post;