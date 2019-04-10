import React from 'react';


const Menu = ({onRouteChange, punchIn_Out, user}) => {
    let admin;
    if (user.admin){
        admin = (
            <div>
                 <div className="mv3">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                        type="submit" 
                        value="Register New User"
                        onClick={() => onRouteChange('register')} 
                        />
                </div>
                <div className="mv3">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                        type="submit" 
                        value="Edit Users"
                        onClick={() => onRouteChange('editusers')} 
                        />
                </div>
                <div className="mv3">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                        type="submit" 
                        value="Locations"
                        onClick={() => onRouteChange('editlocations')} 
                        />
                </div>
            </div>
        )
    }
    return(
        <div className='br3 pa2 ba  mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center' >
        
            <div className='br3 w-100'>
                <div className='w-100 black-80 '>
                    <div className="mt3 ">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white" 
                        type="submit" 
                        value="Punch Out"
                        onClick={() => {
                            onRouteChange('punchform');
                            punchIn_Out('Out');
                        }} 
                        />
                    </div>
                    <div className="mt3">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                        type="submit" 
                        value="Punch In"
                        onClick={() => {
                            onRouteChange('punchform');
                            punchIn_Out('In');
                            }}
                        />
                    </div>
                    <div className="mv3">
                    <input 
                        className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                        type="submit" 
                        value="History"
                        onClick={() => onRouteChange('history')} 
                        />
                    </div>

                    {admin}
                </div>
            </div>
        </div>
    )
}

export default Menu;