import React from 'react';
import Image from './image.jpg';

const PunchForm = ({in_out}) => {
    
    return(
        <div  className=' mv4 w-100 w-50-m w-25-l mw6 center'>
            <div className='pa4 black-80' >
                <img 
                    alt=''
                    src={Image}
                    width='auto'
                    height='400px'
                />
                <div className='fw6 lh-copy f3' >
                    <label className="db">Place: Home</label>
                    <label className="db">Time: 12:00:00 PM</label>
                    <label className="db">User: Mikan</label>
                    <label className="db">Date: 03/10/2019</label>
                    <label className="db">{`In/Out: ${in_out}`}</label>
                </div>
                <div className="lh-copy mt3 center">
                    <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Punch" 
                    />
                </div>
            </div>
        </div>
    )
}

export default PunchForm;