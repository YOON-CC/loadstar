import React, { useState } from "react";
import Alarm from "../alarm/alarm";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AfterLogin = () => {
    const navigate = useNavigate();
    const [alarm, setAlarm] = useState(0);
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/');
        dispatch({ type: "HOME" });
    };

    return (
        <div className="home_header_body_1_form_after">
        <div className="home_header_body_1_c1" onClick={handleLogout}>
            로그아웃
        </div>
        <Link to="/mypage">
            <div className="home_header_body_1_c2">마이페이지</div>
        </Link>
        <div className="home_header_body_1_c3" onClick={() => setAlarm(alarm + 1)}><img src="image/alarm.png" alt="알람" />
        </div>
            {alarm % 2 === 1 && <Alarm />}
        </div>
    );
};

export default AfterLogin;