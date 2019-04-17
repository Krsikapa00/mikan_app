import React from 'react';


const HistoryNav = ({ user, adminlist, getFilteredHistory, username }) => {
    const refresh_table = () => {
        const searchuser = document.getElementById('select_user').value; 
        const startdate = document.getElementById('start').value; 
        const enddate =  document.getElementById('end').value; 
        if ( !searchuser || !startdate || !enddate){
            console.log('Fill out ALL options')
        } else {
            console.log(searchuser)
            getFilteredHistory(searchuser, startdate, enddate);
        }
    }
    
    return (
        <div className='flex justify-center mb3 bb table-cont '> 
            <div id='select-user' className='ssbtn m4 flex w-20 justify-center '> 
                <select id='select_user'className='w-100 hover-bg-black hover-white bg-transparent b ba b--black' >
                    
                    { user.admin === true
                    ?(
                        adminlist.map(function(data,i){
                            return(
                                //NEED TO ADD KEY VALUES THAT ARE UNIQUE
                                <option className='pa2' value={data.id}>{data.name}</option>
                            )
                        })
                    )
                    :(<option className='pa2' value={user.id}>{user.name}</option>)
                    }
                
                </select>
            </div>
            <div className=' w-20 m4'>
                <label className='b ssftn5' >Start date: </label>
                <input className='b ba b--black bg-transparent pointer ssftn5 dib hover-bg-black hover-white w-100' type="date" id="start" name="search-start" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
            </div>
            <div className='w-20 m4 '>
                <label className='b ssftn5' >End date: </label>
                <input className='b ba b--black bg-transparent pointer ssftn5 dib hover-bg-black hover-white w-100' type="date" id="end" name="search-end" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
            </div>
            <div className='w-20 m4 flex '>
                <input 
                    type="submit" 
                    id="search" 
                    value='Search User History'
                    className="b  sspd pv2 input-reset ba b--black bg-transparent grow pointer ssftn5 " 
                    onClick={refresh_table}
                    />
            </div>

        </div>
        
    )
    
}

export default HistoryNav;