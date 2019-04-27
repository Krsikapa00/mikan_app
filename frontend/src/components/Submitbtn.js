import React from 'react';

const Submitbtn = (props) => {


    return(
        <div className={`mv3 ${props.divclass}`}>
            <input
            id={props.id}
            className={`${props.className} b pv2 input-reset ba b--black bg-transparent grow pointer `}
            type="button" 
            value={props.value}
            onClick={props.onClick}
            >
            </input>
        </div>
    )
}

export default Submitbtn;