import React from 'react';
import { ACTIONS } from './Calculator';

function OperatorButton(props) {
    const {operator, dispatch} = props;
    return (
        <button onClick={()=>dispatch({type:ACTIONS.SET_OPERATOR, payload:{operator}})}>{operator}</button>
    );
}

export default OperatorButton;