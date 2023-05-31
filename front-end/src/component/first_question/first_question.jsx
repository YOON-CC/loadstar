import React, { Component } from "react";
import "./first_question.css";
import store from "../../store";

export default class First_question extends Component{

    render() { 
        return (
            <div className="question-box">
                <h2>QUESTION</h2>
                <form>
                    <div className="question_container">
                        <div className="question">QUESTION 1</div>
                        <div className="answer_1">
                            <label><input type="checkbox" name="color" value="blue"></input>현직자</label>
                            <label><input type="checkbox" name="color" value="blue"></input>비현직자</label>
                        </div>
                        <div className="question">QUESTION 2</div>
                        <div className="answer_2">
                            <label><input type="checkbox" name="color" value="blue"></input>전공자</label>
                            <label><input type="checkbox" name="color" value="blue"></input>비전공자</label>
                        </div>
                        <div className="question">QUESTION 3</div>
                        <div className="answer_3">
                            <label><input type="checkbox" name="color" value="blue"></input>프론트엔드</label>
                            <label><input type="checkbox" name="color" value="blue"></input>백엔드</label>
                        </div>
                        <div className="question">QUESTION 4</div>
                        <div className="answer_4">
                            <div className="answer_4_year">YEAR</div>
                            <div className="answer_4_month">MONTH</div>
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