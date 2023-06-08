import {createStore} from 'redux'
export default createStore(function(state, action){
    if(state === undefined){
        return {number:0}
    }
    if(action.type === "HOME"){
        return {...state, number:0}
    }
    if (action.type === "LOGIN"){
        return {...state, number:1}
    }
    if (action.type === "JOIN"){
        return {...state, number:2}
    }
    if (action.type === "SEARCH_ID"){
        return {...state, number:3}
    }
    if (action.type === "SEARCH_PWD"){
        return {...state, number:4}
    }
    if (action.type === "CHANGE_PWD"){
        return {...state, number:5}
    }
    if (action.type === "WELCOME"){
        return {...state, number: action.payload.number, userId: action.payload.userId};
    }
    if (action.type === "FIRST_QUESTION"){
        return {...state, number: action.payload.number, userId: action.payload.userId}
    }
    
    // 로그인 이후
    if (action.type === "AFTER_LOGIN"){
        return {...state, number:7}
    }
    if (action.type === "MYPAGE"){
        return {...state, number:8}
    }
    if (action.type === "BOARD_POST"){
        return {...state, number:9}
    }
    
    return state;
})