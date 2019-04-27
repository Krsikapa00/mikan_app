import React from 'react';


const Navigation = ({onRouteChange, isSignedIn, user}) => {
    if (isSignedIn){
       
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 ttu b black pa3'>{`${user.name}`}</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
                <p className='f3 link dim black underline pa3 pointer' 
                    onClick={() => onRouteChange('home')}>Home</p>
            </nav>
        )
    } else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer' 
                    onClick={() => onRouteChange('signin')}>Sign In</p>
            </nav>
        )
    }

}

export default Navigation;