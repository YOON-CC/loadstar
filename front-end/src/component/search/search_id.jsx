import React, { Component } from "react";
import "./search_id.css";
import store from "../../store";

export default class Search_id extends Component{

    render() { 
        return (
            <div className="search_id-box">
                <h2>아이디 찾기</h2>
                <form>

                    <div className="email-container">
                        <div className="email-box_1">
                            <div className="email-input_text">Email</div>
                            <input type="text" className="email-input"></input>
                        </div>
                        <div className="email-box_2">
                            <button type="submit" className="email-box_send">
                                아이디 확인
                            </button>
                        </div>
                    </div>

                    <div className="stop_search_id_container">
                        <div className="stop_search_id_container_button"onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>확인/돌아가기</div>
                    </div>

                </form>
            </div>
        )
    }
}