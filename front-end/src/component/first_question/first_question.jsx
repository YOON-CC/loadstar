import React, { Component } from "react";
import "./first_question.css";
import store from "../../store";

export default class First_question extends Component{

    render() { 
        return (
            <div className="question-box">
                <h2>question</h2>
                <form>
                    <div className="question_container_1">
                        <div className="question_container_1_c1">
                            질문1
                        </div>
                        <div className="question_container_1_c2">
                            해시테그1
                        </div>
                    </div>

                    <div className="question_container_2">
                        <div className="question_container_2_c1">
                            질문2
                        </div>
                        <div className="question_container_2_c2">
                            해시테그2
                        </div>
                    </div>

                    <div className="question_container_3">
                        <div className="question_container_3_c1">
                            질문3
                        </div>
                        <div className="question_container_3_c2">
                            해시테그3
                        </div>
                    </div>

                    <div className="question_button_container">
                        <button className="question_button_container_c1">
                            확인
                        </button>
                        <div className="question_button_container_c2" onClick={function(){
                                store.dispatch({type:'HOME'});
                            }.bind(this)}>건너뛰기</div>
                    </div>

                </form>
            </div>
        )
    }
}