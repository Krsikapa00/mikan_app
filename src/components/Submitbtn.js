import React from 'react';

const Submitbtn = (props) => {


    return(
        <div className={`mv3 ${props.divclass}`}>
            <input
            id={props.id}
            className={`${props.className} b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 `}
            type="button" 
            value={props.value}
            onClick={props.onClick}
            >
            </input>
        </div>
    )
}

export default Submitbtn;