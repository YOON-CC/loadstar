import React, { useEffect, useState } from "react";
import BeforeLogin from "./before_login";
import store from "../../store.js";
import "./no_login_home_header.css";

const NoLoginHomeHeader = () => {
    const [number, setNumber] = useState(store.getState().number);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setNumber(store.getState().number);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="no_login_header_body">
            <div className="no_login_header_body_1">
                <div className="no_login_header_body_1_logo">
                    <img className="no_login_header_body_1_logo_img" src="/image/logo.png" alt="로고"/>
                </div>
                 <BeforeLogin></BeforeLogin>
            </div>

            {number === 0 && 
                <div className="no_login_header_body_2">
                    <div className="no_login_header_body_2_c2">DRAW AND SHOW YOUR DREAM</div>
                    <div className="no_login_header_body_2_c1">
                        <div className="no_login_header_body_2_c1_img_container">
                            <img src="/image/logo.png"></img>
                        </div>
                    </div>
                    <div className="no_login_header_body_2_c3">당신의 길라잡이 LOADSTAR</div>
                </div>
            }

        {/* css스타일 */}
        {/* <style>
            {`

            `}
        </style> */}
        </div>
    );
};

export default NoLoginHomeHeader;