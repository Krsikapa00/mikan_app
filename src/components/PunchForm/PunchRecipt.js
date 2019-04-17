import React from 'react';
import Singlepunch from '../Singlepunch';

const PunchRecipt = ({ punch, user}) => {
    return (
        <div>
            <div className='fw6 lh-copy f3' >
                <label className="db">{`Your following punch has been recorded.`}</label>
                <label className="db">{`Summary:`}</label>
                <label className="db">{`User: ${user.name}`} </label>
                <Singlepunch punch={punch} />
            </div>

        </div>
    )
}

export default PunchRecipt;