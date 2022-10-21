import React from 'react';
import {ACTIONS} from './Calculator'
function DigitButton(props) {

    const{digit, dispatch} = props;
    return (
        <button onClick={()=>dispatch({type:ACTIONS.APPEND_DIGIT,payload:{digit}})}>{digit}</button>
    );
}

export default DigitButton;