import React, { useState } from 'react';


export const ExamData = ({}) => {
    
    let value = 0;
    const [state, setState] = useState({});
    const onClick = () => {
        value = value + 1;
        const newState = state + 1;
        setState(newState);
    }
    return (
        <div>
            ExamData: {value}, {state}
            <button onClick = {onClick}>Increment</button>
            <input type="text" value = "demo"/>
        </div>
    );
};