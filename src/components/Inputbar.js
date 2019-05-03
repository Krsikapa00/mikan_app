import React from 'react';

const Inputbar = (props) => {


    return(
        <div className= {` w-70 m4 center `}>
            <label className="b ssftn5" >{props.label}</label>
            <input
            id={props.id}
            className={`pa2 f4 input-reset ba bg-transparent hover-bg-black hover-white w-100 ${props.className}`}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            >
            </input>
        </div>
    )
}

export default Inputbar;