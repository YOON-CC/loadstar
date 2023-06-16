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
            <div className="Hashtag_modal_container_modal">
                <div className="Hashtag_modal_container_tag">카테고리1</div>
                <div className="Hashtag_modal_container_tag">카테고리2</div>
                <div className="Hashtag_modal_container_tag">카테고리3</div>
                <div className="Hashtag_modal_container_tag">카테고리4</div>
                <div className="Hashtag_modal_container_tag">카테고리5</div>
                <button className="hastag_btn" onClick={closeModal}>적용하기</button>
            </div>
        </div>
    );
}

export default Hashtag_modal;