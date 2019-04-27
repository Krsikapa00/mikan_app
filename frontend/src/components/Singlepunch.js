import React from 'react';

const Singlepunch = ({punch}) => {
        if (punch.id) {
        const { location, date, time, inout  } = punch;

        return (
            <div>
                <label className="db">{`Place: ${location}`}</label>
                <label className="db">{`In/Out: ${inout}`}</label>
                <label className="db">{`Date: ${date.substring(0,10)}`}</label>
                <label className="db">{`Time: ${time.substring(0,8)}`}</label>
            </div>
        )
    } else 
    return(<div></div>)
}

export default Singlepunch;