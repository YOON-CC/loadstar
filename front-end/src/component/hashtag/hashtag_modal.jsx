import React, { useState, Component } from "react";
import "./hashtag_modal.css";

function Hashtag_modal({ setModalOpen, setModalApply, id, title, content, writer }) {
    // 모달창 노출 여부 state
    const closeModal = () => {
        setModalOpen(false);
    };

    const closeModal_apply = () => {
        // 여기서 필터 적용 코드 
        setModalOpen(false);
    };
    

    return (
        <div className="Hashtag_modal_container">
            <button className="Hashtag_modal_container_close" onClick={closeModal}></button>

            <div className="Hashtag_modal_container_tag"></div>
            <div className="Hashtag_modal_container_tag"></div>
            <div className="Hashtag_modal_container_tag"></div>
            <div className="Hashtag_modal_container_tag"></div>
            <div className="Hashtag_modal_container_tag"></div>
            <button className="hastag_btn" onClick={closeModal}>적용하기</button>
        </div>
    );
}

export default Hashtag_modal;