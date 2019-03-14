import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
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