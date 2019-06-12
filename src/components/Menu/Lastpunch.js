import React from 'react';
import Singlepunch from '../Singlepunch';

const Lastpunch = ({punch}) => {

    
        return (
            <article className="mw5 center bg-lavender br3 pa3 pa4-ns mv3 ba b--black-10">
                <div className="tc">
                    <h1 className="f4">Last Punch</h1>
                    <hr className="mw3 bb bw1 b--black-10" />
                </div>
                    <Singlepunch punch={punch} />
            </article>
        )
    
}

export default Lastpunch;