import React from 'react';

const Inputbar = (props) => {


    return(
        <div className="mv3">
            <label className="db fw6 lh-copy f6" >{props.label}</label>
            <input
            id={props.id}
            className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ${props.className}`}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            >
            </input>
        </div>
    )
}

export default Inputbar;