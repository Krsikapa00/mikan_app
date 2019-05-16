import React from 'react';

const Singlepunch = ({punch}) => {
        if (punch.id) {
        const { location, in_date, in_time, out_date, out_time  } = punch;



        return (
            <div>
                <label className="db">{`Place: ${location}`}</label>
                <label className="db">{`In Date: ${in_date.substring(0,10)}`}</label>
                <label className="db">{`In Time: ${in_time.substring(0,8)}`}</label>
                {out_date === null
                ?(<div>
                    <label className="db">{`Out Date: N/A`}</label>
                    <label className="db">{`Out Time: N/A`}</label>
                    </div>)
                :(
                <div>
                    <label className="db">{`Out Date: ${out_date.substring(0,10)}`}</label>
                    <label className="db">{`Out Time: ${out_time.substring(0,8)}`}</label>
                </div>
                )}
                
            </div>
        )
    } else 
    return(<div></div>)
}

export default Singlepunch;