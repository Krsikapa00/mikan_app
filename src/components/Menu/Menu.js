import React from 'react';


const Menu = ({onRouteChange}) => {
        return(
            <div className='br3 pa2 ba  mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center' >
            
                <div className='br3 w-100'>
                    <div>
                        <label className="db fw6 lh-copy f3">{`User: Mikan`}</label>
                    </div>
                    <div className='w-100 black-80 '>
                        <div className="mt3 ">
                        <input 
                            className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white" 
                            type="submit" 
                            value="Punch Out"
                            onClick={() => onRouteChange('punchOut')} 
                            />
                        </div>
                        <div className="mt3">
                        <input 
                            className=" w-80 pa2 lh-copy ba b--black bg-transparent hover-bg-black hover-white "
                            type="submit" 
                            value="Punch In"
                            onClick={() => onRouteChange('punchIn')}
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
                    </div>
                </div>
            </div>
        )
}

export default Menu;