import React, { useState, Component } from "react";
import "./hashtag.css";
import Hashtag_modal from "./hashtag_modal";

function Hashtag() {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);


    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div>
            <button className = "hashtag_container" onClick={showModal}>해시테그 고르기</button>
            {modalOpen && <Hashtag_modal setModalOpen={setModalOpen}/>}
        </div>
    );
}

export default Hashtag;