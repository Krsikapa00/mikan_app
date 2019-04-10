import React from 'react';

const PunchRecipt = ({ punch, user }) => {
    const { location, in_out, date, time } = punch;
    return (
        <div>
            <div className='fw6 lh-copy f3' >
                <label className="db">{`Your following punch has been recorded.`}</label>
                <label className="db">{`Summary:`}</label>
                <label className="db">{`Place: ${location}`}</label>
                <label className="db">{`User: ${user.name}`} </label>
                <label className="db">{`In/Out: ${in_out}`}</label>
                <label className="db">{`Date: ${date.substring(0,10)}`}</label>
                <label className="db">{`Time: ${time.substring(0,8)}`}</label>
            </div>

        </div>
    )
}

export default PunchRecipt;