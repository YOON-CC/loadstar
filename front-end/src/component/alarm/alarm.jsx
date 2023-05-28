import React, { Component } from "react";
import store from "../../store";
import "./alarm.css";


export default class After_login extends Component{

    render() { 
        return (
            <div className="alarm_container">
                <div className="alarm_item">1</div>
                <div className="alarm_item">2</div>
                <div className="alarm_item">3</div>
                <div className="alarm_item">4</div>
                <div className="alarm_item">5</div>
                <div className="alarm_item">6</div>
                <div className="alarm_item">7</div>
            </div>
        )
    }
}